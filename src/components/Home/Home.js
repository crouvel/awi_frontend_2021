import React, { Component } from 'react';

import './Home.css';


class Home extends Component {

    render() {
        return(
            <>
            <div className="welcome">Bienvenue !</div>
            <p><img src={require('../../assets/undraw_cooking_lyxy.png').default}/></p>
            </>
        )
    }

}

export default Home;