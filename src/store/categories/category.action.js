import { createAction } from '../../utils/reducer/reduces.util';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.util';

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  // dispatching fetch request 
  dispatch(fetchCategoriesStart());
  try {
    // trying to gey categories Array from firebase
    const categoriesArray = await getCollectionAndDocuments();
    // in case of success dispatches categories array to reducer
    dispatch(fetchCategoriesSuccess(categoriesArray));
  }
  catch (error) {
    // in case of failure dispatches error to reducer
    dispatch(fetchCategoriesFailed(error))
  }
}