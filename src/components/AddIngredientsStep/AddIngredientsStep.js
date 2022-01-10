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
import BackButtonTechnichalSheet from "../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet";
import Select from 'react-select';

const AddIngredientsStep = () => {
    let { nomRecette, referenceProgression } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nomListe, setNomListe] = useState('');
    const [libelleIngredient, setLibelleIngredient] = useState('');
    const [quantite, setQuantite] = useState(0);
    const [addIngredient, setAddIngredient] = useState(false);
    const [options, setOptions] = useState([]);
    const [ingredientAdded, setIngredientAdded] = useState(false);
    const [listIngredientsAdded, setListIngredientsAdded] = useState(false);
    const [addMoreIngredientsList, setAddMoreIngredientsList] = useState(true);
    const [steps, setSteps] = useState([]);
    console.log(referenceProgression);
    const [idd, setIdd] = useState('');
    const [detail, setDetail] = useState([]);

    useEffect(() => {
        async function fetchData1() {
            if (!(options.length > 0)) {
                const res = await axios(`${serverURL}/api/ingredients`)
                    .then((response) => {
                        console.log(response.data);
                        response.data.map((element) =>
                            options.push({ value: element.idIngredient, label: element.libelle }));
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching data: ", error);
                        setError(error);
                    })
                    .finally(() => {
                    });
                return await res;
            }
            const res2 = await axios(`${serverURL}/api/sheet/${referenceProgression}/steps`)
                .then((response) => {
                    console.log(response.data);
                    setSteps(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                    setError(error);
                })
                .finally(() => {
                });
            return await res2;
        }
        fetchData1();
        console.log(options);
        console.log(idd);
    }, []);



    const ListCreation = () => {
        axios.post(`${serverURL}/api/ingredientsList/create`, {
            nomListe,
            referenceProgression
        })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setAddIngredient(true);
                setAddMoreIngredientsList(false);
            });
        console.log(nomListe);
    }

    const displayInfo5 = () => {
        setAddIngredient(true);
        setAddMoreIngredientsList(false);
    }

    const AssociateIngredientToStep = () => {
        axios(`${serverURL}/api/ingredientsList/last/${nomListe}`)
            .then((response) => {
                axios.post(`${serverURL}/api/ingredients/addToListStep`, {
                    libelleIngredient,
                    quantite,
                    lastIngredientsListStep: response.data[0].idLastCreatedList,
                    referenceProgression
                }).catch((error) => {
                    console.error("Error fetching data: ", error);
                    setError(error);
                })
                    .finally(() => {
                        setIngredientAdded(true);
                    });
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
            });
    }

    const displayInfo7 = () => {
        setIngredientAdded(false);
    }

    const displayInfo9 = () => {
        setAddMoreIngredientsList(true);
    }

    /*const ingredientPM = () => {
        axios(`${serverURL}/api/ingredients/${idd}`)
            .then((response) => {
                console.log(idd);
                console.log(response.data);
                setDetail(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally({
            });
    }*/

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
                <h1>Progression : {referenceProgression}</h1>
            </div>
            <div className="container mt-3 mb-2 text-center" >
                <h2>Associez des ingrédients aux étapes créées</h2>
            </div>
            {steps ?
                <div className="container mt-3 mb-2 text-center" >
                    <h3><b>Récapitulatif des étapes créées :</b></h3>
                    {steps.map((step) => {
                        return (
                            <h3>{step.titre}</h3>
                        );
                    })}
                </div> :
                null}
            <div className="container mt-3 mb-2" >
                {!ingredientAdded ?
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
                                    {nomListe ? <Button type="button" onClick={ListCreation} className="step-create mt-3"><div>Créer Liste d'ingrédients</div></Button>
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
                                <div className="sub-container2 mt-5">
                                    <label htmlFor="NomIngredient">Libellé de l'ingrédient</label>
                                    <Select
                                        options={options}
                                        className="select-search"
                                        id="NomIngredient"
                                        name="NomIngredient"
                                        onChange={(event) => {
                                            setLibelleIngredient(event.label);
                                            setIdd(event.value);
                                            //ingredientPM();
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Recherchez ou selectionnez un ingrédient ..."
                                    />
                                    {formik.errors.NomIngredient ? (
                                        <div className="erreur">{formik.errors.NomIngredient}</div>
                                    ) : null}
                                </div>

                                <div className="sub-container4">
                                    <label htmlFor="Quantite">Quantité (cf. unité de l'ingrédient) : Indiquez 0 pour l'unité PM. Dans tous les cas, si une quantité a été indiquée pour ces ingrédients, elle ne sera pas prise en compte lors de vente(s).</label>
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
                                {quantite && libelleIngredient ? <Button type="button" size="lg" onClick={AssociateIngredientToStep} className="step-create mt-1"><div>Ajouter l'ingrédient</div></Button>
                                    : <Button type="button" size="lg" className="step-create mt-1" disabled><div>Ajouter l'ingrédient</div></Button>}
                            </div>
                        </>
                    ) :
                    null}
                {ingredientAdded && !listIngredientsAdded ?
                    <div className="text-center mb-3">
                        <h2 className="mt-1">Associez les ingrédients pour : {nomListe}</h2>
                        <h3 className="mt-4">Voulez-vous ajouter un autre ingrédient ?</h3>
                        <div className="mt-1">
                            <button className="btn btn-primary btn-lg m-2" onClick={displayInfo7}>Ajout d'un autre ingrédient</button>
                            <Link to={"/sheets/creation/" + nomRecette + "/" + referenceProgression + "/askFinish"} >
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