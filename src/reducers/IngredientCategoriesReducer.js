const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const IngredientCategoriesReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "INGREDIENT_CATEGORIES_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "INGREDIENT_CATEGORIES_SUCCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "INGREDIENT_CATEGORIES_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
            default:
                return state;
        }
     
    }
export default IngredientCategoriesReducer;