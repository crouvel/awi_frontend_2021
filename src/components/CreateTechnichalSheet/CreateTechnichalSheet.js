import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './CreateTechnichalSheet.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect,
    useHistory
} from "react-router-dom";
import { useFormik } from 'formik';
import serverURL from "../../serverURL";
import BackButtonTechnichalSheet from "../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import Loading from "../Loading/Loading";

const CreateTechnichalSheet = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nomRecette, setNomRecette] = useState('');
    const [nomAuteur, setNomAuteur] = useState('');
    const [nombreCouverts, setNombreCouverts] = useState(0);
    const [categorieRecette, setCategorieRecette] = useState('Entrée');
    const [fiches, setFiches] = useState([]);
    const [sheetCreated, setSheetCreated] = useState(false);
    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
        const res = await axios(`${serverURL}/api/recetteCategories`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
                axios(`${serverURL}/api/sheet`)
                    .then((response) => {
                        setFiches(response.data.map((element) => element.nomRecette));
                        console.log(response.data.map((element) => element.nomRecette));
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching data: ", error);
                        setError(error);
                    })
                    .finally(() => {

                    });
            })
            .finally(() => {
            });
        return await res;
        }
        fetchData();
    }, []);

    const validate = () => {
        const errors = {};

        if (!nomRecette) {
            errors.NomRecette = 'Nom de recette requis';
        } else if (fiches.includes(nomRecette)) {
            errors.NomRecette = 'Nom de recette déjà utilisé';
        }

        if (!nomAuteur) {
            errors.NomAuteur = "Nom d'auteur requis";
        } /*else if (values.lastName.length > 20) {
          errors.lastName = 'Must be 20 characters or less';
        }*/

        if (!nombreCouverts) {
            errors.Nbrecouverts = 'Nombre de couverts requis';
        } /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }*/

        return errors;
    };

    const TechnichalSheet = () => {
        setLoading(true);
        axios.post(`${serverURL}/api/sheet/create`, {
            nomRecette,
            nomAuteur,
            nombreCouverts,
            categorieRecette
        }).finally(() => {
            setLoading(false);
            setSheetCreated(true);
        })
        console.log(nomRecette);
    }

    const SheetCreationForm = () => {
        const formik = useFormik({
            initialValues: {
                NomRecette: '',
                NomAuteur: '',
                Nbrecouverts: '',
                CategorieRecette: ''
            },
            validate,
        });

        const goProgression = () => {
            const url = `/sheets/creation/${nomRecette}`;
            history.push(url);
        }

        const goSheets = () => {
            const url = `/sheets`;
            history.push(url);
        }

        return (

            <>
                {!loading && !sheetCreated ?
                    <div className="container mt-3" >
                        <div className="text-center mb-4">
                            <h1>Créer une fiche technique</h1>
                            <p className="intro">Ici, vous pouvez créer votre fiche technique.</p>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="container-input1">
                                <div className="sub-container">
                                    <label htmlFor="NomRecette">Nom de la recette</label>
                                    <input
                                        id="NomRecette"
                                        name="NomRecette"
                                        type="text"
                                        onChange={(event) => {
                                            setNomRecette(event.target.value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        className="input1"
                                    />
                                    {formik.errors.NomRecette ? (
                                        <div className="erreur">{formik.errors.NomRecette}</div>
                                    ) : null}
                                </div>

                                <div className="sub-container">
                                    <label htmlFor="NomAuteur" className="font-weight-bold">Nom de l'auteur</label>
                                    <input
                                        id="NomAuteur"
                                        name="NomAuteur"
                                        type="text"
                                        onChange={(event) => {
                                            setNomAuteur(event.target.value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        /*value={formik.values.NomAuteur}*/
                                        className="input1"
                                    />
                                    {formik.errors.NomAuteur ? (
                                        <div className="erreur">{formik.errors.NomAuteur}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="container-input2">
                                <div className="sub-container">
                                    <label htmlFor="Nbrecouverts" className="font-weight-bold">Nombre de couverts</label>
                                    <input
                                        id="Nbrecouverts"
                                        name="Nbrecouverts"
                                        type="number"
                                        min="1"
                                        onChange={(event) => {
                                            setNombreCouverts(event.target.value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        /*value={formik.values.Nbrecouverts}*/
                                        className="input-select"
                                    />
                                    {formik.errors.Nbrecouverts ? (
                                        <div className="erreur">{formik.errors.Nbrecouverts}</div>
                                    ) : null}
                                </div>

                                <div className="sub-container">
                                    <label htmlFor="CategorieRecette" className="font-weight-bold">Catégorie de Recette</label>
                                    <select name="CategorieRecette" id="CategorieRecette" className="input-select" onChange={(event) => {
                                        setCategorieRecette(event.target.value);
                                    }}>
                                        {
                                            data.map(element => {
                                                return <option /*value={formik.values.CategorieRecette}*/>
                                                    {element.categorieNom}</option>;
                                            })
                                        }
                                    </select>
                                    {formik.errors.CategorieRecette ? (
                                        <div className="erreur">{formik.errors.CategorieRecette}</div>
                                    ) : null}
                                </div>
                            </div>

                            {!(fiches.includes(nomRecette)) && nomRecette && nomAuteur && nombreCouverts && categorieRecette ?
                                <div className="text-center">
                                    <Button type="button" size="lg" onClick={TechnichalSheet} className="submit-button mt-3"><div>Créer fiche technique</div>
                                    </Button>
                                </div> : null}
                        </form>
                    </div>
                    : (!loading && sheetCreated ?
                        <div className="container4 p-5 mt-3" >
                            <div className="text-center mb-4">
                                <h1>La fiche technique {nomRecette} a bien été créée !</h1>
                                <h2 className="intro">Il vous faut y associer une progression, y créer des étapes et y assovier des ingrédients.<br />
                                    Voulez-vous ajouter une progression maintenant ?</h2>
                            </div>
                            <div className="mt-5 text-center">
                                <button className="btn btn-success btn-lg m-2" style={{ height: "75px", width: "380px" }} onClick={goProgression}>Associer une progression</button>
                            </div>
                            <div className=" text-center">
                                <button className="btn btn-info btn-lg m-2" onClick={goSheets}>Ajouter ultérieurement</button>
                            </div>
                        </div>
                        : <Loading />)}
            </>
        );
    };

    return (
        <>
            <BackButtonTechnichalSheet />
            <h1 className="text-center create mt-4 mb-3">CREER VOTRE FICHE TECHNIQUE</h1>
            {!sheetCreated ?
                <h2 className="intro text-center">Le bouton de création n'apparaitra dés lors que toutes les informations requises seront remplies correctement.</h2>
                : null}
            {
                SheetCreationForm()
            }
        </>
    );

}

export default CreateTechnichalSheet;