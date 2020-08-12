import { LoadingOverlayComponent } from './../../../components/loading-overlay.component';
import { SelectProduct } from './../store/product.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '~template/src/app/common/base.component';
import { ResetProduct, StartCreate, StartUpdate, ActionTypes, CreateSuccess, UpdateSuccess, CreateFail, UpdateFail } from '../store/product.actions';
import { AppState } from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Product } from '../product.model';
import { Component, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChild, ElementRef, ComponentRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalComponent } from '~template/src/app/components/modal/modal.component';
import { TitleCasePipe } from '@angular/common';
import { ProductState } from '~template/src/app/pages/product/store/product.reducer';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('form')
  form: NgForm;

  editMode = false;
  product: Product;

  loadingRef: ComponentRef<any>;

  constructor(
    viewRef: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    router: Router,
    private readonly store: Store<ProductState>,
    private readonly route: ActivatedRoute,
    private readonly actions$: Actions,
  ) {
    super();

    // Subscribe Store Select
    this.addSub = this.store.select('product', 'product').subscribe(state => {
      // Product
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
      this.product = !!state.product ? { ...state.product } : new Product('', '', 0);
    });

    // Subscribe Route Params
    this.addSub = this.route.params.subscribe(param => {
      if (param.id) {
        this.editMode = true;
        if (!this.product || !this.product.id) {
          this.store.dispatch(new SelectProduct(param.id));
        }
      } else {
        this.reset();
      }
    });

    // Subscribe Create Or Update Success
    this.addSub = this.actions$.pipe(
      ofType(
        ActionTypes.CREATE_SUCCESS,
        ActionTypes.UPDATE_SUCCESS,
        ActionTypes.CREATE_FAIL,
        ActionTypes.UPDATE_FAIL,
      ),
    ).subscribe(
      (action: CreateSuccess | UpdateSuccess | CreateFail | UpdateFail) => {

        // Configure & Show Modal
        viewRef.clear();
        const modalRef = ModalComponent.createModal(viewRef, resolver);
        const modal = modalRef.instance;
        modal.title = action.payload.status ? 'Success' : 'Fail';
        modal.body = `${(new TitleCasePipe()).transform(action.payload.action)} Product`;
        const modalHandler = () => {
          if (action.payload.status) {
            this.form.reset();
            this.store.dispatch(new ResetProduct());
            router.navigateByUrl('/home/product');
          }
          viewRef.clear();
          sub.unsubscribe();
        };

        modal.buttons = [{
          title: 'OK',
          color: 'primary',
          onClick: modalHandler,
        }];
        const sub = modal.overlayClick.subscribe(modalHandler);
      });

  }

  ngAfterViewInit(): void {
  }

  reset(): void {
    this.store.dispatch(new ResetProduct());
  }

  createOrUpdate(form: NgForm): void {

    // Validate Form first
    if (!form.valid) {
      form.form.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      // Dispatch Start Update
      this.store.dispatch(new StartUpdate(this.product));
    } else {
      // Dispatch Start Create
      this.store.dispatch(new StartCreate(this.product));
    }
  }

}
