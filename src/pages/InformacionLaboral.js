import React from 'react';
import Header from '../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import CrudSeguimiento from '../components/CrudSeguimiento/CrudSeguimiento';
function InformacionLaboral() {
  return (
    <div>
       <Header />
      <Navbar/>
      <CrudSeguimiento/>
      <Footer/>
    </div>
  );
}

export default InformacionLaboral;