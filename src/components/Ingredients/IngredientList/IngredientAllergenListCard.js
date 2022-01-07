import React from 'react';

import './IngredientListCard.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";

const IngredientAllergenListCard = (props) => {
    const { data } = props
    return (
        <>
         {/* <Link to={"/mercurial/ingredients/" + data.id} style={{ color: 'inherit', textDecoration: 'inherit'}} > */}
            <div className="card2 card-7 mt-4 align-middle">
                <h2 className="titre pl-3">{data.libelle}</h2>
            </div>
            {/* </Link>  */}
        </>
    );
}

export {
    IngredientAllergenListCard
};
