import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence
import { authApi } from "../features/api/authApi";
import authReducer from "../features/authSlice";
import phedReducer from "../features/phedSlice";
import { phedApi } from "../features/api/phedApi";
import { gpApi } from "../features/api/gpApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth state
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  [phedApi.reducerPath]: phedApi.reducer,
  phed: phedReducer,
  [gpApi.reducerPath]: gpApi.reducer,
});

export default persistReducer(persistConfig, rootReducer);
