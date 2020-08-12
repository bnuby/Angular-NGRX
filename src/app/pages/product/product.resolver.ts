import { ProductState } from './store/product.reducer';
import { ActionTypes, StartFetch } from './store/product.actions';
import { Store } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class ProductResolver implements Resolve<Observable<boolean>> {

  constructor(
    private readonly store: Store<ProductState>,
    private readonly action$: Actions,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot):
    Observable<boolean> {

    return this.store.select('product', 'product').pipe(
      take(1),
      switchMap(
        (state) => {
          if (!state.products) {
            // Get Data
            this.store.dispatch(new StartFetch());

            return this.action$.pipe(
              ofType(ActionTypes.FETCH_SUCCESS),
              take(1),
              map(() => {
                console.log('here');
                return true;
              })
            );
          }

          return of(true);
        },
      ),
    );
  }


}
