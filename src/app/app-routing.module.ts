import { ErrorPageComponent } from './pages/error-page.component';
import { LanguageResolver } from './resolvers/language.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingPageComponent } from 'projects/template/src/app/pages/loading-page.component';
import { LoginPageComponent } from 'projects/template/src/app/pages/login-page.component';
import { NavComponent } from 'projects/template/src/app/components/nav/nav.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      language: LanguageResolver,
    },
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
        resolve: {
          language: LanguageResolver,
        }
      },
      {
        path: 'home',
        component: NavComponent,
        children: [
          {
            path: 'dashboard',
            component: LoadingPageComponent,
          },
          {
            path: 'product',
            loadChildren: () => import('./pages/product/product.module').then(v => v.ProductModule),
          },
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/dashboard'
      },
      {
        // Wild card matcher
        matcher: (urls) => {
          // let url: string;
          // if (urls.length) {
          //   url = urls[urls.length - 1].path;
          //   if (url.endsWith('json')) {
          //     return null;
          //   }
          // }
          return ({ consumed: urls });
        },
        component: ErrorPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
