import React, { Component } from 'react';
import { auth, createUserDocument } from '../../firebase';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import './RegistroUsuario.css';


class RegistroUsuario extends Component {
  state = { displayName: '', email: '', password: '' };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, displayName } = this.state;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      await createUserDocument(user, { displayName });
    } catch (error) {
      console.log('error', error);
    }

    this.setState({ displayName: '', email: '', password: '' });
  };

  render() {
    const { displayName, email, password } = this.state;
    return (

      <div className="container-signup row registro-usuario min-vh-100">

            <div className="col-sm-1 col-md-5 col-lg-7"></div>
                <div className="col-sm-11 col-md-7 col-lg-5">
                    <div className="row margen-signup">
                        <div className="col-sm-1 col-md-1 col-lg-1"></div>
                            <div className="carta-registro col-sm-9 col-md-9 col-lg-8">
                        
                            <form  onSubmit={this.handleSubmit} className="formularioregistro" id="registro-signup">
                              
                              <div className="titulo-iniciodeRegistro">
                                  <h3>Registrarse</h3>
                              </div>

                              <input
                                type="name"
                                name="displayName"
                                value={displayName}
                                onChange={this.handleChange}
                                placeholder="Nombre"
                              />
                              <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                                placeholder="Email"
                              />
                              <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Password"
                              />
                              <div>
                              <button className="boton-naranja">Registrarse</button> {"  "}
                              <Link to="/iniciosesion" ><button className="boton-azul" >Inicio de Sesión</button></Link>
                              </div>
                            
                            </form>

                            </div>
                        </div>
                    </div>
            </div>
    );
  }
}

export default RegistroUsuario;