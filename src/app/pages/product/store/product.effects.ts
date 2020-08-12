import { cloneDeep } from 'lodash';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import {
  StartFetch, StartCreate, StartUpdate,
  ActionTypes, FetchProduct, CreateSuccess, FetchSuccess,
  DeleteSuccess, CreateFail, UpdateFail, DeleteFail, FetchFail,
  UpdateSuccess, SetLoading
} from './product.actions';
import { ProductService } from '../product.service';
import { ProductState } from '~template/src/app/pages/product/store/product.reducer';


const errorHandler = (e, event) => {
  console.error(e);
  switch (e.message) {
  }
  return of(event);
};




@Injectable()
export class ProductEffects {
  constructor(
    private action$: Actions,
    private store: Store<ProductState>,
    private productService: ProductService,
  ) { }

  @Effect()
  fetchProduct$ = this.action$.pipe(
    ofType(ActionTypes.START_FETCH),
    switchMap((action) => {
      console.log(action);
      return this.productService.fetchProduct()
        .pipe(
          take(1),
          map(datas => {
            const products = [];
            if (datas) {
              // to some thing
              for (const id in datas) {
                products.push({
                  id,
                  ...datas[id],
                });
              }
            }
            return products;
          }),
          switchMap(products => [
            new FetchProduct(products),
            new FetchSuccess(products),
          ]),
          catchError((e) => errorHandler(e, new FetchFail()))
        );
    })
  );

  @Effect()
  createProduct$ = this.action$.pipe(
    ofType(ActionTypes.START_CREATE),
    switchMap((action: StartCreate) => {
      return this.productService.createProduct(action.payload)
        .pipe(
          switchMap(data => [
            new StartFetch(),
            new CreateSuccess(),
          ]),
          catchError((e) => errorHandler(e, new CreateFail()))
        );
    })
  );

  @Effect()
  updateProduct$ = this.action$.pipe(
    ofType(ActionTypes.START_UPDATE),
    switchMap((action: StartUpdate) => {
      return this.productService.setProduct(action.payload)
        .pipe(
          switchMap(() => [
            new StartFetch(),
            new UpdateSuccess(),
          ]),
          catchError((e) => errorHandler(e, new UpdateFail()))
        );
    })
  );

  @Effect()
  deleteProduct$ = this.action$.pipe(
    ofType(ActionTypes.START_DELETE),
    withLatestFrom(this.store.select('product', 'product')),
    switchMap(([_, state]) => {
      const updateProducts = cloneDeep(state.products).filter((_, index) => index !== state.selectedIndex);

      return this.productService.setProducts(updateProducts)
        .pipe(
          switchMap(() => [
            new StartFetch(),
            new DeleteSuccess(),
          ]),
          catchError((e) => errorHandler(e, new DeleteFail()))
        );
    })
  );

  @Effect()
  fetchSuccess$ = this.action$.pipe(
    ofType(ActionTypes.FETCH_SUCCESS),
    map(() => new SetLoading(false))
  );

  @Effect()
  createSuccess$ = this.action$.pipe(
    ofType(ActionTypes.CREATE_SUCCESS),
    map(() => new SetLoading(false))
  );

  @Effect()
  updateSuccess$ = this.action$.pipe(
    ofType(ActionTypes.UPDATE_SUCCESS),
    map(() => new SetLoading(false))
  );

  @Effect()
  deleteSuccess$ = this.action$.pipe(
    ofType(ActionTypes.DELETE_SUCCESS),
    map(() => new SetLoading(false))
  );

  @Effect()
  fetchFail$ = this.action$.pipe(
    ofType(ActionTypes.FETCH_FAIL),
    map(() => new SetLoading(false))

  );

  @Effect()
  createFail$ = this.action$.pipe(
    ofType(ActionTypes.CREATE_FAIL),
    map(() => new SetLoading(false))
  );

  @Effect()
  updateFail$ = this.action$.pipe(
    ofType(ActionTypes.UPDATE_FAIL),
    map(() => new SetLoading(false))
  );

  @Effect()
  deleteFail$ = this.action$.pipe(
    ofType(ActionTypes.DELETE_FAIL),
    map(() => new SetLoading(false))
  );


}


