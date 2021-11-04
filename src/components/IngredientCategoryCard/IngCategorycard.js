import React, { useState, useEffect } from 'react';

import {useDispatch, useSelector} from "react-redux";
import { getIngredientCategories } from '../../actions/IngredientCategoriesAction';
import './IngCategorycard.css';
require("es6-promise").polyfill();
require("isomorphic-fetch");

const IngredientCategories = () => {
  const dispatch = useDispatch();
  const categoriesIngredientList = useSelector((state) => state.IngredientCategories);

  /*const [data, setData] = useState([]);*/
    useEffect(() => {
      const fetchData = () => {
        dispatch(getIngredientCategories());
    };
    fetchData();
      }
   ,[dispatch])

   console.log(categoriesIngredientList.data);
 
   const showData = () => {
    if(categoriesIngredientList.data != null) {
        return (
          <div class="main-container">
          <div class="cards">
            <div class="card card-1">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">{categoriesIngredientList.data[0].libellé}</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
            <div class="card card-2">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
            <div class="card card-3">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">Ut enim ad minim veniam.</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
            <div class="card card-4">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">Quis nostrud exercitation ullamco laboris nisi.</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
            <div class="card card-5">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">Ut aliquip ex ea commodo consequat. Duis aute irure dolor.</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
            <div class="card card-1">
              <div class="card__icon"><i class="fas fa-bolt"></i></div>
              <p class="card__exit"><i class="fas fa-times"></i></p>
              <h2 class="card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
              <p class="card__apply">
                <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
              </p>
            </div>
          </div>
        </div> 
        )
    }
    if(categoriesIngredientList.loading) {
        return <p>loading</p>;
    }
    if(categoriesIngredientList.errorMsg !== "") {
        return <p>{categoriesIngredientList.errorMsg}</p>;
    }

    return <p>Impossible d'obtenir des données</p>;
};
        return(
          <div>
          {showData()}
          </div>
        )
    

}

export default IngredientCategories;