import React, { Component, useState, useEffect, Text } from 'react';
import './TechnichalSheetDetail.css';
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

const TechnichalSheetDetail = () => {
    let { id } = useParams();
    let [data, setData] = useState([]);
    let [data2, setData2] = useState([]);
    let [steps, setSteps] = useState([]);
    let [ingredients, setIngredients] = useState([]);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    const container = React.useRef(null);
    const pdfExportComponent = React.useRef(null);
    const [modify, setModify] = useState(false);
    const [nbCouvert, setNbCouvert] = useState(0);
    const [nomRecette, setNomRecette] = useState('');
    const [auteur, setAuteur] = useState('');
    const history = useHistory();
    const [progression, setProgression] = useState('');
    const [fiches, setFiches] = useState([]);
    console.log("steps" + steps);

    useEffect(() => {
        axios(`${serverURL}/api/sheet/${id}`)
            .then((response) => {
                setData2(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/sheet/${id}/join`)
                    .then((response) => {
                        setData(response.data);
                        console.log(response.data);
                        if (response.data.length > 0) {
                            axios(`${serverURL}/api/sheet/${response.data[response.data.length-1].nomProgression}/steps`)
                                .then((response) => {
                                    console.log(response.data);
                                    setSteps(response.data);
                                })
                                .catch((error) => {
                                    console.error("Error fetching data: ", error);
                                    setError(error);
                                })
                                .finally(() => {
                                });
                        }
                        axios(`${serverURL}/api/sheet/${id}/ingredients`)
                            .then((response) => {
                                console.log(response.data);
                                setIngredients(response.data);
                                axios(`${serverURL}/api/sheet`)
                                    .then((response) => {
                                        console.log(response.data.map((element) =>
                                            element.nomRecette));
                                        setFiches(response.data.map((element) =>
                                            element.nomRecette.toLowerCase()
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

    const modification = () => {
        setModify(true);
    }

    const endModification = () => {
        setModify(false);
    }

    const modifyNomRecette = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/sheet/updateNomRecette`, {
            id: id,
            nomRecette: nomRecette
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyNomAuteur = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/sheet/updateNomAuteur`, {
            id: id,
            auteur: auteur
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const modifyNbCouvert = () => {
        setLoading(true);
        axios.put(`${serverURL}/api/sheet/updateNbcouverts`, {
            id: id,
            nbCouvert: nbCouvert
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {

            });
        console.log(data[0].Nbre_couverts);
        axios.put(`${serverURL}/api/sheet/updateAllQuantite`, {
            nomProgression: data[0].nomProgression,
            nbCouvert: nbCouvert,
            nbCouvertModified: data[0].Nbre_couverts
        }).then((response) => {
        })
            .catch((error) => {
                console.error("Error updating data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                window.location.reload(false);
            });
    }

    const deleteFiche = () => {
        setLoading(true);
        axios.delete(`${serverURL}/api/sheet/delete/${id}`)
            .then((response) => {
            })
            .catch((error) => {
                console.error("Error deleting data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
                const url = "/sheets";
                history.push(url);
            });
    }

    const costs = () => {
        const url = `/sheetdetailcosts/${id}`;
        history.push(url);
    }

    const goProgression = () => {
        const url = `/sheets/creation/${data2[0].nomRecette}`;
        history.push(url);
    }

    const goEtiquette = () => {
        const url = `/sheetEtiquette/${id}`;
        history.push(url);
    }

    const goEtiquetteVente = () => {
        const url = `/sheetEtiquetteVente/${id}`;
        history.push(url);
    }

    const getSteps = () => {

    }

    return (
        <>
            {data2.length === 0 ? <BackButtonTechnichalSheet className="mt-2" />
                : <Link to={"/sheets/" + data2[0].categorieRecette}>
                    <Button className="fichesByCategory m-3" variant="contained" size="lg">
                        <div>{`<< ${data2[0].categorieRecette.toUpperCase()}S`}</div>
                    </Button>
                </Link>}
            {(!loading) && data.length > 0 ?

                <>
                    <div className="text-center mt-2 mb-3">
                        <h1>Fiche Technique :<br /><i>{data[0].nomRecette}</i> </h1>
                    </div>
                    <PDFExport
                        ref={pdfExportComponent}
                        paperSize="auto"
                        margin={40}
                        fileName={`${data[0].nomRecette.toUpperCase()}_Fiche-Technique_SANS-COUTS`}
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
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
                                        <h4 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol", textAlign: "center" }}>{data[0].nomRecette}</h4>
                                        <div style={{ minHeight: "200px", maxHeight: "auto" }}>
                                            <tr style={{
                                                backgroundColor: "#73A4FF",
                                                fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
                                            }} width="100%">
                                                <th ><td width="380px" className="text-center">Denrées</td>
                                                    <td width="160px" className="text-center">Unités</td>
                                                    <td width="140px" className="text-center">Quantité</td></th>
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
                                                                    <td width="455px">{element.ingredients.split(",").map(
                                                                        (subelement) => {
                                                                            return <tr>{subelement}</tr>
                                                                        }
                                                                    )}</td>
                                                                    <td width="160px">{element.unites.split(",").map(
                                                                        (subelement2) => {
                                                                            return <tr>{subelement2}</tr>
                                                                        }
                                                                    )}</td>
                                                                    <td width="110px">{element.quantites.split(",").map(
                                                                        (subelement3) => {
                                                                            return <tr>{subelement3}</tr>
                                                                        }
                                                                    )}</td>
                                                                </>
                                                            );
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
                                        <div style={{ minHeight: "200px", maxHeight: "auto", marginBottom: "20px" }}>
                                            <tr style={{ backgroundColor: "#73A4FF" }}>
                                                <th><td width="70px" className="text-center">N° phase</td>
                                                    <td width="540px" className="text-center">Technique de réalisation</td>
                                                    <td width="70px" className="text-center">DUREE</td></th>
                                            </tr>
                                            <table style={{ marginTop: "10px" }}>
                                                <tbody className="body-gauche">
                                                    {steps.map(
                                                        (element4, index, array) => {
                                                            if (element4.descriptionProgression === null) {
                                                                return (
                                                                    <>
                                                                        <tr className="souspartie-gauche text-center">
                                                                            <td width="90px ml-2">{element4.ordre1}</td>
                                                                            <td className="text-center" width="540px mr-4">
                                                                                <text className="title-list">{element4.titre1}</text> <br />
                                                                                <text> {element4.description1}</text>
                                                                            </td>
                                                                            <td width="70px" style={{ marginLeft: "10px" }}><tr><b>{element4.temps1}'</b></tr></td>
                                                                        </tr>
                                                                    </>
                                                                );
                                                            } else {
                                                                return (
                                                                    <>
                                                                        <tr className="souspartie-gauche text-center">
                                                                            <td width="90px ml-2">{element4.ordre1}</td>

                                                                            {((index - 1) >= 0) && (array[index - 1].titre1 != element4.titre1) || ((index) === 0) ?
                                                                                <td className="text-center" width="540px mr-4">
                                                                                    <text className="title-list">{element4.titre1}</text><br />
                                                                                    <text><u>{element4.titre2}</u></text> <br />
                                                                                    <text> {element4.description2}</text>
                                                                                </td>
                                                                                : <td className="text-center" width="540px mr-4">
                                                                                    <text><u>{element4.titre2}</u></text> <br />
                                                                                    <text> {element4.description2}</text>
                                                                                </td>}

                                                                            <td width="70px" style={{ marginLeft: "10px" }}><tr><b>{element4.temps2}'</b></tr></td>
                                                                        </tr>
                                                                    </>
                                                                );
                                                            }
                                                        })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div style={{ marginBottom: "10px" }}>
                                            <tr style={{ marginTop: "10px" }}>
                                                <td width="570px"><b>TOTAL TEMPS :</b></td>
                                                <td> <b>{steps.map((element) =>
                                                    element.descriptionProgression ? element.temps2 : element.temps1).reduce((a, b) => a + b, 0)}</b> minutes</td>
                                            </tr>
                                        </div>
                                        <div style={{ backgroundColor: "#73A4FF" }}>
                                            <h3 className="headerFicheDroite text-center">MATERIELS DE DRESSAGE</h3>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </PDFExport>
                    {ingredients.length > 0 && steps.length > 0 ?
                        <div className="text-center mt-5">
                            {!modify ?
                                <>
                                    <Button className="generate-pdf" onClick={exportPDFWithComponent} variant="contained" size="lg">
                                        Imprimer la fiche technique
                                    </Button>
                                    <Button className="updateSheet" onClick={modification} variant="contained" size="lg">
                                        Modifier entête
                                    </Button>
                                    <Button className="goCost" onClick={costs} variant="contained" size="lg">
                                        Calculs des coûts
                                    </Button>
                                    <Button className="supprimerfiche2" onClick={deleteFiche} variant="contained" size="lg">
                                        Supprimer la fiche
                                    </Button>

                                    <div className="text-center mt-4">
                                        <Button className="etiquette btn-success" onClick={goEtiquette} variant="contained" size="lg">
                                            <div>Imprimer une étiquette SANS vente</div>
                                        </Button>
                                    </div>

                                    <div className="text-center mt-3">
                                        <Button className="etiquettevente" onClick={goEtiquetteVente} variant="contained" size="lg">
                                            <div>Imprimer une étiquette AVEC vente</div>
                                        </Button>
                                    </div>
                                </> :
                                <>
                                    <Button className="generate-pdf" onClick={exportPDFWithComponent} variant="contained" size="lg" disabled>
                                        Imprimer la fiche technique
                                    </Button>
                                    <Button className="updateSheet" onClick={modification} variant="contained" size="lg" disabled>
                                        Modifier entête
                                    </Button>
                                    <div className="text-center mt-2">
                                        <div className="mcontainer mt-4">
                                            <div className="d-flex subcontainer mt-2">
                                                <label htmlFor="NomRecette" className="font-weight-bold">Nom de la recette</label>
                                                <input
                                                    id="NomRecette"
                                                    name="NomRecette"
                                                    type="text"
                                                    onChange={(event) => {
                                                        setNomRecette(event.target.value);
                                                    }}
                                                    className="inputsheet"
                                                    placeholder="Modifiez le nom de la recette ..."
                                                />
                                                {nomRecette ?
                                                    <>
                                                        {!(fiches.includes(nomRecette.toLowerCase())) ?
                                                            <button className="modifierValue btn-lg btn-info" onClick={modifyNomRecette}>modifier</button> :
                                                            <p style={{ color: "blue" }}>Le nom de la recette est déjà utilisé</p>}
                                                    </>
                                                    :
                                                    <button className="modifierValue btn-lg btn-light" disabled>modifier</button>
                                                }
                                            </div>
                                            <div className="d-flex subcontainer mt-2">
                                                <label htmlFor="NbCouvert" className="font-weight-bold">Nombre de couverts</label>
                                                <input
                                                    id="NbCouvert"
                                                    name="NbCouvert"
                                                    type="number"
                                                    min="1"
                                                    onChange={(event) => {
                                                        setNbCouvert(event.target.value);
                                                    }}
                                                    className="inputsheet"
                                                    placeholder="Modifiez le nombre de couverts ..."
                                                />
                                                {nbCouvert ? <button className="modifierValue btn-lg btn-info" onClick={modifyNbCouvert}>modifier</button> :
                                                    <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                            </div>
                                            <div className="d-flex subcontainer mt-2">
                                                <label htmlFor="NomAuteur" className="font-weight-bold">Nom de l'auteur</label>
                                                <input
                                                    id="NomAuteur"
                                                    name="NomAuteur"
                                                    type="text"
                                                    onChange={(event) => {
                                                        setAuteur(event.target.value);
                                                    }}
                                                    className="inputsheet"
                                                    placeholder="Modifiez le nom de l'auteur ..."
                                                />
                                                {auteur ? <button className="modifierValue btn-lg btn-info" onClick={modifyNomAuteur}>modifier</button> :
                                                    <button className="modifierValue btn-lg btn-light" disabled>modifier</button>}
                                            </div>
                                        </div>
                                        <Button className="terminate mt-3" onClick={endModification} variant="contained" size="lg">
                                            Annuler
                                        </Button>
                                    </div>
                                </>}
                        </div> :
                        <div className="text-center mt-4">
                            <Button className="supprimerfiche2" onClick={deleteFiche} variant="contained" size="lg">
                                Supprimer la fiche
                            </Button>
                        </div>}
                </>
                : (data.length === 0 && !loading && data2.length > 0 ?
                    <>
                        <div className="containerSans pb-5 mt-5">
                            <h1 className="text-center mt-5">Veuillez ajouter une progression à la fiche technique :<br /> {data2[0].nomRecette.toUpperCase()}.</h1>
                            <div className="text-center mt-2">
                                <Button className="addProgression mt-3" onClick={goProgression} variant="contained" size="lg">
                                    Créer une progression et des étapes
                                </Button>
                            </div>
                        </div>
                        <div className="containerSansVert mt-5">
                            <h2 className="text-center"><i>Ou veuillez supprimer la fiche technique,<br /> car elle n'est pas associée à une progression.</i></h2>
                            <div className="text-center mt-2">
                                <Button className="supprimerfiche mt-3" onClick={deleteFiche} variant="contained" size="lg">
                                    Supprimer
                                </Button>
                            </div>
                        </div>
                    </> :
                    <Loading />)}
        </>
    );
}

export default TechnichalSheetDetail;