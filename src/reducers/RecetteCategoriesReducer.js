const DefaultState = {
    loading: false,
    data: [],
    errorMsg: "",
};

const RecetteCategoriesReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "RECETTE_CATEGORIES_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };
        case "RECETTE_CATEGORIES_SUCESS":
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case "RECETTE_CATEGORIES_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: action.err,
            };
            default:
                return state;
        }
     
    }
export default RecetteCategoriesReducer;