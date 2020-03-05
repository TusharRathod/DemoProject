import Type from "../actions/ActionType";

const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case Type.FATCH_PRODUCTS:
      return {
        products: action.products,
        wishlist: action.wishlist,
        min: action.min,
        max: action.max
      };

    case Type.PRICE_FILTER:
      return {
        ...state,
        min: action.min,
        max: action.max,
        products: state.products.filter(item => {
          return item.price > action.min && item.price < action.max;
        })
      };
    case Type.ADD_TODO: /// for adding.. todo
      return state;
    case Type.REMOVE_TODO: // for remove todo
      return state.filter(todo => todo.id !== action.id);

    default:
      return state;
  }
};
