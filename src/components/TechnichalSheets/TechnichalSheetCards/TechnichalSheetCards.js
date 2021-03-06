import React, { useState, useEffect } from 'react';
import Loading from '../../Loading/Loading';
import { TechnichalSheetCard } from './TechnichalSheetCard';
import axios from 'axios';
import serverURL from '../../../serverURL';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";
import BackButtonTechnichalSheet from '../../BackButtons/BackButtonTechnichalSheet/BackButtonTechnichalSheet';
import { Button } from 'react-bootstrap';

const TechnichalSheetCards = () => {
    const { categorieNom } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
        const res = await axios(`${serverURL}/api/sheet/byCategory/${categorieNom}`)
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
            return await res;
        }
        fetchData();
    }, [])

    const showData = () => {
        console.log(data);
        if (data.length > 0) {
            return data.map((element) => <TechnichalSheetCard data={element} />);

        } else {
            if (loading) {
                return <Loading />;
            }
            if (error) {
                return <p>{error}</p>;
            }

            return (
                <>
                    <h2>Cette catégorie de recettes ne possède pas de fiches techniques.</h2>

                </>);
        };
    }

    return (
        <>
            <BackButtonTechnichalSheet />
            <h1 className="text-center">Fiches Techniques : {categorieNom}s</h1>
            <h3 className="text-center">Imprimez, ainsi que calculez les coûts pour chacune de vos fiches techniques.<br /> <i className="mt-2">Ajoutez une progression aux fiches techniques qui n'en possèdent pas.</i></h3>
            <div className="sheetcontainer">
                <div className="classContainer">
                    {showData()}
                </div>
            </div>
            {!loading && data.length == 0 ?
                <div className="text-center button-container mt-3">
                    <Link to={"/sheet/creation"}>
                        <Button className="create-sheet" variant="contained" size="lg">
                            + Créer une fiche technique
                        </Button>
                    </Link>
                </div> : null}
        </>
    );
}

export default TechnichalSheetCards;