import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';
import Home from './pages/Home';
import Iniciosesion from './pages/Iniciosesion';
import SignUp from './pages/SignUp';
import Listadodeegresados from './pages/Listadodeegresados';
import InformacionLaboral from './pages/InformacionLaboral';

function App() {
  return (
    <div>
      <HasRouter basename="/" >
        <Switch>
          <Route exact  path='/' component={Iniciosesion} />
          <Route exact  path='/home' component={Home} />
          <Route exact  path='/iniciosesion' component={Iniciosesion} />
          <Route exact  path='/registrar' component={SignUp} />
          <Route exact  path='/listaegresados' component={Listadodeegresados} />
          <Route exact  path='/informacionlaboral' component={InformacionLaboral} />
        </Switch>
        
      </HasRouter>
    </div>
  );
}
export default App;
