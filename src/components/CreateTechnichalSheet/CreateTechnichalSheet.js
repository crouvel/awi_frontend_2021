import React, { Component, useState } from 'react';
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

const CreateTechnichalSheet = () => {
    /*const [values, setValues] = React.useState({});
 
    const handleChange = event => {
      setValues(prevValues => ({
        ...prevValues,
        // we use the name to tell Formik which key of `values` to update
        [event.target.name]: event.target.value
      }));
    }*/

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
                            { formik.errors.NomRecette ? (
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
                                className="input-number"
                            />
                            {formik.touched.Nbrecouverts && formik.errors.Nbrecouverts ? (
                                <div className="erreur">{formik.errors.Nbrecouverts}</div>
                            ) : null}
                        </div>
                    </div>
                    <Button type="submit" className="submit-button">Créer fiche technique</Button>
                </form>
        
        );
    };

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