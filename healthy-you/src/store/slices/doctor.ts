import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctors(state, action) {
      console.log(action);
      //state.doctors = action.payload;
      console.log(current(state));
      return {
        ...state,
        doctors: action.payload,
      };
    },
  },
});

const { reducer } = doctorSlice;
export { reducer as doctorReducer };

export const { setDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
