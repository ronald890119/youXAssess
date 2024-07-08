import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// initial state of university data (an empty array)
const initialState = {
	uniData: [],
	uniObj: {
		alpha_two_code: "",
		name: "",
		domains: "",
		web_pages: "",
		country: "",
		state_province: ""
	},
	messages: {
		success: "",
		errorMessage: "",
		operationMessage: "",
		number: 1,
		foundUni: false
	}
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
		},
		update_alpha_two_code(state, actions) {
			state.uniObj.alpha_two_code = actions.payload;
		},
		update_name(state, actions) {
			state.uniObj.name = actions.payload;
		},
		update_domains(state, actions) {
			state.uniObj.domains = actions.payload;
		},
		update_web_pages(state, actions) {
			state.uniObj.web_pages = actions.payload;
		},
		update_country(state, actions) {
			state.uniObj.country = actions.payload;
		},
		update_state_province(state, actions) {
			state.uniObj.state_province = actions.payload;
		},
		update_success(state, actions) {
			state.messages.success = actions.payload;
		},
		update_errorMessage(state, actions) {
			state.messages.errorMessage = actions.payload;
		},
		update_operationMessage(state, actions) {
			state.messages.operationMessage = actions.payload;
		},
		update_number(state, actions) {
			state.messages.number = actions.payload;
		},
		update_foundUni(state, actions) {
			state.messages.foundUni = actions.payload;
		},
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

export const {remove, add, update_alpha_two_code, update_name, update_domains, update_web_pages,
	update_country, update_state_province, update_success, update_errorMessage, update_operationMessage,
	update_number, update_foundUni} = uniSlice.actions;
export default uniSlice.reducer;