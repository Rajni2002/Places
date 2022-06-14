import { configureStore} from "@reduxjs/toolkit";
import postSlice from "./feature/postSlice";

const store = configureStore({
  reducer: {
    post: postSlice.reducer
  },
});

export default store;
