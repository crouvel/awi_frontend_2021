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
import { AsyncStorage } from 'AsyncStorage';

const TechnichalSheetCosts = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const [total, setTotal] = useState([]);
    const [coefficient, setCoefficient] = useState(2.8);
    const [coefficientfp, setCoefficientfp] = useState(1.4);
    const [applyCoefficient1, setApplyCoefficient1] = useState(false);
    const [applyCoefficient2, setApplyCoefficient2] = useState(false);
    const [fluidePersonnel, setFluidePersonnel] = useState(true);
    const [coutMoyen, setCoutMoyen] = useState(15);
    const [coutForfaitaire, setCoutForfaitaire] = useState(5);
    const [newCoefficient, setNewCoefficient] = useState(0);
    const [imprimer, setImprimer] = useState(false);

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
        console.log(coefficient);
        console.log(fluidePersonnel);
    }, []);


    const exportPDFWithComponent = () => {
        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
        setImprimer(false);
    };

    const addCoefficient1 = () => {
        setApplyCoefficient1(true);
    }

    const addCoefficient2 = () => {
        setApplyCoefficient2(true);
    }

    const changeCoefficient1 = () => {
        setCoefficient(newCoefficient);
        setFluidePersonnel(false);
        setApplyCoefficient1(false);
    }

    const changeCoefficient2 = () => {
        setFluidePersonnel(true);
        setApplyCoefficient2(false);
    }

    const comeBack2 = () => {
        setApplyCoefficient2(false);
    }

    const comeBack1 = () => {
        setApplyCoefficient1(false);
    }

    const goImprimer = () => {
        setImprimer(true);
    }
    return (
        <>
            <Link to={"/sheetdetail/" + id}>
                <Button className="backfiche m-3" variant="contained" size="lg">
                    <div>{"<< DETAILS FICHE"}</div>
                </Button>
            </Link>
            {!loading ?
                <>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data[0].nomRecette}`}
                        author={data[0].nomAuteur}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <div className="to-print-in-pdf mt-3" id="to-print-in-pdf" ref={container}>
                            <div style={{ marginLeft: "10%", marginRight: "10%", background: "#73A4FF" }}>
                                <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>FICHE TECHNIQUE</h2>
                            </div>
                            {imprimer ?
                                <>
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
                                </> : null}
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
                                        {fluidePersonnel ?
                                            <>
                                                <tr>
                                                    <td width="60%"><b>Coût personnel</b></td>
                                                    <td width="40%">{coutMoyen * (steps[0].total_temps / 60)} €</td>
                                                </tr>
                                                <tr>
                                                    <td width="60%"><b>Coût fluide</b></td>
                                                    <td width="40%">{coutForfaitaire} €</td>
                                                </tr>
                                            </> :
                                            null}
                                        <tr>
                                            <td width="60%"><b>Coût de production total</b></td>
                                            <td width="40%">{Number.parseFloat(coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60))} €</td>
                                        </tr>
                                        <tr>
                                            <td width="60%"><b>Coût de production pour portion de 200g</b></td>
                                            <td width="40%">{Number.parseFloat((coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)) / (total[0].qtetotale / 0.2))} €</td>
                                        </tr>
                                        <tr>
                                            <td width="70%"><b>Prix de vente pour portion de 200g { }</b></td>
                                            {fluidePersonnel ?
                                                <td width="40%">{Number.parseFloat(((coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)) / (total[0].qtetotale / 0.2)) * coefficientfp)} €</td>
                                                :
                                                <td width="40%">{((coutForfaitaire + total[0].prix_total * 0.05 + total[0].prix_total + coutMoyen * (steps[0].total_temps / 60)) / (total[0].qtetotale / 0.2)) * coefficient} €</td>}
                                        </tr>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </PDFExport>
                    {imprimer ? <div className="text-center">
                        <Button className="imprimer btn-lg mt-5" onClick={exportPDFWithComponent} variant="contained">
                            <h3 className="mt-2">IMPRIMER LA FICHE</h3>
                        </Button>
                    </div> : null}
                    {!applyCoefficient1 && !applyCoefficient2 && !imprimer ?
                        <>
                            <div className="text-center mt-4">
                                <Button className="sans mt-3" onClick={addCoefficient1} variant="contained" size="lg">
                                    Appliquer un coefficient particulier SANS coût des fluides et du personnel
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="coefficient mt-3" onClick={addCoefficient2} variant="contained" size="lg">
                                    Appliquer un coefficient AVEC coût des fluides et du personnel
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="btn-info mt-3" onClick={goImprimer} variant="contained" size="lg">
                                    Imprimer une fiche complète avec calcul de coûts
                                </Button>
                            </div>
                        </> :
                        <>
                            <div className="text-center mt-1">
                                <Button className="sans mt-3" onClick={addCoefficient1} variant="contained" size="lg" disabled>
                                    Appliquer un coefficient SANS coût des fluides et du personnel
                                </Button>
                            </div>
                            <div className="text-center">
                                <Button className="coefficient mt-3" onClick={addCoefficient2} variant="contained" size="lg" disabled>
                                    Appliquer un coefficient AVEC coût des fluides et du personnel
                                </Button>
                            </div>
                        </>}
                    {applyCoefficient1 ?
                        <>
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
                                    className="inputsheet"
                                    placeholder="Appliquer un coefficient ..."
                                />
                                {newCoefficient ? <button className="appliquer btn-lg btn-success" onClick={changeCoefficient1}>appliquer</button> :
                                    <button className="appliquer btn-lg btn-light" disabled>appliquer</button>}
                            </div>
                            <div className="text-center">
                                <button className="comeback1 btn-lg" onClick={comeBack1}>Annuler</button>
                            </div>
                        </>
                        : null}
                    {applyCoefficient2 ?
                        <>
                            <div className="d-flex subcontainer3 mt-2">
                                <input
                                    id="Coefficient"
                                    name="Coefficient"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    onChange={(event) => {
                                        setCoefficientfp(event.target.value);
                                    }}
                                    className="inputsheet"
                                    placeholder="Appliquer un coefficient ..."
                                />
                            </div>
                            <div className="d-flex subcontainer3 mt-2">
                                <input
                                    id="CoutForfaitaire"
                                    name="CoutForfaitaire"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    onChange={(event) => {
                                        setCoutForfaitaire(Number.parseFloat(event.target.value));
                                    }}
                                    className="inputsheet"
                                    placeholder="Coût Forfaitaire ..."
                                />
                            </div>
                            <div className="d-flex subcontainer3 mt-2">
                                <input
                                    id="CoutMoyen"
                                    name="CoutMoyen"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    onChange={(event) => {
                                        setCoutMoyen(Number.parseFloat(event.target.value));
                                    }}
                                    className="inputsheet"
                                    placeholder="Coût Moyen ..."
                                />
                            </div>
                            <div className="text-center">
                                {coefficientfp && coutForfaitaire && coutMoyen ? <button className="appliquer btn-lg btn-success" onClick={changeCoefficient2}>appliquer</button> :
                                    <button className="appliquer btn-lg btn-light" disabled>appliquer</button>}
                            </div>
                            <div className="text-center">
                                <button className="comeback2 btn-succes btn-lg" onClick={comeBack2}>Annuler</button>
                            </div>
                        </>
                        : null}
                </> : <Loading />}
        </>
    );
}

export default TechnichalSheetCosts;