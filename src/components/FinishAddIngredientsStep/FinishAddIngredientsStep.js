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
import BackButtonTechnichalSheet from "../BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import Select from 'react-select';

const FinishAddIngredientsStep = () => {
    let { nomRecette, nomProgression } = useParams();

    return (
        
        <div>finish add ingredients ?</div>
    );
}

export default FinishAddIngredientsStep;