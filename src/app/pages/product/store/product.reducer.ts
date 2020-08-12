import { Actions, ActionTypes } from './product.actions';
import { Product } from './../product.model';
import { cloneDeep } from 'lodash';

export interface ProductState {
  product: {
    product: State
  };
}

export interface State {
  // define state
  products: Product[];
  selectedIndex: number;
  product?: Product;
  loading: boolean;
}

const initialState: State = {
  // set initial state
  products: null,
  selectedIndex: -1,
  product: null,
  loading: false,
};

export function ProductReducer(state: State = initialState, action: Actions): State {

  let updateProducts: Product[] = [];

  switch (action.type) {

    case ActionTypes.START_FETCH:
    case ActionTypes.START_CREATE:
    case ActionTypes.START_UPDATE:
    case ActionTypes.START_DELETE: {
      return {
        ...state,
        loading: true,
      };
    }

    case ActionTypes.SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case ActionTypes.RESET_SELECT: {
      return {
        ...state,
        selectedIndex: -1,
        product: null,
      };
    }

    case ActionTypes.RESET_PRODUCT: {
      return {
        ...state,
        selectedIndex: -1,
        product: Product.clean(),
      };
    }

    case ActionTypes.FETCH_PRODUCT: {
      return {
        ...state,
        products: action.payload,
        selectedIndex: -1,
        product: null,
      };
    }

    case ActionTypes.SELECT_PRODUCT: {

      let index: number;

      if (typeof (action.payload) === 'number') {
        index = action.payload;
      } else if (typeof (action.payload) === 'string') {
        index = state.products.findIndex(p => p.id === action.payload);
      }

      let product;
      if (index > -1) {
        product = {
          ...state.products[index]
        };
      }

      return {
        ...state,
        selectedIndex: index,
        product,
      };
    }

    case ActionTypes.CREATE_PRODUCT: {
      return {
        ...state,
        product: null,
      };
    }

    case ActionTypes.UPDATE_PRODUCT: {
      updateProducts = cloneDeep(state.products);
      updateProducts[state.selectedIndex] = {
        ...state.products[state.selectedIndex],
        ...action.payload,
      };

      return {
        ...state,
        products: updateProducts,
        selectedIndex: -1,
        product: null,
      };
    }

    case ActionTypes.DELETE_PRODUCT: {
      updateProducts = cloneDeep(state.products).filter((p, index) => index !== state.selectedIndex);

      return {
        ...state,
        products: updateProducts,
        selectedIndex: -1,
        product: null,
      };
    }

    default: {
      return state;
    }
  }
}
