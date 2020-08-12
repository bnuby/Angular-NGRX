import { Product } from './../product.model';
import { Action } from '@ngrx/store';
import { create } from 'lodash';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ActionTypes {
  RESET_PRODUCT = '[PRODUCT] Reset Product',
  RESET_SELECT = '[PRODUCT] Reset Select',
  SET_LOADING = '[PRODUCT] Set Loading',
  FETCH_PRODUCT = '[PRODUCT] Fetch Product',
  CREATE_PRODUCT = '[PRODUCT] Create Product',
  UPDATE_PRODUCT = '[PRODUCT] Update Product',
  DELETE_PRODUCT = '[PRODUCT] Delete Product',
  SELECT_PRODUCT = '[PRODUCT] Select Product',

  START_FETCH = '[PRODUCT] Start Fetch',
  START_CREATE = '[PRODUCT] Start Create',
  START_UPDATE = '[PRODUCT] Start Update',
  START_DELETE = '[PRODUCT] Start Delete',

  FETCH_SUCCESS = '[PRODUCT] Fetch Success',
  CREATE_SUCCESS = '[PRODUCT] Create Success',
  UPDATE_SUCCESS = '[PRODUCT] Update Success',
  DELETE_SUCCESS = '[PRODUCT] Delete Fail',

  FETCH_FAIL = '[PRODUCT] Fetch Fail',
  CREATE_FAIL = '[PRODUCT] Create Fail',
  UPDATE_FAIL = '[PRODUCT] Update Fail',
  DELETE_FAIL = '[PRODUCT] Delete Fail',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

// Start Request
export class StartFetch implements Action {
  readonly type = ActionTypes.START_FETCH;

}

export class StartCreate implements Action {
  readonly type = ActionTypes.START_CREATE;

  constructor(public payload: Product) { }
}

export class StartUpdate implements Action {
  readonly type = ActionTypes.START_UPDATE;

  constructor(public payload: Product) { }
}

export class StartDelete implements Action {
  readonly type = ActionTypes.START_DELETE;
}

export class ResetSelect implements Action {
  readonly type = ActionTypes.RESET_SELECT;
}

export class SetLoading implements Action {
  readonly type = ActionTypes.SET_LOADING;

  constructor(public payload: boolean) { }
}

// Basic Request
export class ResetProduct implements Action {
  readonly type = ActionTypes.RESET_PRODUCT;
}

export class FetchProduct implements Action {
  readonly type = ActionTypes.FETCH_PRODUCT;

  constructor(public payload: Product[]) { }
}

export class CreateProduct implements Action {
  readonly type = ActionTypes.CREATE_PRODUCT;

  constructor(public payload: Product) { }
}

export class UpdateProduct implements Action {
  readonly type = ActionTypes.UPDATE_PRODUCT;

  constructor(public payload: Product) { }
}

export class DeleteProduct implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT;
}

export class SelectProduct implements Action {
  readonly type = ActionTypes.SELECT_PRODUCT;

  constructor(public payload: number) { }
}


export class SelectProductById implements Action {
  readonly type = ActionTypes.SELECT_PRODUCT;

  constructor(public payload: string) { }
}

// Success Request
export class FetchSuccess implements Action {
  readonly type = ActionTypes.FETCH_SUCCESS;

  constructor(public payload: Product[]) { }
}

export class CreateSuccess implements Action {
  readonly type = ActionTypes.CREATE_SUCCESS;
  readonly payload = {
    action: 'create',
    status: true
  };
}

export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;
  readonly payload = {
    action: 'update',
    status: true
  };
}

export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DELETE_SUCCESS;
  readonly payload = {
    action: 'delete',
    status: true
  };
}

// Fail Request
export class FetchFail implements Action {
  readonly type = ActionTypes.FETCH_FAIL;
  readonly payload = {
    action: 'fetch',
    status: false
  };
}

export class CreateFail implements Action {
  readonly type = ActionTypes.CREATE_FAIL;
  readonly payload = {
    action: 'create',
    status: false
  };
}

export class UpdateFail implements Action {
  readonly type = ActionTypes.UPDATE_FAIL;
  readonly payload = {
    action: 'update',
    status: false
  };
}

export class DeleteFail implements Action {
  readonly type = ActionTypes.DELETE_FAIL;
  readonly payload = {
    action: 'delete',
    status: false
  };
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = StartFetch
  | StartCreate
  | StartUpdate
  | StartDelete
  | SelectProduct
  | SelectProductById
  | SetLoading
  | ResetProduct
  | ResetSelect
  | FetchProduct
  | CreateProduct
  | UpdateProduct
  | DeleteProduct
  | FetchSuccess
  | CreateSuccess
  | UpdateSuccess
  | DeleteSuccess
  | FetchFail
  | CreateFail
  | UpdateFail
  | DeleteFail;
