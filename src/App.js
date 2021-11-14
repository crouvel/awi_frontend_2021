
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
  Link,
  Redirect
} from "react-router-dom";
import IngredientList from './components/IngredientList/IngredientList';
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
              <Link to="/mercurial" className="li-element"><p >Mercurial</p></Link>
            </li>
            {/* <li> */}
            {/* <Link to="/allergens" className="li-element"><p>Allergènes</p></Link> */}
            {/* </li> */}

          </ul>
        </nav>

        
          <Route exact path="/mercurial">
            <Mercurials />
          </Route>
          <Route exact path="/sheets">
            <TechnichalSheets />
          </Route>
          {/* <Route path="/allergens"> */}
          {/* <AllergenList /> */}
          {/* </Route> */}
          <Route exact path="/mercurial/:id">
          < IngredientList/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
         

      </Router>
    </div>
  );
}

export default App;
