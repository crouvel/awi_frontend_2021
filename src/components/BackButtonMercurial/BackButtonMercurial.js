import React from 'react';
import { Button } from 'react-bootstrap';
import {
    Link,
} from "react-router-dom";

const BackButtonMercurial = () => {
    return (
        <Link to="/mercurial">
            <Button className="backmercurial m-3" variant="contained" size="lg">
                <div>{"<< MERCURIAL"}</div>
            </Button>
        </Link>
    );
}

export default BackButtonMercurial;