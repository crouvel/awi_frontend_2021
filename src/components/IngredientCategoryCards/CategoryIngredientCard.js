import React from 'react';

import './CategoryIngredientCard.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import IngredientList from '../IngredientList/IngredientList';

const CategoryIngredientCard = (props) => {
  const { data } = props
  return (
    <>
      
        <div className="card card-1">
          <div className="card__icon"><i className="fas fa-bolt"></i></div>
          <p className="card__exit"><i className="fas fa-times"></i></p>
          <h2 className="card__title">{data.libellé}</h2>
          <div className="card__apply">
            {/* <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a> */}
            <p >
              <Link to={"/mercurial/" + data.idCategorieIngredient}  className="card__link"><p>Ingredients</p></Link>
            </p>
          </div>
          
        </div>
  
    </>
  )
}

export {
  CategoryIngredientCard
};
