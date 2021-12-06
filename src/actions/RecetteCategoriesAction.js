import axios from "axios";
import serverURL from "../serverURL";


export const getRecetteCategories = () => async (dispatch) => {
    try {

        dispatch({
            type: "RECETTE_CATEGORIES_LOADING",
        });

        const res = await axios.get(`${serverURL}/api/recetteCat`);

        dispatch({
            type: "RECETTE_CATEGORIES_SUCCESS",
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: "RECETTE_CATEGORIES_FAIL",
            err: err
        });
    }
};