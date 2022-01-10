import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import './ProgressionCreation.css';
import serverURL from "../../serverURL";
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
import BackButtonTechnichalSheet from '../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet';
import { AiFillCheckCircle } from 'react-icons/ai';
import Loading from '../Loading/Loading';
import Select from 'react-select';

const ProgressionCreation = () => {
    let { nomRecette } = useParams();
    const [referenceProgression, setReferenceProgression] = useState('');
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [temps, setTemps] = useState(0);
    const [ordre, setOrdre] = useState(0);
    const [descriptionProgression, setDescriptionProgression] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [stepCreated, setStepCreated] = useState(false);
    const [addMoreStep, setAddMoreStep] = useState(false);
    const [addingStepFinished, setAddingStepFinished] = useState(false);
    const [nomListe, setNomListe] = useState('');
    const [libelleIngredient, setLibelleIngredient] = useState('');
    const [quantite, setQuantite] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [options, setOptions] = useState([]);
    //console.log(options);

    useEffect(() => {
        async function fetchData (){
        axios(`${serverURL}/api/progression`)
            .then((response) => {
                setData(response.data.map((element) =>
                    element.refProgression.toLowerCase()));
                //console.log(response.data.map((element) =>
                //element.refProgression));
                axios(`${serverURL}/api/progression/progressionOrigin`)
                    .then((response) => {
                        //console.log(response.data);
                        if (!(options.length > 0)) {
                            response.data.map((element) =>
                                options.push({ value: element.idProgression, label: element.refProgression }));
                        }
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
    });

    const validate = () => {
        const errors = {};
        if (!referenceProgression) {
            errors.ReferenceProgression = 'Référence requise';
        } else if (!loading && data.includes(referenceProgression.toLowerCase())) {
            errors.ReferenceProgression = 'Nom de progression déjà utilisé';
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

    const ProgressionCreation = () => {
        axios.post(`${serverURL}/api/progression/create`, {
            referenceProgression
        });
        console.log(nomRecette);
        console.log(referenceProgression);
        axios.post(`${serverURL}/api/progression/addSheet`, {
            nomRecette,
            referenceProgression
        });
        setSubmitted(true);
    }

    const StepCreation = () => {
        setLoading(true);
        axios.post(`${serverURL}/api/step/create`, {
            titre,
            description,
            temps,
            ordre,
            referenceProgression,
            descriptionProgression
        }).then((response) => {
            setLoading(false);
        }).catch((error) => {
            console.error("Error creating data: ", error);
            setError(error);
        })
        setStepCreated(true);
    }

    const displayInfo2 = () => {
        console.log(titre, description, ordre, temps);
        setStepCreated(true);
        console.log(submitted, stepCreated);
    }

    const displayInfo = () => {
        console.log(referenceProgression);
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
                {!submitted ?
                    <>
                        <div className="container mt-3 mb-2 p-5" >
                            <div className="text-center">
                                <h1>Ajouter une progression</h1>
                                <h2>{nomRecette}</h2>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="container-input1">
                                    <div className="sub-container2">
                                        <label htmlFor="ReferenceProgression">Nom de la progression</label>
                                        <input
                                            id="ReferenceProgression"
                                            name="ReferenceProgression"
                                            type="text"
                                            onChange={(event) => {
                                                setReferenceProgression(event.target.value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            className="input3"
                                        />
                                        {formik.errors.ReferenceProgression ? (
                                            <div className="erreur">{formik.errors.ReferenceProgression}</div>
                                        ) : null}
                                    </div>
                                </div>
                                {!(data.includes(referenceProgression.toLowerCase())) && referenceProgression ? <Button type="button" size="lg" onClick={ProgressionCreation} className="submit-button mt-3"><div>Ajouter progression</div></Button>
                                    : <Button type="button" size="lg" className="button-disabled mt-3" disabled><div>Ajouter progression</div></Button>}
                            </form>
                        </div>
                    </> : null}
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
                {!stepCreated && !addMoreStep ?
                    <div className="container mt-3 mb-2 text-center" >
                        <Button type="button" size="lg" className="button-disabled mt-3" disabled>
                            <div ><AiFillCheckCircle className='m-2' />Progression ajoutée</div>
                        </Button>
                    </div> : null}

                {!stepCreated ?
                    <>
                        <div className="container mt-3 mb-2" >
                            <div className="text-center mb-3">
                                <h1>Ajoutez une étape à la progression</h1>
                                <h2 className="mt-3">Progression : {referenceProgression}</h2>
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
                                    <label htmlFor="NomIngredient" className="mt-4">PROGRESSION (remplace la description de l'étape)</label>
                                    <Select
                                        options={options}
                                        className="input3"
                                        id="NomIngredient"
                                        name="NomIngredient"
                                        onChange={(event) => {
                                            setDescriptionProgression(event.label);
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Recherchez ou sélectionnez une progression qui représente la description d'une étape ..."
                                    />
                                    <label htmlFor="Temps" className="mt-5">Temps (en min)</label>
                                    <input
                                        id="Temps"
                                        name="Temps"
                                        type="number"
                                        min="0"
                                        step="5"
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
                                    {referenceProgression && titre && temps && ordre ? <Button type="button" size="lg" onClick={StepCreation} className="step-create mt-3"><div>Créer l'étape</div></Button>
                                        : <Button type="button" size="lg" className="step-create mt-3" disabled><div>Ajouter l'étape</div></Button>}
                                </div>
                            </form>
                        </div>
                    </> : null}
            </>);
    }

    const AddMoreSteps = () => {
        return (
            <>
                <div className="container mt-3 mb-2 text-center" >
                    <h1>Progression : {referenceProgression}</h1>
                </div>

                <div className="container mt-3 mb-2 p-5" >
                    <div className="text-center">
                        <h1>Voulez-vous ajouter une autre étape ?</h1>
                        <div className="mt-4">
                            <button className="btn btn-primary btn-lg m-2" onClick={displayInfo3}>Créer une autre étape</button>
                            <Link to={"/sheets/creation/" + nomRecette + "/" + referenceProgression} >
                                <button className="btn btn-success btn-lg m-2" >Terminer l'ajout d'étape</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    return (
        <>
            {/* <BackButtonTechnichalSheet /> */}
            {/* <h1 className="text-center create mt-5 ">CREER UNE PROGRESSION <br /></h1> */}
            <div className="text-center mt-3">
                <Button className="sheet-name mt-3 mb-3" variant="contained" size="lg">
                    <h1 style={{ fontSize: "30px" }}>Fiche technique - {nomRecette.toUpperCase()}</h1>
                </Button>
            </div>
            {loading ? <Loading /> : null}
            {!submitted && !addingStepFinished ? CreationProgression() : null}
            {submitted && !addingStepFinished ? AddSteps() : null}
            {stepCreated && !addingStepFinished ? AddMoreSteps() : null}
        </>
    );
}

export default ProgressionCreation;