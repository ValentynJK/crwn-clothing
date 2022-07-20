import { createSelector } from 'reselect';

// slice of category state
const selectCategoryReducer = (state) => state.categories;

// creating memoized selector
// runs only if categoriesSlice (got back from selectCategoryReducer) is different
export const selectCategories = createSelector(
  selectCategoryReducer,
  (categoriesSlice) => categoriesSlice.categories);

export const selectCategoriesMap = createSelector(
  selectCategories,
  (categories) => {
    return categories
      .reduce((acc, category) => {
        const { title, items } = category;
        // docSnapshot.data() - actual document
        acc[title.toLowerCase()] = items;
        return acc
      }, {})
  }
);

// selector for isLoading
export const selectCategoriesIsLoading = createSelector(
  selectCategoryReducer,
  (categoriesSlice) => categoriesSlice.isLoading
)