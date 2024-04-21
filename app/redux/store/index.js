// import AsyncStorage from '@react-native-community/async-storage';
// import { applyMiddleware, createStore } from 'redux';
// import { persistReducer, persistStore } from 'redux-persist';
// import createSagaMiddleware from 'redux-saga';
// // Imports: Redux Root Reducer
// import rootReducer from '../reducers/index';
// // Imports: Redux Root Saga
// import rootSaga from '../sagas';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   blacklist: ['loading'],
// };

// // Middleware: Redux Saga
// const sagaMiddleware = createSagaMiddleware();
// //persist
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Redux: Store
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
// let persistor = persistStore(store);
// // Middleware: Redux Saga
// sagaMiddleware.run(rootSaga);
// // Exports
// export { store, persistor };
import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
// Imports: Redux Root Reducer
import rootReducer from '../reducers/index';
// Imports: Redux Root Saga
import rootSaga from '../sagas';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading'],
};

// Middleware: Redux Saga
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware)
if (process.env.NODE_ENV === `development`) {
  //temparature stop 
  middleware.push(logger)
}

/* ------------- Assemble Middleware ------------- */

enhancers.push(applyMiddleware(...middleware))

//persist
const persistedReducer = persistReducer(persistConfig, compose(...enhancers));

// Redux: Store
// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
const store = createStore(persistedReducer, rootReducer, compose(...enhancers))
let persistor = persistStore(store);
// Middleware: Redux Saga
sagaMiddleware.run(rootSaga);
// Exports
export { store, persistor };
