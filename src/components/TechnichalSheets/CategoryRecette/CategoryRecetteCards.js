import React, { useState, useEffect } from 'react';
import Loading from '../../Loading/Loading';
import axios from 'axios';
import serverURL from '../../../serverURL';
import { CategoryRecetteCard } from './CategoryRecetteCard';

const CategoryRecetteCards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData () {
        axios(`${serverURL}/api/recetteCategories`)
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
        }
        fetchData();
    }, [])

    const showData = () => {
        console.log(data);
        if (data.length > 0) {
            return data.map((element) => <CategoryRecetteCard data={element} />);

        } else {
            if (loading) {
                return <Loading />;
            }
            if (error) {
                return <p>{error}</p>;
            }

            return <p>Impossible d'obtenir des données</p>;
        };
    }

    return (
       
        <div className="classContainer">
            {
                showData()
            }
        </div>

    )
}

export default CategoryRecetteCards;