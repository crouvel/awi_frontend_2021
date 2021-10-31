
import React from 'react';
import './App.css';
import Home from './components/Home/Home';
import TechnichalSheets from './components/TechnichalSheets/TechnichalSheets';
import Mercurials from './components/Mercurials/Mercurials';
// import AllergenList from './components/AllergenList/AllergenList';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
   <Router>
            
            <nav className="NavbarItems"> 
                <ul className="nav-menu">
                    <li>
                    <Link to="/" className="li-element"><p >Accueil</p></Link>
                    </li>
                    <li>
                    <Link to="/sheets" className="li-element"><p >Fiches Techniques</p></Link>
                    </li>
                    <li>
                    <Link to="/mercurials" className="li-element"><p >Mercurials</p></Link>
                    </li>
                    {/* <li> */}
                    {/* <Link to="/allergens" className="li-element"><p>Allergènes</p></Link> */}
                    {/* </li> */}
                   
                </ul>
            </nav>
            
            <Switch>
            <Route path="/mercurials">
                <Mercurials/>
              </Route>
              <Route path="/sheets">
                <TechnichalSheets />
              </Route>
              {/* <Route path="/allergens"> */}
                {/* <AllergenList /> */}
              {/* </Route> */}
              <Route path="/">
                <Home />
              </Route>
            
            </Switch>
            
            </Router>
    </div>
  );
}

export default App;
