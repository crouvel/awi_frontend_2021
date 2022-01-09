import React from 'react';
import { Button } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";

const BackButtonTechnichalSheet = () => {
    return (
        <Link to="/sheets">
            <Button className="create-sheet2 m-3" variant="contained" size="lg">
                <div>{"<< CATEGORIES DE FICHES"}</div>
            </Button>
        </Link>
    );
}

export default BackButtonTechnichalSheet;