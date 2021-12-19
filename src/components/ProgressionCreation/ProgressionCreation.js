import React, { Component } from 'react';
import './ProgressionCreation.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
  } from "react-router-dom";

class ProgressionCreation extends Component {

    render() {
        return (
            <>
            <div className="text-center">
                <h1>Ajouter une progression à votre fiche technique</h1>
            </div>
           
            </>
        )
    }

}

export default ProgressionCreation;