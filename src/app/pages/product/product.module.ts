import { ProductResolver } from './product.resolver';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';

import { ShareModule } from './../../share/share.module';
import { ProductFormComponent } from './form/product-form.component';
import { ProductComponent } from './product.component';
import { ComponentModule } from '~template/src/app/components/component.module';
import { StoreModule } from '@ngrx/store';
import { ProductReducer } from '~template/src/app/pages/product/store/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from '~template/src/app/pages/product/store/product.effects';

const routes: Routes = [
  {
    path: '',
    resolve: [
      ProductResolver,
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductComponent,
      },
      {
        path: 'form',
        component: ProductFormComponent,
      },
      {
        path: 'form/:id',
        component: ProductFormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    ShareModule,
    ComponentModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('product', {
      product: ProductReducer,
    }),
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [
    ProductComponent,
    ProductFormComponent,
  ],
  providers: [
    ProductResolver,
  ],
  exports: [
    RouterModule,
    TranslateModule,
  ]
})
export class ProductModule {

}
