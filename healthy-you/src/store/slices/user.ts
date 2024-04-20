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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action);
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthDate = action.payload.birthDate ?? null;
      state.sex = action.payload.sex ?? null;
      state.phone = action.payload.phone ?? null;
      console.log(current(state));
      return state;
    },
    resetUser(state) {},
  },
});

const { reducer } = userSlice;
export { reducer as userReducer };

// Action creators are generated for each case reducer function
//export const getUser = (state: RootState) => state.user;
export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
