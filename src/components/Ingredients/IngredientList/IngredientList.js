import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import Loading from '../../Loading/Loading';
import {
    useParams,
    Link
} from 'react-router-dom';
import './IngredientList.css';
import { getIngredientByCategory } from '../../../actions/IngredientsByCategoryAction';
import 'react-flexy-table/dist/index.css';
import { IngredientListCard } from './IngredientListCard';
import BackButtonMercurial from '../../BackButtons/BackButtonMercurial/BackButtonMercurial';
import { Button } from 'react-bootstrap';

const IngredientsList = () => {
    const dispatch = useDispatch();
    const ingredientsByCategoryList = useSelector((state) => state.IngredientsByCategory);
    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
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
            return (
                <>
                    <h2 className="text-center mt-5">La catégorie ne contient pas d'ingrédients. </h2>
                  <p className="text-center intro">Vous pouvez néanmoins ajouter des ingrédients pour cette catégorie précise.</p>  
                    <div className="button-container text-center mt-4">
                        <Link to={"/mercurial/createIngredient"}>
                            <Button className="createIngredient" variant="contained" size="lg">
                                + Ajouter un ingrédient
                            </Button>
                        </Link>
                    </div>
                </>
            );
        };
    }

    return (
        <>
            <BackButtonMercurial />
            {ingredientsByCategoryList.data.length > 0 ?
                <div className="text-center mt-3">
                    <h1>Ingrédients catégorie : {ingredientsByCategoryList.data[0].libelleCategorie} </h1>
                </div>
                : null}
            {
                showData()
            }
        </>
    );
}

export default IngredientsList;