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
import BackButtonTechnichalSheet from "../../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import { SiCheckmarx } from 'react-icons/si';

const FinishCreateTechnichalSheet = () => {
    let { nomRecette } = useParams();

    return (
        <>
            <div className="greencontainer mt-5 mb-2 p-5 text-center" >
                <div className="text-center mt-4 mb-4">
                    <h1>La création de la fiche technique {nomRecette}</h1> <h1>a bien été réalisée !</h1>
                    
                    <SiCheckmarx className="mt-2" size={40} />
                </div>
                <h2 className="mb-3">Vous pouvez désormais la consulter sur la page dédiée aux fiches techniques</h2>
                <div className="text-center mt-4">
                    <Link to={"/sheets"}>
                        <Button className="go-to-sheets btn-success" size="lg">
                            Retour aux fiches techniques
                        </Button>
                    </Link>
                </div>
            </div>

        </>
    );
}

export default FinishCreateTechnichalSheet;