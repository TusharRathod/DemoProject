import Type from "../actions/ActionType";
const userDetail = JSON.parse(localStorage.getItem("user"));
const initialState = userDetail
  ? {
      type: "LOGIN_SUCCESS",
      message: "User found!",
      token: userDetail.token,
      user: userDetail.user
    }
  : {};
// [
//   {
//     id: 1,
//     email: "bond@warrior.com",
//     firstName: "bond007",
//     lastName: "james",
//     mobileNo: "543545454545",
//     password: "123456",
//     login: false
//   }
//];
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Type.LOGOUT:
      return {};
    case Type.LOGIN_SUCCESS:
      return action;
    case Type.LOGIN_FAIL:
      return action;
    case Type.ADD_TO_WISHLIST:
      return state;
    case Type.REAMOVE_TO_WISHLIST:
      return state;
    case Type.UPLOAD_SUCCESS:
      return state;
    case Type.UPLOAD_FAIL:
      return state;
    default:
      return state;
  }
};
