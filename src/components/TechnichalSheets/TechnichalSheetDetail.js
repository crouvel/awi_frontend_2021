import React, { Component, useState, useEffect, Text } from 'react';
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
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Pdf from "react-to-pdf";

const TechnichalSheetDetail = () => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [steps, setSteps] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    //const ref = React.createRef();
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

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
                /*IngredientsStepValue();*/
                setLoading(false);
            });

    }, []);

    /*const pdfSheet = () => {
        let divContents = document.getElementById("to-print-in-pdf").innerHTML;
        let a = window.open('', '');
        a.document.write(divContents);
        a.document.close();
        a.print();
    }*/

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <BackButtonTechnichalSheet className="mt-2" />
            {!loading ?
                <>
                    <div className="text-center mt-2 mb-3">
                        <h1>Fiche Technique : {data[0].nomRecette} </h1>
                    </div>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data[0].nomRecette}`}
                        author={data[0].nomAuteur}
                        style={{fontFamily: 'Montserrat, sans-serif'}}
                    >
                        <div className="to-print-in-pdf mt-3" id="to-print-in-pdf" ref={container}>
                            <>
                                <div style={{ marginLeft: "10%", marginRight: "10%", background: "#73A4FF" }}>
                                    <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>FICHE TECHNIQUE</h2>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginRight: "10%", maxHeight: "auto" }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "40%",
                                        marginRight: "10%",
                                        borderWidth: "2px",
                                        maxHeight: "auto"
                                    }}>
                                        <div className="text-center entete">
                                            <h3>INTITULE</h3>
                                        </div>
                                        <h4 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol", textAlign: "center" }}>{data[0].nomRecette} </h4>
                                        <div style={{ minHeight: "200px", maxHeight: "auto" }}>
                                            <tr style={{
                                                backgroundColor: "#73A4FF",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
                                            }} width="100%">
                                                <th ><td width="380px" className="text-center">Denrées</td>
                                                    <td width="120px" className="text-center">Unités</td>
                                                    <td width="120px" className="text-center">Quantité</td></th>
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
                                                                    <td width="425px">{element.ingredients.split(",").map(
                                                                        (subelement) => {
                                                                            return <tr>{subelement}</tr>
                                                                        }
                                                                    )}</td>
                                                                    <td width="110px">{element.unites.split(",").map(
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
                                        <div className="entete">
                                            <h3 className="headerFicheDroite text-center">MATERIELS SPECIFIQUES</h3>
                                        </div>
                                    </div>
                                    <div className="division-gauche">
                                        <div className="subsections-container">
                                            <div className="subdivision-droite">
                                                <div style={{ backgroundColor: "#73A4FF" }}>
                                                    <h4 className="text-center">Responsable</h4>
                                                </div>
                                                <h4 className="text-center">{data[0].nomAuteur} </h4>
                                            </div>
                                            <div className="subdivision-gauche">
                                                <div style={{ backgroundColor: "#73A4FF" }}>
                                                    <h4 className=" text-center">Nbre de couverts</h4>
                                                </div>
                                                <h4 className="text-center">{data[0].Nbre_couverts} </h4>
                                            </div>
                                        </div>
                                        <div style={{ minHeight: "200px", maxHeight: "auto" }}>
                                            <tr style={{ backgroundColor: "#73A4FF" }}>
                                                <th><td width="70px" className="text-center">N° phase</td>
                                                    <td width="510px" className="text-center">Technique de réalisation</td>
                                                    <td width="50px" className="text-center">DUREE</td></th>
                                            </tr>
                                            <table>
                                                <tbody className="body-gauche">
                                                    {steps.map(
                                                        (element4) => {
                                                            return (
                                                                <>
                                                                    <tr className="souspartie-gauche text-center">
                                                                        <td width="90px ml-2">{element4.ordre}</td>
                                                                        <td className="text-center" width="470px">
                                                                            <text className="title-list">{element4.titre}</text> <br />
                                                                            <text> {element4.description}</text>
                                                                        </td>
                                                                        <td width="50px"><tr>{element4.temps}'</tr></td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ backgroundColor: "#73A4FF" }}>
                                            <h3 className="headerFicheDroite text-center">MATERIELS DE DRESSAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </PDFExport>
                    <div className="text-center mt-5">
                        <Button className="generate-pdf" onClick={exportPDFWithComponent} variant="contained" size="lg">
                            Imprimer la fiche technique
                        </Button>
                    </div>
                </>
                : <Loading />}
        </>
    )
}

export default TechnichalSheetDetail;