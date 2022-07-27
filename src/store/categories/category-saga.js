import {
  all,
  call,
  takeLatest,
  put // creates an Effect description that instructs the middleware to dispatch an action to the Store. Analogue to dispatch method
} from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase.util';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    // gets categories Array from firebase
    const categoriesArray = yield call(getCollectionAndDocuments);
    // in case of success dispatches categories array to reducer
    // put = generator version of dispatch
    yield put(fetchCategoriesSuccess(categoriesArray));
  }
  catch (error) {
    // in case of failure dispatches error to reducer
    yield put(fetchCategoriesFailed(error))
  }
}

// generator which triggers when fetchCategoriesStart calls
// listener???
export function* onFetchCategories() {
  // whenever we take the latest CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START we initialize fetchCategoriesAsync
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}


// accumulator which hold all sagas related to the category
// listen to onFetchCategories
export function* categoriesSaga() {
  // runs everything inside all() and completes when everything is done 
  yield all([call(onFetchCategories)]);
}