import React, { Component, useState, useEffect, Text, Fragment } from 'react';
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

const EtiquetteAvecVente = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [platVendu, setPlatVendu] = useState(0);
    const [plat, setPlat] = useState(false);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);


    useEffect(() => {
        axios(`${serverURL}/api/sheet/${id}/join`)
            .then((response) => {
                setData1(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/sheet/${id}/ingredientsByCategory`)
                    .then((response) => {
                        setData(response.data);
                        console.log(response.data);
                        axios(`${serverURL}/api/sheet/${id}/ingredientsForVente`)
                            .then((response) => {
                                setData2(response.data);
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
    }, []);

    const exportPDFWithComponent = () => {

        if (pdfExportComponent.current) {
            pdfExportComponent.current.save();
        }
    };

    const goPlats = () => {
        setPlat(true);
    };

    const cancelPlat = () => {
        setPlat(false);
    };

    const applyQuantite1 = () => {
        var enought = true;
        console.log(data2[0]);
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].quantiteStockee < data2[i].quantite) {
                enought = false;
            }
        }
        if (enought === false) {
            console.log('quantité non suffisantes');
            alert(`Les quantités d'ingrédients ne sont pas assez suffisantes, veuillez ré-approvisionnez l'inventaire.
            La vente de cette recette ne peut se faire.`);

        } else {
            setLoading(true);
            axios.put(`${serverURL}/api/sheet/updateAllQuantiteVente1`, {
                platVendu: 1,
                nomProgression: data1[0].nomProgression
            }).then((response) => {
                setLoading(false);
                console.log('vente effectuée !');
                alert(`La vente de la recette ${data1[0].nomRecette} a bien été prise en compte !`);
                exportPDFWithComponent();
            })
                .catch((error) => {
                    console.error("Error updating data: ", error);
                    setError(error);
                })
                .finally(() => {
                });
        }
    }

    const applyQuantite2 = () => {
        var enought = true;
        console.log(data2[0]);
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].quantiteStockee < data2[i].quantite * platVendu) {
                enought = false;
            }
        }
        if (enought === false) {
            console.log('quantité non suffisantes');
            alert(`Les quantités d'ingrédients ne sont pas assez suffisantes, veuillez ré-approvisionnez l'inventaire.
            La vente de ${platVendu} exemplaire(s) de cette recette ne peut se faire.`);

        } else {
            setLoading(true);
            axios.put(`${serverURL}/api/sheet/updateAllQuantiteVente1`, {
                platVendu: platVendu,
                nomProgression: data1[0].nomProgression
            }).then((response) => {
                setLoading(false);
                console.log('vente effectuée !');
                window.location.reload(false);
            })
                .catch((error) => {
                    console.error("Error updating data: ", error);
                    setError(error);
                })
                .finally(() => {
                });
        }
    }

    return (
        <>
            <Link to={"/sheetdetail/" + id}>
                <Button className="backfiche m-3" variant="contained" size="lg">
                    <div>{"<< DETAILS FICHE"}</div>
                </Button>
            </Link>
            {(!loading) && data.length > 0 ?
                <>
                    <div className="text-center mt-2 mb-3">
                        <h1>Fiche Technique : {data1[0].nomRecette} </h1>
                    </div>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data1[0].nomRecette.toUpperCase()}_Etiquette-AVEC-VENTE`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        <div className="to-print-in-pdf mt-3" id="to-print-in-pdf" ref={container}>
                            <>
                                <div>
                                    <div style={{ marginLeft: "10%", marginRight: "10%", background: "#2ebef7" }}>
                                        <h2 className="header mt-4" style={{ textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol" }}>VENTE A EMPORTER</h2>
                                    </div>
                                    <div>
                                        <h2 className="text-center"><i>{data1[0].nomRecette}</i><br /> <text>Vente effectuée le {String(new Date().getDate()).padStart(2, '0') + "/" + String(new Date().getMonth() + 1).padStart(2, '0') + "/" + new Date().getFullYear()}</text></h2>
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
                                                    <h3>Catégorie d'Ingrédient</h3>
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
                                                                                <td style={{ fontSize: "20px", marginRight: "20%", marginTop: "5%" }} className="text-center">
                                                                                    <h4>{element.libelleCategorie}</h4>
                                                                                </td>
                                                                            </div>
                                                                        </tr>
                                                                        <div style={{ marginLeft: "250%" }}>
                                                                            <td style={{ fontSize: "20px", width: "300px" }}>
                                                                                <tr className="title-list3">INGREDIENTS:</tr>
                                                                                {element.ingredients.split(";").map(
                                                                                    (subelement) => {
                                                                                        if (subelement.includes(":Oui")) {
                                                                                            return <tr><b>{subelement.substring(0, subelement.indexOf(':'))}</b>&nbsp;<i><b>(Allergène)</b></i></tr>
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
                    {!plat ?
                        <div className="text-center mt-5">
                            <Button className="etiquette2" onClick={applyQuantite1} variant="contained" size="lg">
                                <div className="mt-1" style={{ fontSize: "30px" }}>IMPRIMER L'ETIQUETTE</div>
                            </Button>
                            <Button className="plats" variant="contained" size="lg" onClick={goPlats}>
                                <div className="mt-1" style={{ fontSize: "30px" }}>NOMBRE DE PLAT(S) VENDU(S)</div>
                            </Button>
                        </div> :
                        <>
                            <div className="text-center mt-5">
                                <Button className="etiquette2" onClick={applyQuantite1} variant="contained" size="lg" disabled>
                                    <div className="mt-1" style={{ fontSize: "30px" }}>IMPRIMER L'ETIQUETTE</div>
                                </Button>
                                <Button className="plats" variant="contained" size="lg" onClick={goPlats} disabled>
                                    <div className="mt-1" style={{ fontSize: "30px" }}>NOMBRE DE PLAT(S) VENDU(S)</div>
                                </Button>
                            </div>
                            <div className="d-flex subcontainer3 mt-4">
                                <input
                                    id="Plat"
                                    name="Plat"
                                    type="number"
                                    min="1"
                                    onChange={(event) => {
                                        setPlatVendu(event.target.value);
                                    }}
                                    className="inputsheet"
                                    placeholder="Indiquez un nbre de plats vendus ..."
                                />
                                {platVendu ? <button className="vente btn-lg btn-info" onClick={applyQuantite2}>appliquer</button> :
                                    <button className="vente btn-lg btn-light" disabled>appliquer</button>}
                            </div>
                            <div className="text-center">
                                <button className="cancel btn-lg" onClick={cancelPlat}>Annuler</button>
                            </div>
                        </>
                    }
                </>
                :
                <Loading />}
        </>
    );
}

export default EtiquetteAvecVente;