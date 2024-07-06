import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initial state of university data (an empty array)
const initialState = {
	uniData: []
};

// create a slice for university data
const uniSlice = createSlice({
	name: "uni",
	initialState: initialState,
	reducers: {
		// actions for updating state
		remove(state) {
			state.uniData.pop();
		},
		add(state) {
			if(state.uniData.length > 0) {
				state.uniData.push(state.uniData[0]);
			}
		}
	},
	// extraReducers for async function
	extraReducers: (builder) => {
		builder
			.addCase(loadAsync.pending, () => {
				console.log("loadAsync.pending");
			})
			.addCase(loadAsync.fulfilled, (state, action) => {
				state.uniData = action.payload;
			});
	}
});

// for async function (fetching API data)
export const loadAsync = createAsyncThunk(
	"uni/loadAsync",
	async (uniData) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return uniData;
	}
)

export const {remove, add} = uniSlice.actions;
export default uniSlice.reducer;