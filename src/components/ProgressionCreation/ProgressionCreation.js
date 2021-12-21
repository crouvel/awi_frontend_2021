import React, { Component, useState } from 'react';
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
import BackButtonTechnichalSheet from '../BackButtonTechnichalSheet/BackButtonTechnichalSheet';

const ProgressionCreation = () => {
    let { nomRecette } = useParams();
    const [reference, setReference] = useState('');
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [temps, setTemps] = useState(0);
    const [ordre, setOrdre] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [stepCreated, setStepCreated] = useState(false);
    const [addMoreStep, setAddMoreStep] = useState(false);
    const [addingStepFinished, setAddingStepFinished] = useState(false);

    const validate = () => {
        const errors = {};
        if (!reference) {
            errors.ReferenceProgression = 'Référence requise';
        }
        if (!titre) {
            errors.TitreEtape = 'Titre requis';
        }
        if (!temps) {
            errors.Temps = 'Temps requis';
        }
        if (!ordre) {
            errors.Ordre = 'Ordre requis';
        }
        return errors;
    };

    const displayInfo2 = () => {
        console.log(titre, description, ordre, temps);
        setStepCreated(true);
        console.log(submitted, stepCreated);
    }

    const displayInfo = () => {
        console.log(reference);
        setSubmitted(true);
    }

    const displayInfo3 = () => {
        setStepCreated(false);
        setAddMoreStep(true);
    }

    const CreationProgression = () => {
        const formik = useFormik({
            initialValues: {
                ReferenceProgression: '',
            },
            validate,
        });
        return (
            <>
                {!submitted ? <div className="container mt-2 mb-2" >
                    <div className="text-center">
                        <h1>Ajouter une progression</h1>
                        <h2>{nomRecette}</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="container-input1">
                            <div className="sub-container">
                                <label htmlFor="ReferenceProgression">Référence de la progression</label>
                                <input
                                    id="ReferenceProgression"
                                    name="ReferenceProgression"
                                    type="text"
                                    onChange={(event) => {
                                        setReference(event.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="input3"
                                />
                                {formik.errors.ReferenceProgression ? (
                                    <div className="erreur">{formik.errors.ReferenceProgression}</div>
                                ) : null}
                            </div>
                        </div>

                        {reference ? <Button type="button" size="lg" onClick={displayInfo} className="submit-button mt-3"><div>Ajouter progression</div></Button>
                            : <Button type="button" size="lg" className="button-disabled mt-3" disabled><div>Ajouter progression</div></Button>}

                    </form>
                </div> : null}
            </>
        );
    }

    const AddSteps = () => {
        const formik = useFormik({
            initialValues: {
                TitreEtape: '',
                DescriptionEtape: '',
                Temps: 0,
                Ordre: 0
            },
            validate,
        });
        return (
            <>
                <div className="container mt-3 mb-2 text-center" >
                    <h1>Progression : {reference}</h1>
                </div>
                {!stepCreated ? <div className="container mt-3 mb-2" >
                    {/*addMoreStep ?
                        <div className="container mt-3 mb-2" >
                            <div className="text-center">
                                <h2>Ajouter une autre étape ...</h2>
                            </div>

                        </div>
                    : null*/}

                    <div className="text-center">

                        {!addMoreStep ?
                            <h2>Ajoutez des étapes à la progression</h2> : null}

                    </div>
                    <form onSubmit={formik.handleSubmit}>

                        <div className="sub-container">

                            <label htmlFor="TitreEtape">Titre de l'étape</label>
                            <input
                                id="TitreEtape"
                                name="TitreEtape"
                                type="text"
                                onChange={(event) => {
                                    setTitre(event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                className="input3"
                            />
                            {formik.errors.TitreEtape ? (
                                <div className="erreur">{formik.errors.TitreEtape}</div>
                            ) : null}
                            <label htmlFor="DescriptionEtape">Description de l'étape</label>
                            <textarea
                                id="DescriptionEtape"
                                name="TitreEtape"
                                onChange={(event) => {
                                    setDescription(event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                className="longinput"
                            />
                            <label htmlFor="Temps" className="mt-2">Temps (en min)</label>
                            <input
                                id="Temps"
                                name="Temps"
                                type="number"
                                min="1"
                                onChange={(event) => {
                                    setTemps(event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                className="input3"
                            />
                            {formik.errors.Temps ? (
                                <div className="erreur">{formik.errors.Temps}</div>
                            ) : null}
                            <label htmlFor="Ordre" className="mt-2">Ordre</label>
                            <input
                                id="Ordre"
                                name="Ordre"
                                type="number"
                                min="1"
                                onChange={(event) => {
                                    setOrdre(event.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                className="input3"
                            />
                            {formik.errors.Ordre ? (
                                <div className="erreur">{formik.errors.Ordre}</div>
                            ) : null}
                            {reference && titre && temps && ordre ? <Button type="button" size="lg" onClick={displayInfo2} className="step-create mt-3"><div>Créer l'étape</div></Button>
                                : <Button type="button" size="lg" className="step-create mt-3" disabled><div>Ajouter l'étape</div></Button>}
                        </div>
                    </form>
                </div> : null}
            </>);
    }

    const AddMoreSteps = () => {
        return (
            <>
                {/*<div className="container mt-3 mb-2" >
                     <div className="text-center">
                             <h1>Ajouter d'autres étapes ?</h1>
                         </div>
     
        </div>*/}
                <div className="container mt-3 mb-2" >
                    <div className="text-center">
                        <h2>Voulez-vous ajouter une autre étape ?</h2>
                        <button class="btn btn-primary btn-lg active" onClick={displayInfo3}>Oui</button>
                        <button class="btn btn-success btn-lg">Terminer</button>
                    </div>
                </div>
            </>
        );
    }

    const AddIngredients = () => {
        return (
            <>
                <div>Ajout ingredients</div>
            </>
        )
    }

    return (
        <>
            <BackButtonTechnichalSheet />
            {!submitted ? CreationProgression() : null}
            {submitted ? AddSteps() : null}
            {stepCreated ? AddMoreSteps() : null}
            {addingStepFinished ? AddIngredients() : null}

        </>
    )
}

export default ProgressionCreation;