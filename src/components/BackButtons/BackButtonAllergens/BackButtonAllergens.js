import React from 'react';
import { Button } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";
import './BackButtonAllergens.css';

const BackButtonAllergens = () => {
    return (
        <Link to="/allergens">
            <Button className="backallergens m-3" variant="contained" size="lg">
                <div>{"<< ALLERGENES"}</div>
            </Button>
        </Link>
    );
}

export default BackButtonAllergens;