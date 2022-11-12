import { configureStore } from "@reduxjs/toolkit";
import machineReducer from "./machineSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, machineReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk]
})

export const persistor = persistStore(store)