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
import TechnichalSheetCards from '../TechnichalSheetCards/TechnichalSheetCards';

class TechnichalSheets extends Component {

    render() {
        return (
            <>
                <div className="text-center mt-4">
                    <h1>Fiches Techniques</h1>
                    <p className="intro">Ici, vous pouvez créer, consulter ainsi que modifier vos fiches techniques.</p>
                </div>
                <div className="button-container text-center mt-3">
                    <Link to={"/sheets/" + "creation"}>
                        <Button className="create-sheet" variant="contained" size="lg">
                            + Créer une fiche technique
                        </Button>
                    </Link>
                </div>
                <div className="sheetcontainer">
                <TechnichalSheetCards />
                </div>
            </>
        )
    }

}

export default TechnichalSheets;