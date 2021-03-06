import React, { Component, useState, useEffect, Text } from 'react';
import './EtiquetteVente.css';
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
import BackButtonTechnichalSheet from '../../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet';
import axios from 'axios';
import serverURL from '../../../serverURL';
import Loading from '../../Loading/Loading';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const EtiquetteVente = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);

    useEffect(() => {
        async function fetchData(){
        axios(`${serverURL}/api/sheet/${id}`)
            .then((response) => {
                setData1(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/sheet/${id}/ingredientsByCategory`)
                    .then((response) => {
                        setData(response.data);
                        console.log(response.data.map((element) => element.ingredients.split(";").map(
                            (subelement) => subelement)
                        ));
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching data: ", error);
                        setError(error);
                    })
                    .finally(() => {
                    });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
        }
        fetchData();
    }, []);

    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    return (
        <>
            <Link to={"/sheetdetail/" + id}>
                <Button className="backfiche m-3" variant="contained" size="lg">
                    <div>{"<< DETAILS FICHE"}</div>
                </Button>
            </Link>
            <div className="text-center">
                <h1 className="mt-4">IMPRIMER UNE ETIQUETTE SANS VENTE</h1>
            </div>
            {(!loading) && data.length > 0 ?
                <>
                    <div className="text-center mt-2 mb-3">
                        <h1><i>{data1[0].nomRecette}</i> </h1>
                    </div>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data1[0].nomRecette.toUpperCase()}_Etiquette-SANS-VENTE`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        <div className="to-print-in-pdf mt-3" id="to-print-in-pdf" ref={container}>
                            <>
                                <div>
                                    <div style={{ marginLeft: "10%", marginRight: "10%", background: "#2ebef7" }}>
                                        <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>ETIQUETTE SANS VENTE</h2>
                                    </div>
                                    <div>
                                       <h2 className="text-center">{data1[0].nomRecette}</h2> 
                                    </div>
                                    <div>
                                        <div style={{ display: "flex", flexDirection: "row", marginLeft: "10%", marginRight: "10%", maxHeight: "auto" }}>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "30%",
                                                marginRight: "1%",
                                                borderWidth: "2px",
                                                maxHeight: "auto"
                                            }}>
                                                <div className="text-center entete2">
                                                    <h3>Cat??gorie d'Ingr??dient</h3>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "68%",
                                                marginLeft: "1%",
                                                borderWidth: "2px",
                                                maxHeight: "auto"
                                            }}>
                                                <div className="text-center entete2">
                                                    <h3>INGREDIENTS</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: "15%" }}>
                                            <table>
                                                <tbody className="body-gauche">
                                                    {data.map(
                                                        (element) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <tr style={{ width: "90%" }}>
                                                                            <div>
                                                                                <td style={{ fontSize: "30px", marginRight: "20%", marginTop: "5%" }} className="text-center">
                                                                                    <h4>{element.libelleCategorie}</h4>
                                                                                </td>
                                                                            </div>
                                                                        </tr>
                                                                        <div style={{ marginLeft: "250%" }}>
                                                                            <td style={{ fontSize: "20px", width: "300px" }}>
                                                                                <tr className="title-list2">INGREDIENTS:</tr>
                                                                                {element.ingredients.split(";").map(
                                                                                    (subelement) => {
                                                                                        if (subelement.includes(":Oui")) {
                                                                                            return <tr><b>{subelement.substring(0, subelement.indexOf(':'))}</b>&nbsp;<i><b>(Allerg??ne)</b></i></tr>
                                                                                        } else {
                                                                                            return <tr>{subelement.substring(0, subelement.indexOf(':'))}</tr>
                                                                                        }
                                                                                    }
                                                                                )}
                                                                            </td>
                                                                        </div>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: "10%", marginRight: "10%", background: "#2ebef7" }}>
                                        <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>- ETIQUETTE : {data1[0].nomRecette.toUpperCase()} -</h2>
                                    </div>
                                </div>
                            </>
                        </div>
                    </PDFExport>
                    <div className="text-center mt-5">
                        <Button className="etiquette2" onClick={exportPDFWithComponent} variant="contained" size="lg">
                            <div className="mt-1" style={{fontSize: "30px"}}>IMPRIMER L'ETIQUETTE</div>
                        </Button>
                    </div>
                </>
                :
                <Loading />}
        </>
    );
}

export default EtiquetteVente;