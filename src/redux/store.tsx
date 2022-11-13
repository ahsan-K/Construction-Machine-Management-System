import { combineReducers, configureStore } from "@reduxjs/toolkit";
import machineReducer from "./machineSlice";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage
}

const rootReducer = combineReducers({ 
  machineReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
})
export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)