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
        setLoading(true);
        axios.post(`${serverURL}/api/ingredientsList/create`, {
            nomListe,
            referenceProgression
        }).then((response) => {
            setLoading(false);
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
        setLoading(true);
        axios(`${serverURL}/api/ingredientsList/last/${nomListe}`)
            .then((response) => {
                axios.post(`${serverURL}/api/ingredients/addToListStep`, {
                    libelleIngredient,
                    quantite,
                    lastIngredientsListStep: response.data[0].idLastCreatedList,
                    referenceProgression
                }).then((response) => 
                {
                    setLoading(false);
                    setQuantite("");
                })
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                    setError(error);
                })
                    .finally(() => {
                        setIngredientAdded(true);
                    });
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

    const validate = () => {
        const errors = {};

        if (!nomListe) {
            errors.NomListe = "Veuillez indiquer un nom de liste d'ingr??dients ou le nom de l'??tape associ??e ?? cette liste";
        }
        if (!quantite) {
            errors.Quantite = 'Quantit?? requise';
        }
        if (!libelleIngredient) {
            errors.NomIngredient = 'Veuillez s??lectionner un ingr??dient';
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
                <h2>Associez des ingr??dients aux ??tapes cr????es <br />
                <i>Si vous avez ajout?? une progression ?? une ??tape, veuillez cr??er les listes d'ingr??dients correspondantes</i></h2>
            </div>
            <div className="container mt-3 mb-2" >
                {!ingredientAdded ?
                    (!addIngredient || addMoreIngredientsList ?
                        <>
                            <h3 className="text-center mb-2">Associez une liste d'ingr??dients ?? une ??tape</h3>
                            <div className="container-input1">
                                <div className="sub-container2">
                                    <label htmlFor="NomListe">Nom de la liste d'ingr??dients ou de l'??tape</label>
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
                                    {nomListe ? <Button type="button" onClick={ListCreation} className="step-create mt-3"><div>Cr??er Liste d'ingr??dients</div></Button>
                                        : <Button type="button" className="step-create mt-3" disabled><div>Cr??er Liste d'ingr??dients</div></Button>}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="text-center mb-3">
                                <h3 className="mt-1">Associez les ingr??dients pour : {nomListe}</h3>
                            </div>
                            <h3 className="mt-4">Ajouter un ingr??dient</h3>
                            <div className="container2 mt-3">
                                <div className="sub-container2 mt-5">
                                    <label htmlFor="NomIngredient">Libell?? de l'ingr??dient</label>
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
                                        placeholder="Recherchez ou selectionnez un ingr??dient ..."
                                    />
                                    {formik.errors.NomIngredient ? (
                                        <div className="erreur">{formik.errors.NomIngredient}</div>
                                    ) : null}
                                </div>

                                <div className="sub-container4">
                                    <label htmlFor="Quantite">Quantit?? (cf. unit?? de l'ingr??dient) : Indiquez 0 pour l'unit?? PM. Dans tous les cas, si une quantit?? a ??t?? indiqu??e pour ces ingr??dients, elle ne sera pas prise en compte lors de vente(s).</label>
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
                                {quantite && libelleIngredient && libelleIngredient !=="" ? <Button type="button" size="lg" onClick={AssociateIngredientToStep} className="step-create mt-1"><div>Ajouter l'ingr??dient</div></Button>
                                    : <Button type="button" size="lg" className="step-create mt-1" disabled><div>Ajouter l'ingr??dient</div></Button>}
                            </div>
                        </>
                    ) :
                    null}
                {ingredientAdded && !listIngredientsAdded ?
                    <div className="text-center mb-3">
                        <h2 className="mt-1">Associez les ingr??dients pour : {nomListe}</h2>
                        <h3 className="mt-4">Voulez-vous ajouter un autre ingr??dient ?</h3>
                        <div className="mt-1">
                            <button className="btn btn-primary btn-lg m-2" onClick={displayInfo7}>Ajout d'un autre ingr??dient</button>
                            <Link to={"/sheets/creation/" + nomRecette + "/" + referenceProgression + "/askFinish"} >
                                <button className="btn btn-success btn-lg m-2">Terminer l'ajout d'ingr??dients</button>
                            </Link>
                        </div>
                    </div> :
                    null}
            </div>
        </>
    );
}

export default AddIngredientsStep;