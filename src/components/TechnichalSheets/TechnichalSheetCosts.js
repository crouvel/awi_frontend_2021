import React, { Component, useState, useEffect, Text } from 'react';
import './TechnichalSheetDetail.css';
import './TechnichalSheetCosts.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    useHistory
} from "react-router-dom";
import BackButtonTechnichalSheet from '../BackButtonTechnichalSheet/BackButtonTechnichalSheet';
import axios from 'axios';
import serverURL from '../../serverURL';
import Loading from '../Loading/Loading';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const TechnichalSheetCosts = () => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [steps, setSteps] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

    useEffect(() => {
        axios(`${serverURL}/api/sheet/${id}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
        
        axios(`${serverURL}/api/sheet/${id}/ingredients`)
            .then((response) => {
                setIngredients(response.data);
                //console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Link to={"/sheetdetail/" + id}>
                <Button className="backfiche m-3" variant="contained" size="lg">
                    <div>{"<< DETAILS FICHE"}</div>
                </Button>
            </Link>
            <div>calculs couts</div>
        </>
    );
}

export default TechnichalSheetCosts;