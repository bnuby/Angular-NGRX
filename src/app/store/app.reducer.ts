import { ActionReducerMap } from '@ngrx/store';
import { State, ProductReducer } from '../pages/product/store/product.reducer';

export interface AppState {
  product: State;
}

export const AppReducerMap: ActionReducerMap<AppState> = {
  product: ProductReducer
};
