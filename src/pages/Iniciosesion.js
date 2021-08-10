import React from 'react';
import IniciarSesion from '../components/iniciosesion/InicioSesion';
import Footer from '../components/footer/Footer';
import HeaderInicio from '../components/headerinicio/HeaderInicio';
function Iniciosesion() {
  return (
    <div className='iniciosesion-pagina'>
      <HeaderInicio/>
      <IniciarSesion/>
      <Footer/>
    </div>
  );
}

export default Iniciosesion;
