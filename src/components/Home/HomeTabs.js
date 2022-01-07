import React from 'react';

import './HomeTabs.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
} from "react-router-dom";

const HomeTabs = () => {

    return (
        <>
            <div className="d-flex mt-2">
                <Link to={"/sheets"} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <div className="card card-4">
                        <div className="card__icon"><i className="fas fa-bolt"></i></div>
                        <p className="card__exit"><i className="fas fa-times"></i></p>
                        <h2 className="card__title">Fiches Techniques</h2>
                        <div className="card__apply">
                            <p className="card__link text-center">Consultez et créez vos fiches techniques.</p>
                        </div>
                    </div>
                </Link>
                <Link to={"/mercurial"} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <div className="card card-4">
                        <div className="card__icon"><i className="fas fa-bolt"></i></div>
                        <p className="card__exit"><i className="fas fa-times"></i></p>
                        <h2 className="card__title">Mercurial</h2>
                        <div className="card__apply">
                            <p className="card__link text-center">Consultez et créez vos ingrédients</p>
                        </div>
                    </div>
                </Link>
                <Link to={"/allergens"} style={{ color: 'inherit', textDecoration: 'inherit' }} >
                    <div className="card card-4">
                        <div className="card__icon"><i className="fas fa-bolt"></i></div>
                        <p className="card__exit"><i className="fas fa-times"></i></p>
                        <h2 className="card__title">Allergènes</h2>
                        <div className="card__apply">
                            <p className="card__link text-center">Consultez la liste d'ingrédients allergènes.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}

export default HomeTabs;
