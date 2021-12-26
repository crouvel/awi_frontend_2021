
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css"

class Loading extends Component {

    render() {
        return (
            <ReactLoading type="cylon" color="#4992F7" height={'10%'} width={'10%'} className="Loader" />
        )

    }
}

export default Loading;

