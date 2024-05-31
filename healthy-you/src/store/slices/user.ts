import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/User";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  birthDate: null,
  sex: null,
  phone: null,
  id: null,
  role: "",
  doctor: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthDate = action.payload.birthDate ?? null;
      state.sex = action.payload.sex ?? null;
      state.phone = action.payload.phone ?? null;
      state.role = action.payload.Role.title ?? "";
      return state;
    },
    setDoctor(state, action) {
      state.doctor = action.payload;
      return state;
    },
    resetUser(state) {
      state.id = null;
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.birthDate = null;
      state.sex = null;
      state.phone = null;
      return state;
    },
  },
});

const { reducer } = userSlice;
export { reducer as userReducer };
export const { setUser, resetUser, setDoctor } = userSlice.actions;

export default userSlice.reducer;
