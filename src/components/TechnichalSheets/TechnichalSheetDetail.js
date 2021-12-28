import React, { Component, useState, useEffect } from 'react';
import './TechnichalSheetDetail.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import BackButtonTechnichalSheet from '../BackButtonTechnichalSheet/BackButtonTechnichalSheet';
import axios from 'axios';
import serverURL from '../../serverURL';
import Loading from '../Loading/Loading';

const TechnichalSheetDetail = () => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [steps, setSteps] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);

    useEffect(() => {
        axios(`${serverURL}/api/sheet/${id}`)
            .then((response) => {
                setData(response.data);
                //console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
        axios(`${serverURL}/api/sheet/${id}/steps`)
            .then((response) => {
                setSteps(response.data);
                //console.log(response.data);
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
                /*IngredientsStepValue();*/
                setLoading(false);
            });

    }, []);

    return (
        <>
            <BackButtonTechnichalSheet className="mt-2" />
            {!loading ?
                    <>
                        <div className="text-center mt-2">
                            <h1>Fiche Technique : {data[0].nomRecette} </h1>
                        </div>

                        <div className="to-print-in-pdf mt-4">
                            <h2 className="header text-center">FICHE TECHNIQUE</h2>

                            <div className="sections-container">
                                <div className="division-droite">
                                    <h3 className="headerFicheDroite text-center">INTITULE</h3>
                                    <h4 className="text-center">{data[0].nomRecette} </h4>
                                    <div className="tableau-droite">
                                        <tr>
                                            <th><td width="200px" className="text-center">Denrées</td>
                                                <td width="100px" className="text-center">Unités</td>
                                                <td width="100px" className="text-center">Quantité</td></th>
                                        </tr>
                                        <table>
                                            <tbody>
                                                {ingredients.map(
                                                    (element) => {
                                                        return (
                                                            <>
                                                                <tr><td className="title-list">{element.nomListeIngredients} :</td>
                                                                    <td></td>
                                                                    <td></td></tr>
                                                                <td width="230px">{element.ingredients.split(",").map(
                                                                    (subelement) => {
                                                                        return <tr>{subelement}</tr>
                                                                    }
                                                                )}</td>
                                                                <td width="100px">{element.unites.split(",").map(
                                                                    (subelement2) => {
                                                                        return <tr>{subelement2}</tr>
                                                                    }
                                                                )}</td>
                                                                <td>{element.quantites.split(",").map(
                                                                    (subelement3) => {
                                                                        return <tr>{subelement3}</tr>
                                                                    }
                                                                )}</td>
                                                            </>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="division-gauche">
                                    <div className="subsections-container">
                                        <div className="subdivision-droite"></div>
                                        <div className="subdivision-gauche"></div>
                                        </div>    
                                </div>
                            </div>
                        </div>
                    </>
                    : <Loading />}
        </>
    )
}

export default TechnichalSheetDetail;