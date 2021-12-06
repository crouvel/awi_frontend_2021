import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategories } from '../../actions/IngredientCategoriesAction';
import './IngCategorycards.css';
import { CategoryIngredientCard } from './CategoryIngredientCard';
import Loading from '../Loading/Loading';

const IngCategorycards = () => {
  const dispatch = useDispatch();
  const categoriesIngredientList = useSelector((state) => state.IngredientCategories);

  /*const [data, setData] = useState([]);*/
  useEffect(() => {
    const fetchData = () => {
      dispatch(getIngredientCategories());
    };
    fetchData();
  }
    , [dispatch])

  console.log(categoriesIngredientList.data);

  const showData = () => {
    if (categoriesIngredientList.data.length > 0) {
      return categoriesIngredientList.data.map((element) => <CategoryIngredientCard data={element} />);

    } else {
      if (categoriesIngredientList.loading) {
        return <Loading />;
      }
      if (categoriesIngredientList.errorMsg !== "") {
        return <p>{categoriesIngredientList.errorMsg}</p>;
      }

      return <p>Impossible d'obtenir des données</p>;
    };
  }
  return (
    <div class="classContainer">
      {
        showData()
      }
    </div>
  )


}

export default IngCategorycards;