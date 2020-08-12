import { Router } from '@angular/router';
import { AppState } from '~template/src/app/store/app.reducer';
import { Component, OnInit, Inject, PLATFORM_ID, HostListener, ViewChild, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { BaseComponent } from '~template/src/app/common/base.component';
import { Store } from '@ngrx/store';
import { Product } from './product.model';
import { StartDelete, SelectProduct } from './store/product.actions';
import { isPlatformBrowser } from '@angular/common';
import { ProductState } from '~template/src/app/pages/product/store/product.reducer';
import { ModalComponent } from '~template/src/app/components/modal/modal.component';
import { LoadingOverlayComponent } from '~template/src/app/components/loading-overlay.component';


@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {

  loadingRef: ComponentRef<any>;

  constructor(
    @Inject(PLATFORM_ID) platformId,
    private store: Store<ProductState>,
    private router: Router,
    viewRef: ViewContainerRef,
    resolver: ComponentFactoryResolver,
  ) {
    super();

    if (isPlatformBrowser(platformId)) {
      // Fetch Data from Store
      this.store.select('product', 'product').subscribe(state => {
        this.product = state.product || null;
        this.products = state.products || [];
        this.selectedIndex = state.selectedIndex;

        if (state.loading) {
          if (!this.loadingRef) {
            this.loadingRef = LoadingOverlayComponent.create(viewRef, resolver);
          }
        } else {
          if (this.loadingRef) {
            this.loadingRef.destroy();
            this.loadingRef = null;
          }
        }
      });
    }
  }

  @ViewChild('productPage')
  divRef: ElementRef;

  selectedIndex = -1;
  product: Product;
  products: Product[] = [];

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    if (!(event.target as HTMLElement).classList.contains('product-card')) {
    }
  }

  ngOnInit(): void {
  }

  selectProduct(index: number): void {
    this.store.dispatch(new SelectProduct(index));
  }

  goToCreate(): void {
    this.router.navigateByUrl('/home/product/form');
  }

  delete(): void {
    this.store.dispatch(new StartDelete());
  }

  goToEdit(): void {
    this.router.navigateByUrl('/home/product/form/' + this.product.id);
  }

  onClick(index: number): void {
    this.store.dispatch(new SelectProduct(index));
  }

}
