import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import {persistReducer} from 'redux-persist';
import  storage  from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";



const persistConfig = {
    key:'root',
    version:1,
    storage
}

const reducer = combineReducers({
    user: user
})


const persistedReducer = persistReducer(persistConfig,reducer)


const store = configureStore({
    reducer: persistedReducer
})


export default store;