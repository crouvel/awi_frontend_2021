import React, { useState, useEffect } from 'react';
import Loading from '../../Loading/Loading';
import {
    useParams
} from 'react-router-dom';
import BackButtonAllergens from '../../BackButtons/BackButtonAllergens/BackButtonAllergens';
import axios from 'axios';
import serverURL from '../../../serverURL';
import { IngredientAllergenListCard } from './IngredientAllergenListCard';

const IngredientAllergenList = () => {
    let {categoryAllergen} = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios(`${serverURL}/api/ingredients/byAllergen/${categoryAllergen}`)
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
    }, [])

    const showData = () => {
        console.log(data);
        if (data.length > 0) {
            return data.map((element) => <IngredientAllergenListCard data={element} />);
        } else {
            if (loading) {
                return <Loading />;
            }
            if (error) {
                return <p>{error}</p>;
            }

            return <h2 className="text-center mt-5">La catégorie d'allergène {categoryAllergen.toLowerCase()} ne contient pas d'ingrédients.</h2>;
        };
    }

    return (
        <>
            <BackButtonAllergens />
            <h1 className="text-center">Ingrédients allergènes : {categoryAllergen}</h1>
                {
                    showData()
                }

        </>
    );
}

export default IngredientAllergenList;