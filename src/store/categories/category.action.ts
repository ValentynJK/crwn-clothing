import {
  CATEGORIES_ACTION_TYPES,
  Category // input type
} from './category.types';

import {
  createAction,
  Action, // return type for action without payload
  ActionWithPayload // return type for action with payload
} from '../../utils/reducer/reduces.util';

// types for action functions
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

export function fetchCategoriesStart(): FetchCategoriesStart {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export function fetchCategoriesSuccess(categoriesArray: Category[]): FetchCategoriesSuccess {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
}
export function fetchCategoriesFailed(error: Error): FetchCategoriesFailed {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
}
