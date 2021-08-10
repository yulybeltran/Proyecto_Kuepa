import React from 'react';
import './Banner.css';
import logofooter from '../../assets/img/logokuepa.png';
import * as FaIcons from 'react-icons/fa';
import img1 from '../../assets/img/homeimg1.jpeg';
import img2 from '../../assets/img/homeimg2.jpeg';
import img3 from '../../assets/img/homeimg3.jpeg';



import Footer from '../footer/Footer';

function Banner () {
    return (
            <div className="row contenedor-home">
                <div className="titulo-home">
                    <div className="back">
                        BIENVENIDOS AL SISTEMA DE <br></br>INFORMACIÓN DE EGRESADOS
                    </div>
                </div>

                <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src={img1} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                        <img src={img2} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>	

                <div className="parrafo-home">
                    <p>Como institución educativa queremos crear relaciones fraternas y de doble vía con nuestros egresados. Por ello, estamos monitoreando y gestionando periódicamente la información y datos de nuestra comunidad educativa. Así mismo, el SIEGK (Sistema de Información de Egresados Kuepa) permite retroalimentar a la institución en sus procesos de formación integral.  </p>
                </div>

               
            </div>
    );
  } 
  export default Banner;