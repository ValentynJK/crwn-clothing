import { compose, legacy_createStore as createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'; //  boilerplate for redux-persist
import storage from 'redux-persist/lib/storage' // localStorage is used by default // boilerplate for redux-persist
import logger from 'redux-logger'
// async side Effects library
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

import { rootReducer } from './root-reduces';

export type RootState = ReturnType<typeof rootReducer>

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// creates Saga Middleware
const sagaMiddleware = createSagaMiddleware();
// root reducer 

// for catching state before hitting reducer
// process.env.NODE_ENV === 'development' for not logging in production mode
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));


type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

// initialization redux-persist configuration //  boilerplate for redux-persist
const persistConfig: ExtendedPersistConfig = {
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

// initialize Saga middleware with rootSaga
sagaMiddleware.run(rootSaga);

// creating persistor //  boilerplate for redux-persist
export const persistor = persistStore(store);