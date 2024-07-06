import { configureStore } from "@reduxjs/toolkit";
import uniSlice from "./uniSlice";

// create store for different slices
const store = configureStore({
	reducer: {
		uniData: uniSlice
	}
});

export default store;