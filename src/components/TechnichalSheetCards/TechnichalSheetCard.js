import React from 'react';

import './TechnichalSheetCards.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";

const TechnichalSheetCard = (props) => {
  const { data } = props
  return (
    <>     
         <Link to={"/sheets/" + data.idFiche} style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <div className="card card-4">
          <div className="card__icon"><i className="fas fa-bolt"></i></div>
          <p className="card__exit"><i className="fas fa-times"></i></p>
          <h2 className="card__title">{data.nomRecette}</h2>
          <div className="card__apply">
          </div>    
        </div>
        </Link>
    </>
  )
}

export {
    TechnichalSheetCard
};
