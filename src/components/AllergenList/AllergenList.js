import React, { Component } from 'react';

import './AllergenList.css';
import AllergenCards from './AllergenCards';

class AllergenList extends Component {

    render() {
        return (
            <>
                <div className="text-center mt-5">
                    <h1>Allergènes</h1>
                    <p className="intro">Ici, vous pouvez consulter la liste des ingrédients allergènes. <br />
                    <i>Si vous souhaitez ajouter une catégorie d'ingrédient, vauillez contacter :
                        clarence.rouvel@etu.umontpellier.fr ou alex.benbouzza@etu.umontpellier.fr</i></p>
                </div>
                <AllergenCards />
            </>
        )
    }

}

export default AllergenList;