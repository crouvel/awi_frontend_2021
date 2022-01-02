import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import Loading from '../Loading/Loading';
import {
    useParams
} from 'react-router-dom';
import './IngredientList.css';
import { getIngredientByCategory } from '../../actions/IngredientsByCategoryAction';
import 'react-flexy-table/dist/index.css';
import { IngredientListCard } from './IngredientListCard';
import BackButtonMercurial from '../BackButtonMercurial/BackButtonMercurial';

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
            console.log(ingredientsByCategoryList.data);
            return ingredientsByCategoryList.data.map((element) => <IngredientListCard data={element} />);        
        } else {
            if (ingredientsByCategoryList.loading) {
                return <Loading />;
            }
            if (ingredientsByCategoryList.errorMsg !== "") {
                return <p>{ingredientsByCategoryList.errorMsg}</p>;
            }
            return <p className="text-center mt-5">La catégorie ne contient pas d'ingrédients. </p>;
        };
    }

    return (
        <>
            <BackButtonMercurial />
            {ingredientsByCategoryList.data.length > 0 ?
                <div className="text-center mt-1">
                    <h1>Ingrédients par catégorie</h1>
                </div>
                : null}

            {
                showData()
            }
        </>
    )


}

export default IngredientsList;