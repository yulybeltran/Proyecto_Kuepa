import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Iniciosesion from './pages/Iniciosesion';
import SignUp from './pages/SignUp';
import Listadodeegresados from './pages/Listadodeegresados';
import InformacionLaboral from './pages/InformacionLaboral';
import ConsultarSeguimiento from './pages/ConsultarSeguimiento';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Iniciosesion} />
          <Route path='/home' exact component={Home} />
          <Route path='/iniciosesion' component={Iniciosesion} />
          <Route path='/registrar' component={SignUp} />
          <Route path='/listaegresados' component={Listadodeegresados} />
          <Route path='/informacionlaboral' component={InformacionLaboral} />
          <Route path='/consultarseguimiento' component={ConsultarSeguimiento} />

        </Switch>
        
      </Router>
    </div>
  );
}
export default App;
