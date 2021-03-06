import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; //  boilerplate for redux-persist
import storage from 'redux-persist/lib/storage' // localStorage is used by default // boilerplate for redux-persist
import thunk from 'redux-thunk';
import logger from 'redux-logger';


import { rootReducer } from './root-reduces';

// root reducer 

// for catching state before hitting reducer
// process.env.NODE_ENV === 'development' for not logging in production mode
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// initialization redux-persist configuration //  boilerplate for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

//  boilerplate for redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// store is using persistedReducer as source
export const store = createStore(persistedReducer, undefined, composedEnhancers);

// creating persistor //  boilerplate for redux-persist
export const persistor = persistStore(store);