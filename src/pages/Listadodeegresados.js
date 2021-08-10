import React from 'react';
import Navbar from '../components/navbar/Navbar.js';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CrudEgresados from '../components/CrudEgresados/CrudEgresados';

function Listadodeegresados() {
  return (
    <div className='listado-egresados'>
      
      <Header/>
      <Navbar/>
      <CrudEgresados/>
      <Footer/>
    </div>
  );
}

export default Listadodeegresados;