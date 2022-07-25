import { takeLatest, all, call, put } from 'redux-saga/effects';

import { getCollectionAndDocuments } from '../../utils/firebase/firebase.util';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
  try {
    // trying to gey categories Array from firebase
    const categoriesArray = yield call(getCollectionAndDocuments);
    // in case of success dispatches categories array to reducer
    yield put(fetchCategoriesSuccess(categoriesArray))
  }
  catch (error) {
    // in case of failure dispatches error to reducer
    yield put(fetchCategoriesFailed(error))
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}