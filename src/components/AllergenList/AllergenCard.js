import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

const AllergenCard = (props) => {
  const { data } = props
  return (
    <>     
         <Link to={"/allergens/" + data.libelleCategorieAllergene} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <div className="card card-7">
          <div className="card__icon"><i className="fas fa-bolt"></i></div>
          <p className="card__exit"><i className="fas fa-times"></i></p>
          <h2 className="card__title">{data.libelleCategorieAllergene}</h2>
          <div className="card__apply">
              <p className="card__link">Liste des allergènes</p>
          </div>    
        </div>
        </Link>
    </>
  )
}

export {
    AllergenCard
};
