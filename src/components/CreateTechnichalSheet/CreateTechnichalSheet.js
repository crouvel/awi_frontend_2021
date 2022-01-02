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
    Redirect
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

    useEffect(() => {
        axios(`${serverURL}/api/recetteCategories`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
            axios(`${serverURL}/api/sheet`)
            .then((response) => {
                setFiches(response.data.map((element) => element.nomRecette));
                console.log(response.data.map((element) => element.nomRecette));
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });

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
        axios.post(`${serverURL}/api/sheet/create`, {
            nomRecette,
            nomAuteur,
            nombreCouverts,
            categorieRecette
        });
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

        return (
            <>
            {!loading ? 
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
    
                    {  !(fiches.includes(nomRecette)) && nomRecette && nomAuteur && nombreCouverts && categorieRecette ?
                    <div className="text-center">
                    <Link to={"/sheets/creation/" + nomRecette}>
                    <Button type="button" size="lg" onClick={TechnichalSheet} className="submit-button mt-3"><div>Créer fiche technique</div>
                    </Button>
                     </Link> 
                     </div>: null}
                </form>
            
                : <Loading />}
                </>  
        );
    };

    return (
        <>
           <BackButtonTechnichalSheet/>
            <h1 className="text-center create mt-4 mb-3">CREER VOTRE FICHE TECHNIQUE</h1>
            <h2 className="intro text-center">Le bouton de création n'apparaitra dés lors que toutes les informations requises seront remplies correctement.</h2>
            <div className="container mt-3" >
                <div className="text-center mb-4">
                    <h1>Créer une fiche technique</h1>
                    <p className="intro">Ici, vous pouvez créer votre fiche technique.</p>
                </div>
                {
                    SheetCreationForm()
                  
                }
            </div>
        </>
    );

}

export default CreateTechnichalSheet;