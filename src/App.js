
import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Home from './components/Home/Home';
import TechnichalSheets from './components/TechnichalSheets/TechnichalSheets';
import Mercurial from './components/Mercurial/Mercurial';
// import AllergenList from './components/AllergenList/AllergenList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import IngredientList from './components/IngredientList/IngredientList';
import CreateTechnichalSheet from './components/CreateTechnichalSheet/CreateTechnichalSheet';
import ProgressionCreation from './components/ProgressionCreation/ProgressionCreation';
import AddIngredientsStep from './components/AddIngredientsStep/AddIngredientsStep';
import FinishAddIngredientsStep from './components/FinishAddIngredientsStep/FinishAddIngredientsStep';
import FinishCreateTechnichalSheet from './components/FinishCreateTechnichalSheet/FinishCreateTechnichalSheet';
import TechnichalSheetDetail from './components/TechnichalSheets/TechnichalSheetDetail';
import IngredientDetail from './components/IngredientDetails/IngredientDetail';

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
          <Mercurial />
        </Route>
        <Route exact path="/sheets">
          <TechnichalSheets />
        </Route>
        {/* <Route path="/allergens"> */}
        {/* <AllergenList /> */}
        {/* </Route> */}
        <Route exact path="/mercurial/:id/ingredients">
          < IngredientList />
        </Route>
        <Route exact path="/mercurial/ingredients/:id">
          < IngredientDetail />
        </Route>
        <Route path="/sheetdetail/:id">
          < TechnichalSheetDetail />
        </Route>
        <Route exact path="/sheets/creation">
          < CreateTechnichalSheet />
        </Route>
        <Route exact path="/sheets/creation/:nomRecette">
          <ProgressionCreation />
        </Route>
        <Route exact path="/sheets/creation/:nomRecette/:referenceProgression">
          <AddIngredientsStep />
        </Route>
        <Route exact path="/sheets/creation/:nomRecette/:referenceProgression/askFinish">
          <FinishAddIngredientsStep />
        </Route>
        <Route exact path="/sheets/:nomRecette/creationFinished">
          <FinishCreateTechnichalSheet />
        </Route>
        
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </div>

  );
}

export default App;
