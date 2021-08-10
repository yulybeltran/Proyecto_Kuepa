import React from 'react';
import { withFormik, Field, ErrorMessage, Form } from 'formik';
import '../iniciosesion/InicioSesion.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function MyForm(props) {
    const {
        isSubmitting,
        isValid,
    } = props;

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
                                <Form className="formularioingreso" id="ingreso">
                                <div className="titulo-iniciosesion">
                                        <h3>Inicio de Sesión.</h3>
                                    </div>
                                    
                                        Nombre de usuario:
                                        <Field name="email" type="email" className="input" />
                                        <ErrorMessage name="email">
                                            {message => <div className="error">{message}</div>}
                                        </ErrorMessage>
                                   

                                    
                                        Contraseña:
                                        <Field name="password" type="password" className="input" />
                                        <ErrorMessage name="password">
                                            {message => <div className="error">{message}</div>}
                                        </ErrorMessage>

                                        <div className="boton-iniciodesesion" ><Link to='/' ><input type="submit" className={`submit ${isSubmitting || !isValid ? 'disabled' : ''}`}
                                            disabled={isSubmitting || !isValid} value="Iniciar Sesión" className="boton-iniciosesion"/></Link></div><br></br>
                                  
                                </Form>
                            </div>
                        </div>
                        </div>

                     </div>
                    
    );
}

export default withFormik({
    mapPropsToValues(props) {
        return {
            email: props.defaultEmail,
            password: '',
        };
    },

    async validate(values) {
        const errors = {};

        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

        await sleep(5000);

        if (Object.keys(errors).length) {
            throw errors;
        }
    },

    handleSubmit(values, formikBag) {
        formikBag.setSubmitting(false);
        console.log(values);
    },
})(MyForm);