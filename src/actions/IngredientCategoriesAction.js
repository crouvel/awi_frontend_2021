import axios from "axios";
import serverURL from "../serverURL";


export const getIngredientCategories = () => async (dispatch) => {
    try {

        dispatch({
            type: "INGREDIENT_CATEGORIES_LOADING",
        });

        const res = await axios.get(`${serverURL}/api/ingredientCat`);

        dispatch({
            type: "INGREDIENT_CATEGORIES_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "INGREDIENT_CATEGORIES_FAIL",
            err: err
        });
    }
};