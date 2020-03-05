import { combineReducers } from "redux";

import products from "./todos";
import userDetail from "./users";

const reducer = combineReducers({
  products,
  userDetail
});

export default reducer;
