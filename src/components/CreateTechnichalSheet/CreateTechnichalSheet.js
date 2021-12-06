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
import { useDispatch, useSelector } from "react-redux";
import { getRecetteCategories } from '../../actions/RecetteCategoriesAction';
import serverURL from "../../serverURL";

const CreateTechnichalSheet = () => {

    /*const dispatch = useDispatch();
    const categoriesRecetteList = useSelector((state) => state.RecetteCategories);*/

    /*const [data, setData] = useState([]);*/

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios(`${serverURL}/api/recetteCat`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    /*useEffect(() => {
        const fetchData = () => {
            dispatch(getRecetteCategories());
        };
        fetchData();
    }
        , [dispatch]);*/

    const validate = values => {
        const errors = {};

        if (!values.NomRecette) {
            errors.NomRecette = 'Nom de recette requis';
        } /*else if (values.firstName.length > 15) {
          errors.firstName = 'Must be 15 characters or less';
        }*/

        if (!values.NomAuteur) {
            errors.NomAuteur = "Nom d'auteur requis";
        } /*else if (values.lastName.length > 20) {
          errors.lastName = 'Must be 20 characters or less';
        }*/

        if (!values.Nbrecouverts) {
            errors.Nbrecouverts = 'Nombre de couverts requis';
        } /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }*/

        return errors;
    };

    const SheetCreationForm = () => {
        console.log(data);
        const formik = useFormik({
            initialValues: {
                NomRecette: '',
                NomAuteur: '',
                Nbrecouverts: ''
            },
            validate,
            onSubmit: values => {
                alert(JSON.stringify(values, null, 2));
            },
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.NomRecette}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.NomAuteur}
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
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Nbrecouverts}
                            className="input-select"
                        />
                        {formik.touched.Nbrecouverts && formik.errors.Nbrecouverts ? (
                            <div className="erreur">{formik.errors.Nbrecouverts}</div>
                        ) : null}
                    </div>
               

                <div className="sub-container">
                <label htmlFor="CategorieRecetteSelect" className="font-weight-bold">Catégorie de Recette</label>
                    <select name="CategorieRecette" id="CategorieRecette" className="input-select">
                        {
                            data.map(element => {
                                return <option value={formik.values.CategorieRecette}>
                                    {element.libelleCatRecette}</option>;
                            })
                        }
                    </select>
                </div>
                </div>
                <Button type="submit" className="submit-button">Créer fiche technique</Button>

            </form>

        );
    };

    //console.log(categoriesRecetteList.data);
    return (
        <>
            <Link to="/sheets">
                <Button className="create-sheet2 m-3" variant="contained" size="lg">
                    {"<< FICHES TECHNIQUES"}
                </Button>
            </Link>
            <div className="container">
                <div className="text-center mb-4">
                    <h1>Créer une fiche technique</h1>
                </div>


                {

                    SheetCreationForm()
                }
            </div>
        </>
    );

}

export default CreateTechnichalSheet;