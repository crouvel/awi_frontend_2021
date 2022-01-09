import React, { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import axios from 'axios';
import serverURL from '../../serverURL';
import { AllergenCard } from './AllergenCard';

const AllergenCards = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(async() => {
        axios(`${serverURL}/api/categoryAllergen`)
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
            return data.map((element) => <AllergenCard data={element} />);
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

export default AllergenCards;