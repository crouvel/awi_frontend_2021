const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const IngredientsByCategoryReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "INGREDIENTS_BY_CATEGORY_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "INGREDIENTS_BY_CATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "INGREDIENTS_CATEGORIES_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
            default:
                return state;
        }
     
    }
export default IngredientsByCategoryReducer;