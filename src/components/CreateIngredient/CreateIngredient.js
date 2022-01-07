import './CreateIngredient.css';
import axios from "axios";
import React, { Component, useState, Input, useEffect } from 'react';
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
import serverURL from "../../serverURL";
import Loading from "../Loading/Loading";
import { useFormik } from 'formik';
import BackButtonMercurial from '../BackButtons/BackButtonMercurial/BackButtonMercurial';
import { SiCheckmarx } from 'react-icons/si';

const CreateIngredient = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [code, setCode] = useState('');
    const [libelle, setLibelle] = useState('');
    const [quantiteStockee, setQuantiteStockee] = useState(null);
    const [prixUnitaire, setPrix] = useState('');
    const [allergene, setAllergene] = useState('');
    const [unite, setUnite] = useState('');
    const [idCategorieIngredient, setCategorieIngredient] = useState('');
    const [categorieAllergene, setCategoryAllergene] = useState(null);
    const [unites, setUnites] = useState([]);
    const [categorysIngredient, setCategorysIngredient] = useState([]);
    const [categorysAllergen, setCategorysAllergen] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const history = useHistory();
    const [codes, setCodes] = useState([]);
    const [ingredientCreated, setIngredientCreated] = useState(false);

    const validate = () => {
        const errors = {};

        if (!code) {
            errors.Code = 'Code requis';

        } else if (codes.includes(parseInt(code, 10)) && !loading) {
            errors.Code = 'Code déjà utilisé';
        }

        if (!libelle) {
            errors.Libelle = "Nom d'ingrédient requis";
        } else if (ingredients.map((element) => element.libelle.toLowerCase()).includes(libelle.toLowerCase()) && !loading) {
            errors.Libelle = "Nom d'ingrédient déjà utilisé";
        }

        if (!quantiteStockee) {
            errors.Quantite = "Quantité requise";
        }

        if (!prixUnitaire) {
            errors.Prix = 'Prix requis';
        }

        /*if (!idCategorieIngredient) {
            errors.CategorieIngredient = "Catégorie d'ingrédient requise";
        }

        if (!allergene) {
            errors.Allergene = "Information requise";
        }

        if (!unite) {
            errors.Unite = "Unité requise";
        }*/

        return errors;
    };

    const formik = useFormik({
        initialValues: {
            Code: '',
            Libelle: '',
            Quantite: '',
            Prix: '',
            CategorieIngredient: '',
            Allergene: '',
            Unite: ''
        },
        validate,
    });

    const IngredientCreate = () => {
        setLoading(true);
        axios.post(`${serverURL}/api/ingredients/create`, {
            code,
            libelle,
            quantiteStockee,
            prixUnitaire,
            allergene,
            idCategorieIngredient,
            categorieAllergene,
            unite
        }).then(() => {
            setLoading(false);
            setIngredientCreated(true);
        })
    }

    useEffect(() => {
        axios(`${serverURL}/api/ingredientCat`)
            .then((response) => {
                setCategorysIngredient(response.data);
                console.log(response.data);
                axios(`${serverURL}/api/ingredients`)
                    .then((response) => {
                        setIngredients(response.data);
                        setCodes(response.data.map((element) => element.idIngredient));
                        console.log(response.data.map((element) => element.idIngredient));
                        axios(`${serverURL}/api/unite`)
                            .then((response) => {
                                setUnites(response.data);
                                console.log(response.data);
                                axios(`${serverURL}/api/categoryAllergen`)
                                    .then((response) => {
                                        setCategorysAllergen(response.data);
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
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {

            });
    }, []);

    return (
        <>
            <BackButtonMercurial />
            {!loading && !ingredientCreated ?
                <div className="lilaccontainer2 mt-5" >
                    {Number.isInteger(code)}
                    <div className="text-center mb-4">
                        <h1>Ajouter un ingrédient</h1>
                        <p className="intro">Ici, vous pouvez créer un ingédient.</p>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="container-input1">
                            <div className="sub-container">
                                <label htmlFor="Code">Code de l'ingrédient</label>
                                <input
                                    id="Code"
                                    name="Code"
                                    type="number"
                                    min="1"
                                    onChange={(event) => {
                                        setCode(event.target.value);
                                        console.log(codes.includes(event.target.value))
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="input1"
                                />
                                {formik.errors.Code ? (
                                    <div className="erreur">{formik.errors.Code}</div>
                                ) : null}
                            </div>
                            <div className="sub-container">
                                <label htmlFor="Libelle">Libellé de l'ingrédient</label>
                                <input
                                    id="Libelle"
                                    name="Libelle"
                                    type="text"
                                    onChange={(event) => {
                                        setLibelle(event.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    className="input1"
                                />
                                {formik.errors.Libelle ? (
                                    <div className="erreur">{formik.errors.Libelle}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="container-input2">
                            <div className="sub-container">
                                <label htmlFor="Prix" className="font-weight-bold">Prix Unitaire</label>
                                <input
                                    id="Prix"
                                    name="Prix"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    onChange={(event) => {
                                        setPrix(event.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    /*value={formik.values.Nbrecouverts}*/
                                    className="input-select"
                                />
                                {formik.errors.Prix ? (
                                    <div className="erreur">{formik.errors.Prix}</div>
                                ) : null}
                            </div>

                            <div className="sub-container">
                                <label htmlFor="CategorieIngredient" className="font-weight-bold">Catégorie d'ingrédient</label>
                                <select name="CategorieIngredient" id="CategorieIngredient" className="input1" onChange={(event) => {
                                    setCategorieIngredient(event.target.value);
                                }}>
                                    <option value="">Catégorie d'ingrédient ...</option>
                                    {
                                        categorysIngredient.map(element => {
                                            return <option value={element.idCategorieIngredient}>
                                                {element.libelleCategorie}</option>;
                                        })
                                    }
                                </select>
                                {formik.errors.CategorieIngredient ? (
                                    <div className="erreur">{formik.errors.CategorieIngredient}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="container-input2">
                            <div className="sub-container">
                                <label htmlFor="Allergene" className="font-weight-bold">Allergène</label>
                                <select
                                    name="Allergene"
                                    id="Allergene"
                                    className="input-select"
                                    onChange={(event) => {
                                        setAllergene(event.target.value);
                                    }}
                                    placeholder='Allergène ...'>
                                    <option value="">Allergène ?</option>
                                    <option value="Non">Non</option>
                                    <option value="Oui">Oui</option>
                                </select>
                                {formik.errors.Allergene ? (
                                    <div className="erreur">{formik.errors.Allergene}</div>
                                ) : null}
                            </div>

                            <div className="sub-container">
                                <label htmlFor="Unite" className="font-weight-bold">Unité</label>
                                <select
                                    name="Unite"
                                    id="Unite"
                                    className="input-select"
                                    onChange={(event) => {
                                        setUnite(event.target.value);
                                    }}>
                                    <option value="">Unité...</option>
                                    {
                                        unites.map(element => {
                                            return <option value={element.symbole}>
                                                {element.symbole}</option>;
                                        })
                                    }
                                </select>
                                {formik.errors.Unite ? (
                                    <div className="erreur">{formik.errors.Unite}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="container-input2">
                            <div className="sub-container">
                                {allergene === "Oui" ?
                                    <>
                                        <label htmlFor="CategorieAllergene" className="font-weight-bold">Catégorie Allergène</label>
                                        <select name="CategorieAllergene" id="CategorieAllergene" className="input1" onChange={(event) => {
                                            setCategoryAllergene(event.target.value);
                                        }}>
                                            <option value="">Catégorie d'allergène ...</option>
                                            {
                                                categorysAllergen.map(element => {
                                                    return <option value={element.libelleCategorieAllergene}>
                                                        {element.libelleCategorieAllergene}</option>;
                                                })
                                            }
                                        </select>
                                    </>
                                    : null}
                            </div>
                            <div className="sub-container">
                                {!(unite === "PM") && unite != "" ?
                                    <>
                                        <label htmlFor="Quantite" className="font-weight-bold">Quantité Stockée</label>
                                        <input
                                            id="Quantite"
                                            name="Quantite"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            onChange={(event) => {
                                                setQuantiteStockee(event.target.value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            /*value={formik.values.NomAuteur}*/
                                            className="input-select"
                                        />
                                        {formik.errors.Quantite ? (
                                            <div className="erreur">{formik.errors.Quantite}</div>
                                        ) : null}
                                    </> : null}
                            </div>
                        </div>

                        {(!(codes.includes(parseInt(code, 10))) && !(ingredients.map((element) => element.libelle.toLowerCase()).includes(libelle.toLowerCase())) && code && libelle && prixUnitaire && idCategorieIngredient && (allergene === "Oui") && (unite === "PM") && categorieAllergene && unite) ||
                            (!(codes.includes(parseInt(code, 10))) && !(ingredients.map((element) => element.libelle.toLowerCase()).includes(libelle.toLowerCase())) && code && libelle && prixUnitaire && idCategorieIngredient && !(allergene === "Oui") && (unite === "PM") && unite) ||
                            (!(codes.includes(parseInt(code, 10))) && !(ingredients.map((element) => element.libelle.toLowerCase()).includes(libelle.toLowerCase())) && code && libelle && prixUnitaire && idCategorieIngredient && allergene && !(unite === "PM") && quantiteStockee && (allergene === "Oui") && categorieAllergene && unite) ||
                            (!(codes.includes(parseInt(code, 10))) && !(ingredients.map((element) => element.libelle.toLowerCase()).includes(libelle.toLowerCase())) && code && libelle && prixUnitaire && idCategorieIngredient && allergene && !(unite === "PM") && quantiteStockee && !(allergene === "Oui") && unite) ?
                            <div className="text-center">
                                <Button type="button" size="lg" className="ingredient mt-3" onClick={IngredientCreate}><div>Créer ingrédient</div>
                                </Button>
                            </div> : <Button type="button" size="lg" className="ingredient mt-3" disabled><div>Créer ingrédient</div>
                            </Button>}
                    </form>
                </div>
                : (!ingredientCreated && loading ?
                    <Loading /> : null)}

            {ingredientCreated ?
                <div className="lilaccontainer mt-5 mb-2 p-5 text-center" >
                    <div className="text-center mt-4 mb-4">
                        <h1>L'ingrédient {libelle}</h1> <h1>a bien été ajouté !</h1>
                        <SiCheckmarx className="mt-2" size={40} />
                    </div>
                    <h2 className="mb-3">Vous pouvez désormais revenir sur la page Mercurial</h2>
                    <div className="text-center mt-5">
                        <Link to={"/mercurial"}>
                            <Button className="goMercurial btn-primary btn-lg" size="lg">
                                Retour à la page Mercurial
                            </Button>
                        </Link>
                    </div>
                </div> :
                null}
        </>
    );

}

export default CreateIngredient;