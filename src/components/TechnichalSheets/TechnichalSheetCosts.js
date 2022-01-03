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
import BackButtonTechnichalSheet from '../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet';
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
    let [total, setTotal] = useState([]);
    let [coefficient, setCoefficient] = useState(2.8);
    let [coefficientfp, setCoefficientfp] = useState(1.4);
    let [applyCoefficient1, setApplyCoefficient1] = useState(false);
    let [applyCoefficient2, setApplyCoefficient2] = useState(false);
    let [coutMoyen, setCoutMoyen] = useState(15);
    let [coutForfaitaire, setCoutForfaitaire] = useState(5);
    let [newCoefficient, setNewCoefficient] = useState(0);

    useEffect(() => {
        axios(`${serverURL}/api/sheet/${id}`)
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/sheet/${id}/steps`)
                    .then((response) => {
                        setSteps(response.data);
                        console.log(response.data);
                        axios(`${serverURL}/api/sheet/${id}/ingredients`)
                            .then((response) => {
                                setIngredients(response.data);
                                console.log(response.data);
                                axios(`${serverURL}/api/sheet/${id}/total`)
                                    .then((response) => {
                                        setTotal(response.data);
                                        console.log(response.data);
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
    }, []);


    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const addCoefficient1 = () => {
        setApplyCoefficient1(true);
    }

    const addCoefficient2 = () => {
        setApplyCoefficient2(true);
    }

    return (
        <>
            <Link to={"/sheetdetail/" + id}>
                <Button className="backfiche m-3" variant="contained" size="lg">
                    <div>{"<< DETAILS FICHE"}</div>
                </Button>
            </Link>
            {/* <div>calculs couts</div> */}
            {!loading ?
                <>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data[0].nomRecette}`}
                        author={data[0].nomAuteur}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        <div className="to-print-in-pdf mt-3" id="to-print-in-pdf" ref={container}>
                            <div style={{ marginLeft: "10%", marginRight: "10%", background: "#73A4FF" }}>
                                <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>FICHE TECHNIQUE</h2>
                            </div>
                            {/** content fiche technique à ajouter */}
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
                                        <h3>DENOMINATION</h3>
                                    </div>
                                    <div style={{ minHeight: "200px", maxHeight: "auto", marginTop: "5px" }}>
                                        <tr style={{
                                            backgroundColor: "#73A4FF",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
                                        }} width="100%">
                                            <th ><td width="120px" className="text-center">Code</td>
                                                <td width="380px" className="text-center">Nature</td>
                                                <td width="120px" className="text-center">Unité</td></th>
                                        </tr>
                                        <table>
                                            <tbody>
                                                {ingredients.map(
                                                    (element) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td width="170px">{element.codes.split(",").map(
                                                                        (subelement) => {
                                                                            return <tr>{subelement}</tr>
                                                                        }
                                                                    )}</td>
                                                                    <td width="380px" >
                                                                        <div ></div>
                                                                        {element.ingredients.split(",").map(
                                                                            (subelement2) => {
                                                                                return <tr>{subelement2}</tr>
                                                                            }
                                                                        )}</td >
                                                                    <td width="120px">{element.unites.split(",").map(
                                                                        (subelement3) => {
                                                                            return <tr>{subelement3}</tr>
                                                                        }
                                                                    )}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "40%",
                                    marginLeft: "10%",
                                    borderWidth: "2px",
                                    maxHeight: "auto"
                                }}>
                                    <div className="text-center entete">
                                        <h3>VALORISATION</h3>
                                    </div>
                                    <div style={{ minHeight: "200px", maxHeight: "auto", marginTop: "5px" }}>
                                        <tr style={{
                                            backgroundColor: "#73A4FF",
                                            fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
                                        }} width="100%">
                                            <th ><td width="120px" className="text-center">TOTAL</td>
                                                <td width="380px" className="text-center">Prix U</td>
                                                <td width="120px" className="text-center">PTHT</td></th>
                                        </tr>
                                        <table>
                                            <tbody>
                                                {ingredients.map(
                                                    (element) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td width="170px">{element.quantites.split(",").map(
                                                                        (subelement) => {
                                                                            return <tr>{subelement}</tr>
                                                                        }
                                                                    )}</td>
                                                                    <td width="400px">
                                                                        {element.prix.split(",").map(
                                                                            (subelement2) => {
                                                                                return <tr>{subelement2}€</tr>
                                                                            }
                                                                        )}</td >
                                                                    <td width="120px">{element.prix_total.split(",").map(
                                                                        (subelement3) => {
                                                                            return <tr>{subelement3}€</tr>
                                                                        }
                                                                    )}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <tr><td width="60%"><b>Total denrées</b></td>
                                            <td width="40%">{total[0].prix_total} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>ASS 5%</b></td>
                                            <td width="40%">{total[0].prix_total * 0.05} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût matière</b></td>
                                            <td width="40%">{total[0].prix_total * 0.05 + total[0].prix_total} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût personnel</b></td>
                                            <td width="40%">{coutMoyen * (steps[0].total_temps / 60)} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût fluide</b></td>
                                            <td width="40%">{coutForfaitaire} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût de production total</b></td>
                                            <td width="40%">{coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût de production pour portion de 200g</b></td>
                                            <td width="40%">{(coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)) / (total[0].qtetotale / 0.2)} €</td>
                                        </tr>
                                        <tr>
                                            <td width="70%"><b>Prix de vente pour portion de 200g</b></td>
                                            <td width="40%">{((coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)) / (total[0].qtetotale / 0.2)) * coefficientfp} €</td>
                                        </tr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PDFExport>
                    {!applyCoefficient1 && !applyCoefficient2 ?
                        <>
                            <div className="text-center mt-4">
                                <Button className="coefficient mt-3" onClick={addCoefficient1} variant="contained" size="lg">
                                    Appliquer un coefficient particulier SANS coût des fluides et du personnel
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="sans mt-3" onClick={addCoefficient1} variant="contained" size="lg">
                                    Appliquer un coefficient AVEC coût des fluides et du personnel
                                </Button>
                            </div>
                        </> :
                        <>
                            <div className="text-center mt-4">
                                <Button className="coefficient mt-3" onClick={addCoefficient1} variant="contained" size="lg" disabled>
                                    Appliquer un coefficient SANS coût des fluides et du personnel
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="sans mt-3" onClick={addCoefficient2} variant="contained" size="lg" disabled>
                                    Appliquer un coefficient AVEC coût des fluides et du personnel
                                </Button>
                            </div>
                        </>
                    }
                    {applyCoefficient1 ?
                        <div className="d-flex subcontainer3 mt-2">
                            <input
                                id="Coefficient"
                                name="Coefficient"
                                type="number"
                                min="1"
                                step="0.01"
                                onChange={(event) => {
                                    setNewCoefficient(event.target.value);
                                }}
                                //onBlur={formik.handleBlur}
                                className="inputsheet"
                                placeholder="Appliquer un coefficient ..."
                            />
                            {newCoefficient ? <button className="appliquer btn-lg btn-success">appliquer</button> :
                                <button className="appliquer btn-lg btn-light" disabled>appliquer</button>}
                        </div>
                        : null
                    }
                </> :
                <Loading />}


        </>
    );
}

export default TechnichalSheetCosts;