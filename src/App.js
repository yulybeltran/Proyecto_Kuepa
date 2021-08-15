import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Iniciosesion from './pages/Iniciosesion';
import SignUp from './pages/SignUp';
import Listadodeegresados from './pages/Listadodeegresados';
import InformacionLaboral from './pages/InformacionLaboral';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact path component={Iniciosesion} />
          <Route path='/home' exact component={Home} />
          

          <Route path='/registrar' component={SignUp} />
          <Route path='/listaegresados' component={Listadodeegresados} />
          <Route path='/informacionlaboral' component={InformacionLaboral} />
        </Switch>
        
      </Router>
    </div>
  );
}
export default App;
