import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import Loading from '../Loading/Loading';
import {
    useParams
} from 'react-router-dom';
import './IngredientList.css';
import { getIngredientByCategory } from '../../actions/IngredientsByCategoryAction';
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';

const IngredientsList = () => {
    const dispatch = useDispatch();
    const ingredientsByCategoryList = useSelector((state) => state.IngredientsByCategory);

    let { id } = useParams();

    useEffect(() => {
        const fetchData = () => {
            dispatch(getIngredientByCategory(id));
        };
        fetchData();
    }
        , [dispatch])

    const showData = () => {
        if (ingredientsByCategoryList.data.length > 0) {
            return <ReactFlexyTable data={ingredientsByCategoryList.data} /> 
            //ingredientsByCategoryList.data.map((element) => <p>{element.libelle} </p>);            
        } else {
            if (ingredientsByCategoryList.loading) {
                return <Loading />;
            }
            if (ingredientsByCategoryList.errorMsg !== "") {
                return <p>{ingredientsByCategoryList.errorMsg}</p>;
            }

            return <p>La catégorie ne contient pas d'ingrédients. </p>;
        };
    }

    return (
        <div>
            {
                showData()
            }
        </div>
    )


}

export default IngredientsList;