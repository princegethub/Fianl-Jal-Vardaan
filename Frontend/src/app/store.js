import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { phedApi } from "../features/api/phedApi";
import { gpApi } from "../features/api/gpApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(authApi.middleware, phedApi.middleware, gpApi.middleware),
});

export const persistor = persistStore(store); // Export persistor
export default store;
