import React, { Component } from 'react';
import {
    useParams
  } from "react-router-dom";
import './IngredientList.css';

const IngredientList = () => {
        
    let {id} = useParams();
    
        return(
            <div>Liste ingredients par catégorie : {id}</div>
        )
    

}

export default IngredientList;