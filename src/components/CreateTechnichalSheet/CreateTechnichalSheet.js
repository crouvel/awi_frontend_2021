import React, { Component, useState} from 'react';
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
          <div className="container">
          <form onSubmit={formik.handleSubmit}>
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
            {formik.touched.NomRecette && formik.errors.NomRecette ? (
              <div>{formik.errors.NomRecette}</div>
            ) : null}
      
            <label htmlFor="NomAuteur">Nom de l'auteur de la recette</label>
            <input
              id="NomAuteur"
              name="NomAuteur"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.NomAuteur}
              className="input1"
            />
            {formik.touched. NomAuteur && formik.errors.NomAuteur ? (
              <div>{formik.errors.NomAuteur}</div>
            ) : null}
      
            <label htmlFor="Nbrecouverts">Nombre de couverts</label>
            <input
              id="Nbrecouverts"
              name="Nbrecouverts"
              type="number"
              min="1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Nbrecouverts}
            />
            {formik.touched.Nbrecouverts && formik.errors.Nbrecouverts ? (
              <div>{formik.errors.Nbrecouverts}</div>
            ) : null}
      
            <button type="submit">Créer fiche technique</button>
          </form>
          </div>
        );
      };

        return(
            <>
             <Link to="/sheets">
                <Button className="create-sheet2 m-3" variant="primary" >
                    {"<< LISTE DES FICHES TECHNIQUES"}
                </Button>
               </Link>
            
                {
                    SheetCreationForm()
                }
            </>
        );

}

export default CreateTechnichalSheet;