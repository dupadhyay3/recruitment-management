import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: "",
  },
  reducers: {
    user_token: (state, action) => {
      console.log("user_token", action.payload);

      state.value = action.payload;
    },
    
  },
});

// Action creators are generated for each case reducer function
export const { user_token} = counterSlice.actions;

export default counterSlice.reducer;
