import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Features/TodoSlice";
import { baseApi } from "./API/api";

const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		todos: todoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
