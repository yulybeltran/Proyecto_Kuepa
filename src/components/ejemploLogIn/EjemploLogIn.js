import React, { Component } from 'react';
import { auth, createUserDocument } from '../../firebase';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
 
 class Basic extends Component {
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
           await auth.signInWithEmailAndPassword(email, password);
         } catch (error) {
           console.log('error logging in', error);
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
                         
                            <Formik
                            initialValues={{ email:"", password:""}}
                            onSubmit={async values =>{
                                await new Promise(resolve=> setTimeout(resolve,500));
                                alert(JSON.stringify(values, null, 2));
                            } }
                            
                            >

                            <Form className="formularioingreso" id="ingreso">
                                     <div className="titulo-iniciosesion">
                                         <h3>Inicio de Sesión.</h3>
                                     </div>
                                     <div>
                                         <div id="campoUsuario">
                                             <label>Nombre de Usuario</label>
                                             <Field 
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
                                             <Field 
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
 
                                         <div className="boton-iniciodesesion" ><Link to='/home' ><input type="submit" value="Iniciar Sesión" className="boton-iniciosesion"/></Link></div><br></br>
                                         
                                     </div>
                                 </Form>

                            </Formik>
                                 
                             </div>
                         </div>
                     </div>
             </div>
       );
     }
   }
 export default Basic;