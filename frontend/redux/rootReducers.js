import baseApi from "./api/baseApi";
import userReducer from "./feature/user/userSlice";

const rootReducer = {
  [baseApi?.reducerPath]: baseApi?.reducer,
  user: userReducer,
};

export default rootReducer;
