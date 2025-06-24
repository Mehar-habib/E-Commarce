import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { api } from "./api";
import userReducer from "./slice/userSlice";

/* 
🔐 PERSIST CONFIGURATION FOR USER STATE
This object tells redux-persist:
- What to store in localStorage
- Which reducer to persist
- What key to use (i.e. the key under which it's saved in localStorage)
- Which fields to keep ("whitelist")
*/
const userPersistConfig = {
  key: "user", // localStorage key name
  storage, // use browser localStorage
  whiteList: ["user", "isEmailVerified", "isLoggedIn"], // fields to persist
};

// Wrap user reducer with persistReducer to enable saving to localStorage
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

/*
🛠️ CONFIGURE REDUX STORE
Here we combine all reducers (api + user), apply middleware (RTK Query),
and ignore specific redux-persist actions from the serializable state check.
*/
export const store = configureStore({
  reducer: {
    // Adds the RTK Query reducer dynamically under the key "api.reducerPath"
    [api.reducerPath]: api.reducer,

    // Add the persisted version of the user reducer
    user: persistedUserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux Persist uses non-serializable actions; we must ignore them
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware), // Add RTK Query middleware to enable caching, data fetching, invalidation, etc.
});

/*
🔁 Enables automatic re-fetching for queries (e.g. when the user reconnects,
gains focus, or makes a refetch request manually)
*/
setupListeners(store.dispatch);

// 🔄 Creates a persistor to use with <PersistGate> in your app entry point (usually _app.tsx or App.js)
export const persistor = persistStore(store);

// ✅ Useful Types for TypeScript (used in useSelector/useDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
