import React, { Component } from "react";
import "./CrudEgresados.css";
import firebase from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter,Container, Form } from "reactstrap";
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
//import { Formik, Field, Form, ErrorMessage } from "formik";
//import { db } from "../../firebase";


class CrudEgresados extends Component {
  state = {
   index: [],
    data: [],
    copia:[],
    modalInsertar: false,
    modalInsertar2: false,
    modalEditar: false,
    modalEditar2: false,
    modalVer: false,
    modalVer2: false,
    abiertoCerrado: false, //para cerrar el modal boton X
   
    form:{
      index: '',
      nombres: '',
      apellidos: '',
      tipodedocumento: '',
      numerodedocumento: '',
      fechadenacimiento: '',
      edad:'',
      lugardenacimiento:'',
      direccion:'',
      telefono:'',
      correo:'',
      estado:'',
      programa:'',
      tutor:'',
      fechadegraduacion:'',
      sede:'',
      codigo:'',
      usuario:'',
    },
    id: 0
  };


  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
   
  }

  filtrarElementos=async()=>{
  const copiarespaldo = this.state.data
  for(const aux in copiarespaldo){
    if(copiarespaldo[aux].numerodedocumento === this.state.busqueda)
     {
     
      this.setState({
        data:[copiarespaldo[aux]]
        
      })
      return
     }
     else if
     (copiarespaldo[aux].programa === this.state.busqueda){

       this.setState({
         data:[copiarespaldo[aux]]
         
       })
       return
   }
     else{
     
     this.setState({
     data:this.state.copia
     
   })

  }
  }
  }

  
  
  peticionGet = () => {
    firebase.child("egresados").on("value", (egresado) => {
     
      if (egresado.val() !== null) {
        this.setState({ ...this.state.data, data: egresado.val(), ...this.state.copia,copia:egresado.val()  });
      
      } else {
        this.setState({ data: [] });

      }
    });
  };


  peticionPost=(e)=>{


  
    const initialState={
      index:'',
      nombres: '',
      apellidos: '',
      tipodedocumento: '',
      numerodedocumento: '',
      fechadenacimiento: '',
      edad:'',
      lugardenacimiento:'',
      direccion:'',
      telefono:'',
      correo:'',
      estado:'',
      programa:'',
      tutor:'',
      fechadegraduacion:'',
      sede:'',
      codigo:'',
      usuario:'',
    }
    


    firebase.child("egresados").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      
      this.setState({modalInsertar2: false, form:initialState});
    
  }

  const = ({})

  peticionPut=()=>{

    const initialState={
      index:'',
      nombres: '',
      apellidos: '',
      tipodedocumento: '',
      numerodedocumento: '',
      fechadenacimiento: '',
      edad:'',
      lugardenacimiento:'',
      direccion:'',
      telefono:'',
      correo:'',
      estado:'',
      programa:'',
      tutor:'',
      fechadegraduacion:'',
      sede:'',
      codigo:'',
      usuario:'',
    }
   
    firebase.child(`egresados/${this.state.id}`).set(
      this.state.form,
      error=>{
        
        if(error)console.log(error)
      });
      //this.setState({modalEditar: false})
      this.setState({modalEditar2: false, form:initialState});
  }

  peticionDelete=()=>{
       firebase.child(`egresados/${this.state.id}`).remove(
      error=>{
        if(error)console.log(error)
      });
  }

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
    console.log(this.state.form);
  }

  seleccionarEgresado=async(egresado, id, caso)=>{

    await this.setState({form: egresado, id: id});

    (caso==="Editar")?this.setState({modalEditar: true}):
    (caso==="Ver")?this.setState({modalVer: true}):
    this.peticionDelete()
  
  }

  componentDidMount() {
    this.peticionGet();
  }

  MostrarAlerta=(id)=>{
    this.setState({id:id})
    Swal.fire({
      showCloseButton: true,
      closeButtonText: 'X',
      title: '¿Está seguro que quiere eliminar este registro?',
      text: "Si hace esto, no podrá revertirlo",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonColor: '#00B2A5',
      cancelButtonColor: '#f86433',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.peticionDelete()
        Swal.fire(
          {
            showCloseButton: true,
            title: 'Eliminado',
            text: "El registro ha sido eliminado con éxito",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonColor: '#00B2A5',
            confirmButtonText: 'Ok'
          }
        )
      }
    })
  }

  validacion = (e) => {
  e.preventDefault()

  this.setState({...this.state, modalInsertar2: true, modalInsertar: false })
  }



  reload = () => {
    window.location.reload(true);
}

  render() {
    //Modales, tabla y formularios
    return (
      <container-fluid className="containertabladp">
      <div className="App">
          <div className="formutraedatosbasicos">
              <div className="titulolistaegresados">
                <h1>Listado de Egresados</h1>
              </div>
            <br />
            <div className="row contenedor_filtro">
            <div className="form-group col-md-2"></div>
            <div className="form-group col-md-4">
              <label>Número de documento </label>
              <br />
              <input type="text" pattern="[0-9- ]{7,12}"  className="form-control" name="numerodedocumento" onChange={this.onChange}/>
              </div>
              <div className="form-group col-md-4">
              <label>Programa </label>
              <br />
              <select type="text" className="form-control"  name="programa" onChange={this.onChange}  aria-label="Default select example">    
                      <option value="0" selected="">Seleccione</option>
                      <option value="Inglés Intensivo">Inglés Intensivo</option>
                      <option value="Inglés Principiantes (pre-básico)">Inglés Principiantes (pre-básico)</option>
                      <option value="Inglés Básico">Inglés Básico</option>
                      <option value="Inglés Intermedio">Inglés Intermedio</option>
                      <option value="Inglés Avanzado">Inglés Avanzado</option>
                      <option value="Bachillerato Presencial">Bachillerato Presencial</option>
                      <option value="Bachillerato Virtual">Bachillerato Virtual</option>
                      <option value="Bachillerato ciclo III">Bachillerato ciclo III</option>
                      <option value="Bachillerato ciclo IV">Bachillerato ciclo IV</option>
                      <option value="Bachillerato ciclo V">Bachillerato ciclo V</option>
                      <option value="Bachillerato ciclo VI">Bachillerato ciclo VI</option>                 
                </select>
              </div>
              <div className="form-group col-md-2"></div>
            </div>
        <br />
            <div className="botoneslistadoe">
            <button className="boton-naranja" onClick={()=>this.filtrarElementos()}>Consultar</button>
            <button className="boton-azul" onClick={this.reload} type="button" >Nueva Consulta</button>
            <button className="boton-naranja" onClick={()=>this.setState({modalInsertar: true})}>Nuevo Registro</button>
          </div>
          </div>
        <br />
        <br />

        <div class="table-responsive">
        <table className="tabladatospersonales">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Tipo de documento</th>
              <th>Número de documento</th>
              <th>Fecha de nacimiento</th>
              <th>Edad</th>
              <th>Lugar de nacimiento</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo electronico</th>
              <th>Programa</th>
              <th>Tutor</th>
              <th>Fecha de graduación</th>
              <th>Sede</th>
              <th>Código de plataforma</th>
              <th>Usuario de plataforma</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map((i,index)=>{
             // console.log(i);
             
              return <tr key={i}>
                <td>{index+1}</td>
                <td>{this.state.data[i].nombres}</td>
                <td>{this.state.data[i].apellidos}</td>
                <td>{this.state.data[i].tipodedocumento}</td>
                <td>{this.state.data[i].numerodedocumento}</td>
                <td>{this.state.data[i].fechadenacimiento}</td>
                <td>{this.state.data[i].edad}</td>
                <td>{this.state.data[i].lugardenacimiento}</td>
                <td>{this.state.data[i].direccion}</td>
                <td>{this.state.data[i].telefono}</td>
                <td>{this.state.data[i].correo}</td>
                <td>{this.state.data[i].programa}</td>
                <td>{this.state.data[i].tutor}</td>
                <td>{this.state.data[i].fechadegraduacion}</td>
                <td>{this.state.data[i].sede}</td>
                <td>{this.state.data[i].codigo}</td>
                <td>{this.state.data[i].usuario}</td>
                <td>{this.state.data[i].estado}</td>
              
              <td>
                <button className="boton-iconos" onClick={()=>this.seleccionarEgresado(this.state.data[i], i, 'Ver')}><FaIcons.FaEye className="iconover"/></button> {"   "}
                <button className="boton-iconos" onClick={()=>this.seleccionarEgresado(this.state.data[i], i, 'Editar')}><FaIcons.FaEdit className="iconoeditar"/></button> {"   "}
                <button className="boton-iconos" onClick={()=>this.MostrarAlerta(i)}><RiIcons.RiDeleteBinFill className="iconoeliminar"/></button>
             </td>
              </tr>
            })}
          </tbody>
        </table>
        </div>


     
      <Modal className="modal-dialog modal-dialog-centered modal-lg responsive-modal" isOpen={this.state.modalInsertar}>
      <Form  >
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalInsertar: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Personales</h1></ModalHeader>
      <ModalBody>
    
            <div className="form-group" autoComplete="none">
              <div className="row ">
                <div className="form-group col-md-6">
                  <label>Id: </label>
                  <br />
                  <input type="text" readOnly className="form-control" autoComplete="none" name="index" onChange={this.handleChange} value={this.state.form && this.state.form.index}/>
                  <br />
                </div>
                  <div className="form-group col-md-6">
                  <label>Nombres: </label>
                  <br />
                  <input type="text" pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" required="required" title="Las iniciales de los nombres deben ser mayusculas y no se permiten numeros" className="form-control" autoComplete="none" name="nombres" onChange={this.handleChange} value={this.state.form && this.state.form.nombres}/>
                  <br />
                </div>
              </div>
              <div className="row ">
                <div className="form-group col-md-6">
                  <label>Apellidos: </label>
                  <br />
                  <input type="text"  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" required className="form-control" autoComplete="none" name="apellidos" onChange={this.handleChange} value={this.state.form && this.state.form.apellidos}/>
                  <br />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Tipo de documento:</label>
                    <select type="text" required className="form-control ensayofocus"  name="tipodedocumento" onChange={this.handleChange} value={this.state.form && this.state.form.tipodedocumento} aria-label="Default select example">    
                          <option ></option>
                          <option value="NUIP">Número único de identificación personal (NUIP)</option>
                          <option value="Tarjeta de Identidad">Tarjeta de Identidad (TI)</option>
                          <option value="Cédula de Ciudadania">Cédula de Ciudadania (CC)</option>
                          <option value="Cédula de Extranjeria">Cédula de Extranjeria (CE)</option>
                    </select>
                </div>
              </div>
              <div className="row ">
                <div className="form-group col-md-6">
                  <label>Número de documento: </label>
                  <br />
                  <input type="text"  pattern="[0-9- ]{8,15}" required className="form-control" autoComplete="none" name="numerodedocumento" onChange={this.handleChange} value={this.state.form && this.state.form.numerodedocumento}/>
                  <br />
                </div>
                <div className="form-group col-md-6">
                  <label>Fecha de nacimiento: </label>
                  <br />
                  <input type="date" required className="form-control" autoComplete="none" name="fechadenacimiento" onChange={this.handleChange} value={this.state.form && this.state.form.fechadenacimiento}/>
                  <br />
                </div>
              </div>
              <div className="row ">
                <div className="form-group col-md-6">
                  <label>Edad: </label>
                  <br />
                  <input type="text" required pattern="[0-9]{1,2}"  className="form-control" autoComplete="none" name="edad" onChange={this.handleChange} value={this.state.form && this.state.form.edad}/>
                  <br />
                </div>
                <div className="form-group col-md-6">
                  <label>Lugar de nacimiento: </label>
                  <br />
                  <input type="text" required  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" className="form-control" autoComplete="none" name="lugardenacimiento" onChange={this.handleChange} value={this.state.form && this.state.form.lugardenacimiento}/>
                  <br />
                </div>
              </div>
              <div className="row ">
                <div className="form-group col-md-6">
                  <label>Dirección: </label>
                  <br />
                  <input type="text" required pattern="^[a-zA-Z0-9 #-]{2,30}" className="form-control" autoComplete="none" name="direccion" onChange={this.handleChange} value={this.state.form && this.state.form.direccion}/>
                  <br />
                </div>
                <div className="form-group col-md-6">
                  <label>Teléfono: </label>
                  <br />
                  <input type="text" required pattern="[0-9- ]{7,12}"  className="form-control" autoComplete="none" name="telefono" onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
                  <br />
                </div>
              </div>
            <div className="row ">
              <div className="form-group col-md-6">
                  <label>Correo Electronico: </label>
                  <br />
                  <input type="text" required pattern="[\w]+@{1}[\w]+\.[a-z]{2,3}" className="form-control" autoComplete="none" name="correo" onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
              </div>
              <div className="form-group col-md-6">
                  <label>Estado: </label>
                  <br />
                  <select type="text" required className="form-control"  name="estado" onChange={this.handleChange}  value={this.state.form && this.state.form.estado} aria-label="Default select example">    
                          <option ></option>
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>      
                  </select>
                  <br />
              </div>
            </div>
          </div>
      </ModalBody>
      <ModalFooter>
    
        {/*<button className="boton-azul" onClick={()=>this.filtrarElementos()}>Guardar</button>*/}
        <button className="boton-azul" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
        <button className="boton-naranja" type="button" onClick={()=>this.setState({modalInsertar2:true, modalInsertar:false})}>Siguiente</button>
        
      </ModalFooter>
      </Form>
    </Modal>

    <Modal className="modal-dialog modal-dialog-centered modal-lg" id="exampleModalCenter" isOpen={this.state.modalInsertar2}>
      <Form>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalInsertar2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Académicos</h1></ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row ">
             <div className="form-group col-md-6">
              <label htmlFor="">Programa del que se graduó</label>
              <select type="text" required className="form-control"  name="programa" onChange={this.handleChange} value={this.state.form && this.state.form.programa} >    
              <option></option>
                  <option value="Inglés Intensivo">Inglés Intensivo</option>
                  <option value="Inglés Principiantes (pre-básico)">Inglés Principiantes (pre-básico)</option>
                  <option value="Inglés Básico">Inglés Básico</option>
                  <option value="Inglés Intermedio">Inglés Intermedio</option>
                  <option value="Inglés Avanzado">Inglés Avanzado</option>
                  <option value="Bachillerato Presencial">Bachillerato Presencial</option>
                  <option value="Bachillerato Virtual">Bachillerato Virtual</option>
                  <option value="Bachillerato ciclo III">Bachillerato ciclo III</option>
                  <option value="Bachillerato ciclo IV">Bachillerato ciclo IV</option>
                  <option value="Bachillerato ciclo V">Bachillerato ciclo V</option>
                  <option value="Bachillerato ciclo VI">Bachillerato ciclo VI</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Nombre del tutor: </label>
              <br />
              <input type="text" required  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" className="form-control" autoComplete="none" name="tutor" onChange={this.handleChange} value={this.state.form && this.state.form.tutor}/>
              <br />
            </div>
            </div>
            <div className="row ">
            <div className="form-group col-md-6">
              <label>Fecha graduación: </label>
              <br />
              <input type="date" required className="form-control" autoComplete="none" name="fechadegraduacion" onChange={this.handleChange} value={this.state.form && this.state.form.fechadegraduacion}/>
              <br />
            </div>
            <div className="form-group col-md-6">
              <label>Sede</label>
              <br />
              <select type="text" required className="form-control"  name="sede" onChange={this.handleChange} value={this.state.form && this.state.form.sede} aria-label="Default select example">    
                      <option></option>
                      <option value="Kuepa Restrepo">Kuepa Restrepo</option>
                      <option value="Kuepa Calle 72">Kuepa Calle 72</option>
                      <option value="Kuepa Álamos">Kuepa Álamos</option>
                </select>
              <br />
            </div>
            </div>
            <div className="row ">
                <div className="form-group col-md-6">
                  <label>Código de plataforma: </label>
                  <br />
                  <input type="text" required pattern="[0-9- ]{3,12}" className="form-control" autoComplete="none" name="codigo" onChange={this.handleChange} value={this.state.form && this.state.form.codigo}/>
                  <br />
                </div>
                  <div className="form-group col-md-6">
                  <label>Usuario de plataforma: </label>
                  <br />
                  <input type="text" required pattern="[\w]+@{1}[\w]+\.[a-z]{2,3}" className="form-control" autoComplete="none" name="usuario" onChange={this.handleChange} value={this.state.form && this.state.form.usuario}/>
                  <br />
                </div>
                </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-azul2" onClick={()=>this.setState({modalInsertar2:true, modalInsertar:false})}>Guardar</button>
        <button className="boton-naranja" onClick={()=>this.setState({modalInsertar2: false, modalInsertar: true})}>Anterior</button>
        <button className="boton-azul" onClick={()=>this.peticionPost({modalInsertar2: false})}>Insertar</button>{"   "}
      </ModalFooter>
      </Form>
    </Modal>


    <Modal  className='modal-dialog modal-dialog-centered modal-lg' isOpen={this.state.modalEditar}>
                    <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalEditar: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Personales</h1></ModalHeader>
      <ModalBody>
      <div className="form-group">
      <div className="row ">
        <div className="form-group col-md-6">
          <label>Id: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="index" onChange={this.handleChange} value={this.state.form && this.state.form.index}/>
          <br />
        </div>
        <div className="form-group col-md-6">
          <label>Nombres: </label>
          <br />
          <input type="text"  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" required title="" className="form-control"  autoComplete="none" name="nombres" onChange={this.handleChange} value={this.state.form && this.state.form.nombres}/>
          <br />
        </div>
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>Apellidos: </label>
          <br />
          <input type="text"  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" required title="" className="form-control" autoComplete="none" name="apellidos" onChange={this.handleChange} value={this.state.form && this.state.form.apellidos}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label htmlFor="">Tipo de documento:</label>
            <select type="text" required className="form-control"  name="tipodedocumento" onChange={this.handleChange}   value={this.state.form && this.state.form.tipodedocumento} aria-label="Default select example">    
                  <option></option>
                  <option value="NUIP">Número único de identificación personal (NUIP)</option>
                  <option value="Tarjeta de Identidad">Tarjeta de Identidad (TI)</option>
                  <option value="Cédula de Ciudadania">Cédula de Ciudadania (CC)</option>
                  <option value="Cédula de Extranjeria">Cédula de Extranjeria (CE)</option>
            </select>
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Número de documento: </label>
          <br />
          <input type="text"  pattern="[0-9- ]{8,15}" required title="" className="form-control" autoComplete="none" name="numerodedocumento" onChange={this.handleChange} value={this.state.form && this.state.form.numerodedocumento}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Fecha de nacimiento: </label>
          <br />
          <input type="date" required className="form-control" autoComplete="none" name="fechadenacimiento" onChange={this.handleChange} value={this.state.form && this.state.form.fechadenacimiento}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Edad: </label>
          <br />
          <input type="text"  required pattern="[0-9]{1,2}"  title="" className="form-control" autoComplete="none" name="edad" onChange={this.handleChange} value={this.state.form && this.state.form.edad}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Lugar de nacimiento: </label>
          <br />
          <input type="text" required  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" title="" className="form-control" autoComplete="none" name="lugardenacimiento" onChange={this.handleChange} value={this.state.form && this.state.form.lugardenacimiento}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Dirección: </label>
          <br />
          <input type="text"  required pattern="^[a-zA-Z0-9 #-]{2,30}" title="" className="form-control" autoComplete="none" name="direccion" onChange={this.handleChange} value={this.state.form && this.state.form.direccion}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Teléfono: </label>
          <br />
          <input type="text"  required pattern="[0-9- ]{7,12}" title="" className="form-control" autoComplete="none" name="telefono" onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Correo Electronico: </label>
          <br />
          <input type="text" required pattern="[\w]+@{1}[\w]+\.[a-z]{2,3}" title="" className="form-control" autoComplete="none" name="correo" onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
         </div>
         <div className="form-group col-md-6">
          <label>Estado: </label>
          <br />
          <select type="text" required className="form-control"  name="estado" onChange={this.handleChange} value={this.state.form && this.state.form.estado} aria-label="Default select example">    
                  <option></option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>     
          </select>
          <br />
          </div>
         </div>   
      </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalEditar2:true, modalEditar:false})}>Siguiente</button>
        <button className="boton-azul" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>   
      </ModalFooter>
    </Modal>

    <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalEditar2}>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalEditar2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Académicos</h1></ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row ">
            <div className="form-group col-md-6">
              <label htmlFor="">Programa del que se graduó</label>
              <select type="text" required className="form-control"  name="programa" onChange={this.handleChange} value={this.state.form && this.state.form.programa} >    
              <option></option>
                  <option value="Inglés Intensivo">Inglés Intensivo</option>
                  <option value="Inglés Principiantes (pre-básico)">Inglés Principiantes (pre-básico)</option>
                  <option value="Inglés Básico">Inglés Básico</option>
                  <option value="Inglés Intermedio">Inglés Intermedio</option>
                  <option value="Inglés Avanzado">Inglés Avanzado</option>
                  <option value="Bachillerato Presencial">Bachillerato Presencial</option>
                  <option value="Bachillerato Virtual">Bachillerato Virtual</option>
                  <option value="Bachillerato ciclo III">Bachillerato ciclo III</option>
                  <option value="Bachillerato ciclo IV">Bachillerato ciclo IV</option>
                  <option value="Bachillerato ciclo V">Bachillerato ciclo V</option>
                  <option value="Bachillerato ciclo VI">Bachillerato ciclo VI</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Nombre del tutor: </label>
              <br />
              <input type="text" required  pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" title="" className="form-control" autoComplete="none" name="tutor" onChange={this.handleChange} value={this.state.form && this.state.form.tutor}/>
              <br />
            </div>
            </div>
            <div className="row ">
            <div className="form-group col-md-6">
              <label>Fecha graduación: </label>
              <br />
              <input type="date"  required className="form-control" autoComplete="none" name="fechadegraduacion" onChange={this.handleChange} value={this.state.form && this.state.form.fechadegraduacion}/>
              <br />
            </div>
            <div className="form-group col-md-6">
              <label>Sede</label>
              <br />
              <select type="text" required className="form-control"  name="sede" onChange={this.handleChange} value={this.state.form && this.state.form.sede} aria-label="Default select example">    
                      <option></option>
                      <option value="Kuepa Restrepo">Kuepa Restrepo</option>
                      <option value="Kuepa Calle 72">Kuepa Calle 72</option>
                      <option value="Kuepa Álamos">Kuepa Álamos</option>
                </select>
              <br />
            </div>
            </div>
            <div className="row ">
                <div className="form-group col-md-6">
                  <label>Código de plataforma: </label>
                  <br />
                  <input type="text" required pattern="[0-9- ]{3,12}" title="" className="form-control" autoComplete="none" name="codigo" onChange={this.handleChange} value={this.state.form && this.state.form.codigo}/>
                  <br />
                </div>
                  <div className="form-group col-md-6">
                  <label>Usuario de plataforma: </label>
                  <br />
                  <input type="text"  required pattern="[\w]+@{1}[\w]+\.[a-z]{2,3}" title="" className="form-control" autoComplete="none" name="usuario" onChange={this.handleChange} value={this.state.form && this.state.form.usuario}/>
                  <br />
                </div>
                </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalEditar2: false, modalEditar: true})}>Anterior</button>
        <button className="boton-azul" onClick={()=>this.peticionPut({modalEditar2: false})}>Guardar</button>{"   "}
      </ModalFooter>
    </Modal>


    <Modal  className='modal-dialog modal-dialog-centered modal-lg' isOpen={this.state.modalVer}>
                    <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalVer: false})}>X</button>
                    </ModalHeader>
      <ModalHeader><h1>Datos Personales</h1></ModalHeader>
      <ModalBody>
        <div className="form-group" autoComplete="none">
        <div className="row ">
        <div className="form-group col-md-6">
          <label>Id: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="index"  value={this.state.form && this.state.form.index}/>
          <br />
        </div>
        <div className="form-group col-md-6">
          <label>Nombres: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none"  name="nombres"  value={this.state.form && this.state.form.nombres}/>
          <br />
         </div>
         </div>
        <div className="row ">
        <div className="form-group col-md-6">
          <label>Apellidos: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="apellidos"  value={this.state.form && this.state.form.apellidos}/>
          <br />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="">Tipo de documento:</label>
            <select type="text" className="form-control"  name="tipodedocumento" value={this.state.form && this.state.form.tipodedocumento}  aria-label="Default select example">    
                  <option value="0" selected="">Seleccione su Tipo de Documento</option>
                  <option value="NUIP">Número único de identificación personal (NUIP)</option>
                  <option value="Tarjeta de Identidad">Tarjeta de Identidad (TI)</option>
                  <option value="Cédula de Ciudadania">Cédula de Ciudadania (CC)</option>
                  <option value="Cédula de Extranjeria">Cédula de Extranjeria (CE)</option>
                  <option value="Tarjeta de Identidad">Tarjeta de Identidad (TI)</option>
            </select>
        </div>
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>Número de documento: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="numerodedocumento"  value={this.state.form && this.state.form.numerodedocumento}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Fecha de nacimiento: </label>
          <br />
          <input type="date" className="form-control" autoComplete="none" name="fechadenacimiento"  value={this.state.form && this.state.form.fechadenacimiento}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Edad: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="edad"  value={this.state.form && this.state.form.edad}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Lugar de nacimiento: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="lugardenacimiento"  value={this.state.form && this.state.form.lugardenacimiento}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Dirección: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="direccion"  value={this.state.form && this.state.form.direccion}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Teléfono: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="telefono"  value={this.state.form && this.state.form.telefono}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Correo Electronico: </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="correo"  value={this.state.form && this.state.form.correo}/>
        </div>
        <div className="form-group col-md-6">
          <label>Estado:</label>
          <br />
          <select type="text" className="form-control"  name="estado"  value={this.state.form && this.state.form.estado} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Acivo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                  
            </select>
          <br />
          </div>
          </div>  
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalVer2:true, modalVer:false})}>Siguiente</button>
        <button className="boton-azul" onClick={()=>this.setState({modalVer: false})}>Cerrar</button>  
      </ModalFooter>
    </Modal>


    <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalVer2}>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalVer2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Académicos</h1></ModalHeader>
      <ModalBody>
        <div className="form-group">
          <div className="row ">
            <div className="form-group col-md-6">
              <label htmlFor="">Programa del que se graduó</label>
              <select type="text" className="form-control"  name="programa"  value={this.state.form && this.state.form.programa} >    
              <option value="0" selected="">Seleccione</option>
                  <option value="Inglés Intensivo">Inglés Intensivo</option>
                  <option value="Inglés Principiantes (pre-básico)">Inglés Principiantes (pre-básico)</option>
                  <option value="Inglés Básico">Inglés Básico</option>
                  <option value="Inglés Intermedio">Inglés Intermedio</option>
                  <option value="Inglés Avanzado">Inglés Avanzado</option>
                  <option value="Bachillerato Presencial">Bachillerato Presencial</option>
                  <option value="Bachillerato Virtual">Bachillerato Virtual</option>
                  <option value="Bachillerato ciclo III">Bachillerato ciclo III</option>
                  <option value="Bachillerato ciclo IV">Bachillerato ciclo IV</option>
                  <option value="Bachillerato ciclo V">Bachillerato ciclo V</option>
                  <option value="Bachillerato ciclo VI">Bachillerato ciclo VI</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Nombre del tutor: </label>
              <br />
              <input type="text" className="form-control" autoComplete="none" name="tutor"  value={this.state.form && this.state.form.tutor}/>
              <br />
            </div>
            </div>
            <div className="row ">
            <div className="form-group col-md-6">
              <label>Fecha graduación: </label>
              <br />
              <input type="date" className="form-control" autoComplete="none" name="fechadegraduacion"  value={this.state.form && this.state.form.fechadegraduacion}/>
              <br />
            </div>
            <div className="form-group col-md-6">
              <label>Sede</label>
              <br />
              <select type="text" className="form-control"  name="sede"  value={this.state.form && this.state.form.sede} aria-label="Default select example">    
                      <option value="0" selected="">Seleccione</option>
                      <option value="Kuepa Restrepo">Kuepa Restrepo</option>
                      <option value="Kuepa Calle 72">Kuepa Calle 72</option>
                      <option value="Kuepa Álamos">Kuepa Álamos</option>
                </select>
              <br />
            </div>
            </div>
            <div className="row ">
                <div className="form-group col-md-6">
                  <label>Código de plataforma: </label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="codigo" onChange={this.handleChange} value={this.state.form && this.state.form.codigo}/>
                  <br />
                </div>
                  <div className="form-group col-md-6">
                  <label>Usuario de plataforma: </label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="usuario" onChange={this.handleChange} value={this.state.form && this.state.form.usuario}/>
                  <br />
                </div>
                </div> 
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalVer2: false, modalVer: true})}>Anterior</button>
      <button className="boton-azul"onClick={()=>this.setState({modalVer2: false})}>Cerrar</button>
      </ModalFooter>
    </Modal>
      </div>
      </container-fluid >
    );
  }
}

export default CrudEgresados;