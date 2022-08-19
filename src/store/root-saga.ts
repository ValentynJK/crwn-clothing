import {
  all, // run multiple Effects in parallel and waits till every in completed
  call // creates an Effect description that instructs the middleware to call the function
} from 'typed-redux-saga/macro' // boilerplate for root-saga

import { categoriesSaga } from './categories/category-saga';
import { userSagas } from './user/user-saga';

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)])
}

