import React from 'react';
import RegistroUsuario from '../components/registrousuario/RegistroUsuario';
import Footer from '../components/footer/Footer';
import HeaderInicio from '../components/headerinicio/HeaderInicio';
function Iniciosesion() {
  return (
    <div className='iniciosesion-pagina'>
      <HeaderInicio/>
      <RegistroUsuario/>
      <Footer/>
    </div>
  );
}

export default Iniciosesion;
