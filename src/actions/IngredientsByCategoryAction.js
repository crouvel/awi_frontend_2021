import axios from "axios";
import serverURL from "../serverURL";


export const getIngredientByCategory = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "INGREDIENTS_BY_CATEGORY_LOADING",
        });

        const res = await axios.get(`${serverURL}/api/ingredients/${id}`);

        dispatch({
            type: "INGREDIENTS_BY_CATEGORY_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "INGREDIENTS_BY_CATEGORY_FAIL",
            err: err
        });
    }
};