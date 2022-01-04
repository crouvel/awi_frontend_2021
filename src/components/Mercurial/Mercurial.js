import React, { Component } from 'react';
import './Mercurial.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import IngCategorycards from '../Ingredients/IngredientCategoryCards/IngCategorycards';

class Mercurials extends Component {

    render() {
        return (
            <>
                <div className="text-center mt-4">
                    <h1>Mercurial</h1>
                    <p className="intro">Ici, vous pouvez créer, consulter ainsi que modifier vos ingrédients.</p>
                </div>
                <div className="button-container text-center mt-3">
                    <Link to={"/mercurial/createIngredient"}>
                        <Button className="createIngredient" variant="contained" size="lg">
                            + Ajouter un ingrédient
                        </Button>
                    </Link>
                </div>
                <div className="sheetContainer">
                    <div className="classContainer">
                        <IngCategorycards />
                    </div>
                </div>
            </>
        );
    }

}

export default Mercurials;