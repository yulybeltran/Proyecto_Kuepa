import React, { Component } from 'react';
import { auth, createUserDocument } from '../../firebase';
import './InicioSesion.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Swal from 'sweetalert2';

class IniciarSesion extends Component {
    state = { 
     email: '',
     password: '' 
    };
  
    handleChange = (e) => {
      const { name, value } = e.target;
  
      this.setState({ [name]: value });
    };
  
    handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = this.state;
      if (email && password) {
        try {
          await auth.signInWithEmailAndPassword(email, password)
         
          .then(response=>{

        const arroba=response.user.email.search("@")
        const nusuario = response.user.email.slice(0,arroba)
       localStorage.setItem('nombreusuario', nusuario )
            window.location.replace("/home")
          })
        } catch (error) {
          Swal.fire(
            {
              showCloseButton: true,
              text: "Los datos que ingresó son incorrectos o el usuario no está registrado",
              icon: 'warning',
              showConfirmButton: true,
              confirmButtonColor: '#00B2A5',
              confirmButtonText: 'Ok'
            }
          )
        }
      }
  
      // this.setState({ email: '', password: '' });
    };
  
    render() {
      const { email, password } = this.state;
      return (
        <div className="container1 row iniciosesion-fondo min-vh-100">
            <div className="titulo-inicio">
                    <div className="back">
                        SISTEMA DE INFORMACIÓN <br></br>DE EGRESADOS
                    </div>
            </div>

            <div className="col-sm-1 col-md-5 col-lg-7"></div>
                <div className="col-sm-11 col-md-7 col-lg-5">
                    <div className="row margen">
                        <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            <div className="carta col-sm-9 col-md-9 col-lg-8">
                        
                                <form className="formularioingreso" id="ingreso" onSubmit={this.handleSubmit}>
                                    <div className="titulo-iniciosesion">
                                        <h3>Inicio de Sesión.</h3>
                                    </div>
                                    <div>
                                        <div id="campoUsuario">
                                            <label>Nombre de Usuario</label>
                                            <input 
                                            type="email" 
                                            name="email" 
                                            value={email}
                                            onChange={this.handleChange}
                                            placeholder="Email" 
                                            className="form-control"
                                            required="required" />
                                            <div className="feedback"></div>
                                        </div>
                                        <div id="campoContrasena">
                                            <label>Contraseña</label>
                                            <input 
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={this.handleChange}
                                            placeholder="Password"
                                            className="form-control"  
                                            required="required" />
                                            <div className="feedback"></div>
                                        </div>

                                        <div className="titulo-olvidarcontraseña"><Link to="/registrar">¿Ya tienes una cuenta?</Link></div><br></br>

                                        <div className="boton-iniciodesesion" ><input type="Submit" onSubmit={this.handleSubmit} value="Iniciar Sesión" className="boton-iniciosesion"/></div><br></br>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>
      );
    }
  }
export default IniciarSesion;