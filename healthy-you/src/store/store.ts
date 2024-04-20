import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { doctorReducer } from "./slices/doctor";

const rootReducer = combineReducers({
  user: userReducer,
  doctors: doctorReducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(thunk),
});
export const persistor = persistStore(store);
export { store };
