import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {productsApi} from './api/products'
import { 
  persistStore, 
  persistReducer,  
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'
import productsReducer from './slice/products'
import localStorage from 'redux-persist/lib/storage' 
import basketReducer from './slice/basketSlice'

const rootReducer = combineReducers({
  basket: basketReducer,
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer
,
});

const persistConfig = {
  key: 'root',
  storage: localStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  //  products: productsReducer,
  //   [productsApi.reducerPath]: productsApi.reducer
  // ,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(productsApi.middleware),
  
  // reducer: {
  //   products: productsReducer,
  //   [productsApi.reducerPath]: productsApi.reducer
  // },
  //middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

// export default configureStore({
//   reducer: {
//     basket: basketReducer,
//   }
// })