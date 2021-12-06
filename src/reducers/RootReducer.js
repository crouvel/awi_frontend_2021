import {combineReducers} from "redux";
import IngredientCategoriesReducer from "./IngredientCategoriesReducer";
import IngredientsByCategoryReducer from "./IngredientsByCategoryReducer";
import RecetteCategoriesReducer from "./RecetteCategoriesReducer";

const RootReducer = combineReducers({
  IngredientCategories: IngredientCategoriesReducer,
  IngredientsByCategory : IngredientsByCategoryReducer,
  RecetteCategories: RecetteCategoriesReducer
});

export default RootReducer;