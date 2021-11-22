import {combineReducers} from "redux";
import IngredientCategoriesReducer from "./IngredientCategoriesReducer";
import IngredientsByCategoryReducer from "./IngredientsByCategoryReducer";

const RootReducer = combineReducers({
  IngredientCategories: IngredientCategoriesReducer,
  IngredientsByCategory : IngredientsByCategoryReducer
});

export default RootReducer;