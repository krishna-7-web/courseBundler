import { configureStore } from "@reduxjs/toolkit";
import api from "./api/userApi"; // Your RTK Query API slice
// import userReducer from "./slices/userSlice"; // Your user slice

// import loginReducer from "./Slice/userSlice"; // Import the loginSlice.reducer

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // user: userReducer, // Adding the user slice to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
