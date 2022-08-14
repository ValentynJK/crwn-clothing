import { createSelector } from 'reselect';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

// slice of category state
const selectCategoryReducer = (state): CategoriesState => state.categories;

// creating memoized selector
// runs only if categoriesSlice (got back from selectCategoryReducer) is different
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => {
    return categories
      .reduce((acc, category) => {
        const { title, items } = category;
        // docSnapshot.data() - actual document
        acc[title.toLowerCase()] = items;
        return acc
      }, {} as CategoryMap)
  }
);

// selector for isLoading
export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)