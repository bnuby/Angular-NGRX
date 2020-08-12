import { LoadingOverlayComponent } from './loading-overlay.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ModalComponent } from './modal/modal.component';
import { LanguageComponent } from './language.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShareModule } from './../share/share.module';
import { NavComponent } from './nav/nav.component';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    RouterModule,
  ],
  declarations: [
    LoadingComponent,
    NavComponent,
    LanguageComponent,
    ModalComponent,
    ProductCardComponent,
    LoadingOverlayComponent,
  ],
  exports: [
    LoadingComponent,
    NavComponent,
    LanguageComponent,
    ModalComponent,
    ProductCardComponent,
    LoadingOverlayComponent,
  ]
})
export class ComponentModule {
}
