import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingPageComponent } from './loading-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from 'projects/template/src/app/components/component.module';
import { ShareModule } from 'projects/template/src/app/share/share.module';
import { ErrorPageComponent } from '~template/src/app/pages/error-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
    ComponentModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    LoadingPageComponent,
    LoginPageComponent,
    ErrorPageComponent,
  ],
  exports: [
    LoadingPageComponent,
    LoginPageComponent,
    ErrorPageComponent,
    TranslateModule,
  ]
})
export class PageModule {
}
