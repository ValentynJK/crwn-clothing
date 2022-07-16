import { createSelector } from 'reselect';

// slice of category state
const selectCategoryReducer = (state) => {
  // console.log('selector 1', state.categories)
  return state.categories;
}

// creating memoized selector
// runs only if categoriesSlice (got back from selectCategoryReducer) is different
export const selectCategories = createSelector(
  selectCategoryReducer,
  (categoriesSlice) => {
    // console.log('selector 2', selectCategoryReducer)
    return categoriesSlice.categories
  }
);

export const selectCategoriesMap = createSelector(
  selectCategories,
  (categories) => {
    // console.log('selector 3', selectCategories)
    return categories
      .reduce((acc, category) => {
        const { title, items } = category;
        // docSnapshot.data() - actual document
        acc[title.toLowerCase()] = items;
        return acc
      }, {})
  }
)


// export const selectCategoriesMap = (state) => (state.categories.categories
//   .reduce((acc, category) => {
//     const { title, items } = category;
//     // docSnapshot.data() - actual document
//     acc[title.toLowerCase()] = items;
//     return acc
//   }, {}))