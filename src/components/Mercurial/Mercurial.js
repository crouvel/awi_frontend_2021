import React, { Component } from 'react';

import './Mercurial.css';
import IngCategorycards from '../IngredientCategoryCards/IngCategorycards';

class Mercurials extends Component {

    render() {
        return(
            <>
                <div className="text-center">
                <h1>Mercurial</h1>
                </div>
                <IngCategorycards/>
            </>
        )
    }

}

export default Mercurials;