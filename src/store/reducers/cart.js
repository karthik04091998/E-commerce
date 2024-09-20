
const initialState = {
    products: [],
    totalQty: 0,
  };
  
  function cartReducer(state = initialState, action) {
    switch (action.type) {
      case "cart_add":
        return {
          ...state,
          products: [...state.products, action.product],
          totalQty: state.totalQty + parseInt(action.product.qty),
        };
      case "cart_remove":
        return {
          ...state,
          products: state.products.toSpliced(action.index, 1),
        };
        case "cart_clear":
          return {
            products: [],
            totalQty: 0,
          };
      default:
        return state;
    }
  }
  
  export default cartReducer;