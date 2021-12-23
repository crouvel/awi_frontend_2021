import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './AddIngredientsStep.css';
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
import Pdf from "react-to-pdf";
import BackButtonTechnichalSheet from "../BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import Select from 'react-select';

const AddIngredientsStep = () => {
    let { nomRecette, nomProgression } = useParams();
    const [nomListe, setNomListe] = useState('');
    const [libelleIngredient, setLibelleIngredient] = useState('');
    const [quantite, setQuantite] = useState(0);
    const [addIngredient, setAddIngredient] = useState(false);
    const options = [{ value: '1', label: 'oui' }, { value: '2', label: "tt" }];
    const [ingredientAdded, setIngredientAdded] = useState(false);
    const [listIngredientsAdded, setListIngredientsAdded] = useState(false);
    const [addMoreIngredientsList, setAddMoreIngredientsList] = useState(true);
    console.log(addMoreIngredientsList);
    const displayInfo5 = () => {
        setAddIngredient(true);
        setAddMoreIngredientsList(false);
    }

    const displayInfo6 = () => {
        setIngredientAdded(true);
    }

    const displayInfo7 = () => {
        setIngredientAdded(false);
    }
    
    const displayInfo9 = () => {
        setAddMoreIngredientsList(true);
    }
    const validate = () => {
        const errors = {};

        if (!nomListe) {
            errors.NomListe = "Veuillez indiquer un nom de liste d'ingrédients ou le nom de l'étape associée à cette liste";
        }
        if (!quantite) {
            errors.Quantite = 'Quantité requise';
        }
        if (!libelleIngredient) {
            errors.NomIngredient = 'Veuillez sélectionner un ingrédient';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            NomListe: '',
            Quantite: 0,
            NomIngredient: '',
        },
        validate,
    });

    return (
        <>
            <BackButtonTechnichalSheet />
            <div className="container mt-3 mb-2 text-center" >
                <h1>Progression : {nomProgression}</h1>
            </div>
            <div className="container mt-3 mb-2 text-center" >
                <h2>Associez des ingrédients aux étapes créées</h2>
            </div>
            <div className="container mt-3 mb-2" >
                {!ingredientAdded  ?
                    (!addIngredient || addMoreIngredientsList ?
                        <>
                            <h3 className="text-center mb-2">Associez une liste d'ingrédients à une étape</h3>
                            <div className="container-input1">
                                <div className="sub-container2">
                                    <label htmlFor="NomListe">Nom de la liste d'ingrédients ou de l'étape</label>
                                    <input
                                        id="NomListe"
                                        name="NomListe"
                                        type="text"
                                        onChange={(event) => {
                                            setNomListe(event.target.value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        className="inputname"
                                    />
                                    {formik.errors.NomListe ? (
                                        <div className="erreur">{formik.errors.NomListe}</div>
                                    ) : null}
                                </div>
                                <div className='sub-container3 m-2'>
                                    {nomListe ? <Button type="button" onClick={displayInfo5} className="step-create mt-3"><div>Créer Liste d'ingrédients</div></Button>
                                        : <Button type="button" className="step-create mt-3" disabled><div>Créer Liste d'ingrédients</div></Button>}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="text-center mb-3">
                                <h3 className="mt-1">Associez les ingrédients pour : {nomListe}</h3>
                            </div>
                            <h3 className="mt-4">Ajouter un ingrédient</h3>
                            <div className="container2 mt-3">

                                <div className="sub-container2 mt-1">
                                    <label htmlFor="NomIngredient">Libellé de l'ingrédient</label>
                                    <Select
                                        options={options}
                                        className="select-search"
                                        id="NomIngredient"
                                        name="NomIngredient"
                                        onChange={(event) => {
                                            setLibelleIngredient(event.label);
                                        }}
                                        onBlur={formik.handleBlur} />
                                    {formik.errors.NomIngredient ? (
                                        <div className="erreur">{formik.errors.NomIngredient}</div>
                                    ) : null}
                                </div>
                                <div className="sub-container4">
                                    <label htmlFor="Quantite">Quantité (cf. unité de l'ingrédient)</label>
                                    <input
                                        id="Quantite"
                                        name="Quantite"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        onChange={(event) => {
                                            setQuantite(event.target.value);
                                        }}
                                        onBlur={formik.handleBlur}
                                        className="inputquantite"
                                    />
                                    {formik.errors.Quantite ? (
                                        <div className="erreur">{formik.errors.Quantite}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="text-center">
                                {quantite && libelleIngredient ? <Button type="button" size="lg" onClick={displayInfo6} className="step-create mt-1"><div>Ajouter l'ingrédient</div></Button>
                                    : <Button type="button" size="lg" className="step-create mt-1" disabled><div>Ajouter l'ingrédient</div></Button>}
                            </div>
                        </>
                    ) :
                    null}
                {ingredientAdded && !listIngredientsAdded?
                    <div className="text-center mb-3">
                        <h2 className="mt-1">Associez les ingrédients pour : {nomListe}</h2>
                        <h3 className="mt-4">Voulez-vous ajouter un autre ingrédient ?</h3>
                        <div className="mt-1">
                            <button className="btn btn-primary btn-lg m-2" onClick={displayInfo7}>Ajout d'un autre ingrédient</button>
                            <Link to={"/sheets/creation/" + nomRecette + "/" + nomProgression + "/askFinish"} >
                            <button className="btn btn-success btn-lg m-2">Terminer l'ajout d'ingrédients</button>
                            </Link>
                        </div>
                    </div> :
                    null}   
            </div>
        </>
    );
}

export default AddIngredientsStep;