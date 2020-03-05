import Type from "./ActionType";
import axios from "axios";

const { REACT_APP_ORIGINE } = process.env;

export const productAll = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .get(`${REACT_APP_ORIGINE}/product/all`, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        dispatch({
          type: Type.FATCH_PRODUCTS,
          products: res.data.data,
          wishlist: res.data.wishlist,
          min: 0,
          max: 5000
        });
        return res;
      });
  };
};

export const addTodo = name => ({
  type: Type.ADD_TODO,
  name
});

export const removeTodo = id => ({
  type: Type.REMOVE_TODO,
  id
});

export const add_to_wishlist = payload => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .post(`${REACT_APP_ORIGINE}/product/addToWishlist`, payload, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.data.success) {
          dispatch({
            type: Type.ADD_TO_WISHLIST
          });
        }
        return res;
      });
  };
};
export const remove_to_wishlist = payload => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .post(`${REACT_APP_ORIGINE}/product/removeToWishlist`, payload, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        if (res.data.success) {
          dispatch({
            type: Type.REAMOVE_TO_WISHLIST
          });
        }
        return res;
      });
  };
};

export const getProductDetail = id => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .get(`${REACT_APP_ORIGINE}/product/detail/` + id, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        dispatch({ type: Type.GET_DETAIL });
        return res;
      });
  };
};

export const wishlist = () => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : {};
  return dispatch => {
    return axios
      .get(`${REACT_APP_ORIGINE}/product/wishlist`, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        return res;
      });
  };
};

export const price_filter = (min, max) => {
  return dispatch => {
    dispatch({ type: Type.PRICE_FILTER, min, max });
  };
};
