import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";

const initialState: IUser = {
  email: "",
  firstName: "",
  lastName: "",
  birthDate: null,
  sex: null,
  phone: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthDate = action.payload.birthDate ?? null;
      state.sex = action.payload.sex ?? null;
      state.phone = action.payload.phone ?? null;
    },
    resetUser(state) {},
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
