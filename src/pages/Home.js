import React from 'react';
import Header from '../components/header/Header';
import Banner from '../components/home/Banner';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';


function Home() {
  return (
    <div className=" home" background-color="blue">
      <div className="col-12 "> 
        <Header/>
        <Navbar/>
        <Banner/>
        <Footer/>      
      </div>
    </div>
  );
}

export default Home;