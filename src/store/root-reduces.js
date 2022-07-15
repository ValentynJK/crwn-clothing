import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { categoriesReduces } from './categories/category.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReduces
})