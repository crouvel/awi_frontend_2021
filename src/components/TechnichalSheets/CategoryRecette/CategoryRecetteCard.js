import React from 'react';

import './CategoryRecetteCard.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

const CategoryRecetteCard = (props) => {
  const { data } = props
  return (
    <>     
         <Link to={"/sheets/" + data.categorieNom} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <div className="card card-2">
          <div className="card__icon"><i className="fas fa-bolt"></i></div>
          <p className="card__exit"><i className="fas fa-times"></i></p>
          <h2 className="card__title">{data.categorieNom}</h2>
          <div className="card__apply">
              <p className="card__link">Liste des {data.categorieNom}s</p>
          </div>    
        </div>
        </Link>
    </>
  )
}

export {
    CategoryRecetteCard
};
