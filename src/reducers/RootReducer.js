import {combineReducers} from "redux";
import IngredientCategoriesReducer from "./IngredientCategoriesReducer";

const RootReducer = combineReducers({
  IngredientCategories: IngredientCategoriesReducer,
});

export default RootReducer;