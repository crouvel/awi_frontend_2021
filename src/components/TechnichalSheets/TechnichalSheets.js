import React, { Component } from 'react';
import './TechnichalSheets.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import TechnichalSheetCards from './TechnichalSheetCards/TechnichalSheetCards';
import CategoryRecetteCards from './CategoryRecette/CategoryRecetteCards';

class TechnichalSheets extends Component {

    render() {
        return (
            <>
                <div className="text-center mt-5">
                    <h1>Fiches Techniques</h1>
                    <p className="intro">Ici, vous pouvez créer, consulter ainsi que modifier vos fiches techniques.</p>
                </div>
                <div className="button-container text-center mt-4">
                    <Link to={"/sheet/" + "creation"}>
                        <Button className="create-sheet" variant="contained" size="lg">
                            + Créer une fiche technique
                        </Button>
                    </Link>
                </div>
                <div className="sheetcontainer mt-4">
                <CategoryRecetteCards />
                </div>
            </>
        )
    }

}

export default TechnichalSheets;