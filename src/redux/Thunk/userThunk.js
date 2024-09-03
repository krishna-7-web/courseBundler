// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { server } from "../store";

// export const login = createAsyncThunk(
//   "login",
//   async ({ data }, { rejectWithValue }) => {
//     try {
//       console.log(data);
//       const response = await axios.post(
//         `${server}/login`,
//         { data },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
