import { configureStore} from "@reduxjs/toolkit";
import postsreducer from "./feature/postSlice";

const store = configureStore({
  reducer: {
    post: postsreducer
  },
});

export default store;
