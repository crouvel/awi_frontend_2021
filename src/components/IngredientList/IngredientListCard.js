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

const IngredientListCard = (props) => {
    const { data } = props
    return (
        <>
            <div className="card2 mt-4 align-middle">
                <h2 className="titre pl-3">{data.Libellé}</h2>
            </div>
        </>
    )
}

export {
    IngredientListCard
};
