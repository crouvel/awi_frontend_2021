import React, { Component } from 'react';
import './Home.css';
import HomeTabs from './HomeTabs';

class Home extends Component {

    render() {
        return (
            <>
                <h1 className="text-center mt-5">Bienvenue !</h1>
                <div className="classContainer mt-4">
                    <HomeTabs />
                </div>
                <p><img src={require('../../assets/undraw_cooking_lyxy.png').default} /></p>
            </>
        );
    }
}

export default Home;