import Type from "./ActionType";
import axios from "axios";

const { REACT_APP_ORIGINE } = process.env;

export const register = user => ({
  type: Type.REGISTER_USER,
  user
});

export const registerUser = user => {
  return dispatch => {
    return axios.post(`${REACT_APP_ORIGINE}/user/register`, user).then(res => {
      // dispatch(register(user));
      return res;
    });
  };
};
// export const login = token => ({
//   type: Type.LOGIN_USER,
//   token
// });

export const loginUser = userInfo => {
  return dispatch => {
    return axios.post(`${REACT_APP_ORIGINE}/user/login`, userInfo).then(res => {
      if (res.data.success) {
        dispatch(authentication(res.data));
        localStorage.setItem("warrior", JSON.stringify(res.data.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
      } else {
        dispatch(authentication(res.data));
      }
      return res;
      // dispatch(login())
    });
  };
};
export const authentication = res => {
  if (res.success) {
    return {
      type: Type.LOGIN_SUCCESS,
      message: res.message,
      token: res.data.token,
      user: res.data.user
    };
  } else {
    return { type: Type.LOGIN_FAIL, message: res.message };
  }
};
export const logout = payload => {
  return dispatch => {
    return axios.post(`${REACT_APP_ORIGINE}/user/logout`, payload).then(res => {
      if (res.data.success) {
        dispatch({ type: Type.LOGOUT });
        localStorage.removeItem("warrior");
        localStorage.removeItem("token");
      }
      return res;
    });
  };
};

export const uploadImage = payload => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .post(`${REACT_APP_ORIGINE}/upload/image`, payload, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("warrior", JSON.stringify(res.data.data));
          dispatch({ type: Type.UPLOAD_SUCCESS });
        } else {
          dispatch({ type: Type.UPLOAD_FAIL });
        }
        return res;
      });
  };
};
export const uploadCoverImage = payload => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .post(`${REACT_APP_ORIGINE}/upload/cover`, payload, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("warrior", JSON.stringify(res.data.data));
          dispatch({ type: Type.UPLOAD_SUCCESS });
        } else {
          dispatch({ type: Type.UPLOAD_FAIL });
        }
        return res;
      });
  };
};
export const getUser = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .get(`${REACT_APP_ORIGINE}/getUser`, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.data.success) {
          localStorage.setItem("warrior", JSON.stringify(res.data.data));
        }
        return res;
      });
  };
};
