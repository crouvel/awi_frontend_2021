import React, { Component } from 'react';
import './ProgressionCreation.css';
import { Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import { useFormik } from 'formik';

const ProgressionCreation = () => {
    let { nomRecette } = useParams();
    
    /*const validate = () => {
        const errors = {};

        if (!nomRecette) {
            errors.NomRecette = 'Nom de recette requis';
        } 

        if (!nomAuteur) {
            errors.NomAuteur = "Nom d'auteur requis";
        } 

        if (!nombreCouverts) {
            errors.Nbrecouverts = 'Nombre de couverts requis';
        } 
        return errors;
    };

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
                                    return <option>
                                        {element.categorieNom}</option>;
                                })
                            }
                        </select>
                        {formik.errors.CategorieRecette ? (
                            <div className="erreur">{formik.errors.CategorieRecette}</div>
                        ) : null}
                    </div>
                </div>

                {  nomRecette && nomAuteur && nombreCouverts && categorieRecette ?
                <Link to={"/sheets/creation/" + nomRecette}>
                <Button type="button" size="lg" onClick={displayInfo} className="submit-button mt-3"><div>Créer fiche technique</div>

                </Button>
                 </Link> : null}

            </form>

        );
    };*/
        return (
            <>
                <Link to="/sheets">
                    <Button className="create-sheet2 m-3" variant="contained" size="lg">
                        <div>{"<< FICHES TECHNIQUES"}</div>
                    </Button>
                </Link>
                <div className="container mt-2 mb-2" >
                {/* <h1 className="text-center contained-text">Recette {nomRecette} créée !</h1> */}
                
                <div className="text-center">
                    <h1>Ajouter une progression</h1>
                    <h2>{nomRecette}</h2>
                </div>
                </div>
            </>
        )
}

export default ProgressionCreation;