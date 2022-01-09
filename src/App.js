
import {React, useEffect} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import Home from './components/Home/Home';
import TechnichalSheets from './components/TechnichalSheets/TechnichalSheets';
import Mercurial from './components/Mercurial/Mercurial';
import AllergenList from './components/AllergenList/AllergenList';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import IngredientsList from './components/Ingredients/IngredientList/IngredientList';
import CreateTechnichalSheet from './components/CreateTechnichalSheet/CreateTechnichalSheet';
import ProgressionCreation from './components/ProgressionCreation/ProgressionCreation';
import AddIngredientsStep from './components/AddIngredientsStep/AddIngredientsStep';
import FinishAddIngredientsStep from './components/FinishAddIngredientsStep/FinishAddIngredientsStep';
import FinishCreateTechnichalSheet from './components/CreateTechnichalSheet/FinishCreateTechnichalSheet/FinishCreateTechnichalSheet';
import TechnichalSheetDetail from './components/TechnichalSheets/TechnichalSheetDetail';
import IngredientDetail from './components/Ingredients/IngredientDetails/IngredientDetail';
import TechnichalSheetCosts from './components/TechnichalSheets/TechnichalSheetCosts';
import CreateIngredient from './components/CreateIngredient/CreateIngredient';
import TechnichalSheetCards from './components/TechnichalSheets/TechnichalSheetCards/TechnichalSheetCards';
import EtiquetteVente from './components/TechnichalSheets/EtiquetteVente/EtiquetteVente';
import EtiquetteAvecVente from './components/TechnichalSheets/EtiquetteVente/EtiquetteAvecVente';
import IngredientAllergenList from './components/Ingredients/IngredientList/IngredientAllergenList';
import Footer from './components/Footer/Footer';

function App() {
  
  useEffect(async () => {
    const timer = setTimeout(() => {
      //setCount('Timeout called!');
    }, 5000);
    return async () => {
      return clearTimeout(timer);
    };
  }, []);

  return (
    <>
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
            <li>
              <Link to="/allergens" className="li-element"><p>Allergènes</p></Link>
            </li>
          </ul>
        </nav>

        <Route exact path="/mercurial">
          <Mercurial />
        </Route>
        <Route exact path="/sheets">
          <TechnichalSheets />
        </Route>
        <Route exact path="/allergens">
          <AllergenList />
        </Route>
        <Route exact path="/allergens/:categoryAllergen">
          <IngredientAllergenList />
        </Route>
        <Route exact path="/mercurial/:id/ingredients">
          < IngredientsList />
        </Route>
        <Route exact path="/mercurial/ingredients/:id">
          < IngredientDetail />
        </Route>
        <Route exact path="/mercurial/createIngredient">
          < CreateIngredient />
        </Route>
        <Route path="/sheetdetail/:id">
          < TechnichalSheetDetail />
        </Route>
        <Route exact path="/sheetdetailcosts/:id">
          < TechnichalSheetCosts />
        </Route>
        <Route exact path="/sheetEtiquette/:id">
          < EtiquetteVente />
        </Route>
        <Route exact path="/sheetEtiquetteVente/:id">
          <EtiquetteAvecVente />
        </Route>
        <Route exact path="/sheet/creation">
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
        <Route exact path="/sheets/:categorieNom">
          <TechnichalSheetCards />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Router>
    </div>  
    {/* <footer>oui</footer> */}
    </>
  );
}

export default App;
