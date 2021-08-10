import React from 'react';
import './Header.css';
import logo from '../../assets/img/logokuepa.png';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalDialog, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Header extends React.Component{
  state={
    abierto: false,
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }

  render(){

    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    const nomusuario = localStorage.getItem('nombreusuario')

    const cerrarSesion =()=>{
      localStorage.clear()
      window.location.replace('/iniciosesion')
    }


    return (
            <div className="row contenedor-header">
                <div className="col-sm-12 col-md-7 col-lg-7 logoheader">
                    <img src={logo}/>
                </div>	

                <div className="col-sm-12 col-md-4 col-lg-4 info-header" >
                    <h5 className="icono-usuario-header">
                        <FaIcons.FaUserCircle />
                    </h5>
                    <div>
                        <h5>¡Hola!</h5>
                        <h5>{nomusuario}</h5>
                    </div>
               </div> 

               <div className="col-sm-12 col-md-1 col-lg-1 icono-usuario-cerrarsesion" onClick={this.abrirModal}>
                 <FaIcons.FaPowerOff />    
                </div> 

                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-12">
                  <>
                    <Modal isOpen={this.state.abierto} style={modalStyles} className="modal-cerrarsesion modal-dialog modal-dialog-centered ">
                      <ModalHeader closeButton className="espacio-boton-x">
                        <button className="boton-cerrar-x" onClick={this.abrirModal}>X</button>
                      </ModalHeader>

                        <ModalHeader className="modal-header-cerrarsesion" closeButton>
                          <h4>¿Está seguro que desea cerrar sesión?</h4>
                            <div className="botones-modal-cerrarsesion">
                               <button className="boton-si" onClick={cerrarSesion} >Si</button>
                                <button  className="boton-no" onClick={this.abrirModal}>No</button>
                            </div>
                        </ModalHeader>
                    </Modal>
                 </> 
                </div>
            </div> 
          </div>
     )
   }
 }
 export default Header;