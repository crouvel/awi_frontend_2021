import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './FinishAddIngredientsStep.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import { useFormik } from 'formik';
import serverURL from "../../serverURL";
import Pdf from "react-to-pdf";
import BackButtonTechnichalSheet from "../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import Select from 'react-select';

const FinishAddIngredientsStep = () => {
    let { nomRecette, referenceProgression } = useParams();

    return (
        <>
            <BackButtonTechnichalSheet />
            <div className="container mt-3 mb-2 text-center" >
                <h1>Progression : {referenceProgression}</h1>
            </div>
            {/*<div className="container mt-3 mb-2 text-center" >
                <h2>Associez des ingrédients aux étapes créées</h2>
            </div>*/}
            <div className="container mt-3 mb-2 text-center" >
                <h2>Ingrédients ajoutés à la liste !</h2>
            </div>
            <div className="container mt-3 mb-2 text-center" >
                <div className="text-center mb-3">
                    <h2>Voulez-vous ajouter une autre liste d'ingrédients ?</h2>
                    <div className="mt-4">
                        <Link to={"/sheets/creation/" + nomRecette + "/" + referenceProgression} >
                            <button className="btn btn-primary btn-lg m-2">Ajout d'une autre liste</button>
                        </Link>
                        <Link to={"/sheets/" + nomRecette + "/creationFinished"}>
                            <button className="btn btn-success btn-lg m-2">Terminer l'ajout de listes</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FinishAddIngredientsStep;