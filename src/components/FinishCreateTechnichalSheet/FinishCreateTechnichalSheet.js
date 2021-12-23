import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './FinishCreateTechnichalSheet.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import { useFormik } from 'formik';
import Pdf from "react-to-pdf";
import BackButtonTechnichalSheet from "../BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import { SiCheckmarx } from 'react-icons/si';

const FinishCreateTechnichalSheet = () => {
    let { nomRecette } = useParams();

    return (
        <>
            <div className="container mt-5 mb-2 p-5 text-center" >
                <div className="text-center mb-3">
                    <h1>La création de la fiche technique {nomRecette}</h1> <h1>a bien été réalisée !</h1>
                    <SiCheckmarx className="mt-2" size={40} />
                </div>
            </div>
            <div className="text-center mt-3">
            <Link to={"/sheets"}>
                <Button className="go-to-sheets" size="lg">
                        Retour aux fiches techniques
                </Button>
            </Link>
            </div>
        </>
    );
}

export default FinishCreateTechnichalSheet;