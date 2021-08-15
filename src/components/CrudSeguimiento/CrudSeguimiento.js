import React, { Component } from "react";
import "./CrudSeguimiento.css";
import firebase, { db } from "../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalHeader, ModalFooter,Container, Form } from "reactstrap";
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import CrudEgresados from "../CrudEgresados/CrudEgresados";


<CrudEgresados />
class CrudSeguimiento extends Component {
  state = {
    datacompuesta: [],
    busqueda: "",
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
      ndocumento:'',
      numerodedocumento:'',
      nombres: '',
      apellidos: '',
      telefono:'',
      correo:'',
      fecharegistro:'',
      estatrabajando:'',
      porqueno:'',
      nombreempresa:'',
      sectorempresa:'',
      cargo:'',
      promediosalarial:'',
      tipocontrato:'',
      estaconforme:'',
      trabajobienremunerado:'',
      horaslaborales:'',
      tiempoenempresa:'',
      modalidadtrabajo:'',
      horariotrabajo:'',
      arearelacionada:'',
      estudiaactualmentepregunta:'',
      estudioactual:'',
      donde:'',
      tipodeestudio:'',
      fechadeinicio:'',
      fechadefinalizacion:'',
      observaciones:'',
    },
    id: 0
  };


  onChange=async e=>{
    e.persist();
    await this.setState({busqueda: e.target.value});
   // this.filtrarElementos();
  }

  filtrarElementos=async()=>{
   //const estudiantefiltrado = await db.ref('egresados').orderByChild(this.state.busqueda)
  //console.log(estudiantefiltrado)
  const copiarespaldo = this.state.data
  for(const aux in copiarespaldo){
    if(copiarespaldo[aux].numerodedocumento === this.state.busqueda) 
   {
     
      this.setState({
        data:[copiarespaldo[aux]]
        
      })
      return
    } else{
  
     this.setState({
     data:this.state.copia
    
   })}
  }
  }

  peticionGet = () => {
    firebase.child("seguimientos").on("value", (seguimiento) => {
      if (seguimiento.val() !== null) {
        this.setState({ ...this.state.data, data: seguimiento.val() });
      } else {
        this.setState({ data: [] });
      }
    });
  };


  peticionPost=()=>{

    const initialState={
      numerodedocumento:'',
      nombres: '',
      apellidos: '',
      telefono:'',
      correo:'',
      fecharegistro:'',
      estatrabajando:'',
      porqueno:'',
      nombreempresa:'',
      sectorempresa:'',
      cargo:'',
      promediosalarial:'',
      tipocontrato:'',
      estaconforme:'',
      trabajobienremunerado:'',
      horaslaborales:'',
      tiempoenempresa:'',
      modalidadtrabajo:'',
      horariotrabajo:'',
      arearelacionada:'',
      estudiaactualmentepregunta:'',
      estudioactual:'',
      donde:'',
      tipodeestudio:'',
      fechadeinicio:'',
      fechadefinalizacion:'',
      observaciones:'',
    }

    firebase.child("seguimientos").push(this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalInsertar2: false,form:initialState});
  
  }

  filtrocompuesto = () =>{
  console.log(this.state.ndocumento)
  db.ref('egresados').orderByChild('numerodedocumento').equalTo(this.state.form.ndocumento).on('child_added',(snapshot)=>{
  console.log(snapshot.key)
 
 
  })
  }

  peticionPut=()=>{
    const initialState={
      numerodedocumento:'',
      nombres: '',
      apellidos: '',
      telefono:'',
      correo:'',
      fecharegistro:'',
      estatrabajando:'',
      porqueno:'',
      nombreempresa:'',
      sectorempresa:'',
      cargo:'',
      promediosalarial:'',
      tipocontrato:'',
      estaconforme:'',
      trabajobienremunerado:'',
      horaslaborales:'',
      tiempoenempresa:'',
      modalidadtrabajo:'',
      horariotrabajo:'',
      arearelacionada:'',
      estudiaactualmentepregunta:'',
      estudioactual:'',
      donde:'',
      tipodeestudio:'',
      fechadeinicio:'',
      fechadefinalizacion:'',
      observaciones:'',
    }
    firebase.child(`seguimientos/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
      this.setState({modalEditar: false});
      this.setState({modalEditar2: false, form:initialState});
  }

  peticionDelete=()=>{
    firebase.child(`seguimientos/${this.state.id}`).remove(
    error=>{
     if(error)console.log(error)
   });
}

  handleChange=e=>{
    this.setState({form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }})
   
  }

  seleccionarSeguimiento=async(seguimiento, id, caso)=>{

    await this.setState({form: seguimiento, id: id});

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

 
  

  reload = () => {
    window.location.reload(true);
}

  render() {

    return (
      <container-fluid className="containertabladp">
      <div className="App">
      <div className="formutraedatosbasicos">
          <div className="titulolistaegresados">
            <h1>Información Laboral</h1>
          </div>
        <br />
        <div className="row contenedor_filtro2">
        <div className="form-group col-md-2"></div>
        <div className="form-group col-md-4">
          <label>Número de documento </label>
          <br />
          <input type="data" pattern="[0-9- ]{1,12}"  className="form-control"  name="numerodedocumento"  onChange={this.onChange}/>
        </div>
        <div className="form-group col-md-4">
        <div className="botoneslistadoe">
        <button className="boton-naranja2" onClick={()=>this.filtrarElementos()}>Consultar</button>
         <button className="boton-azul2" onClick={this.reload} type="button" >Nueva Consulta</button>
        <button className="boton-naranja2" onClick={()=>this.setState({modalInsertar: true})}>Nuevo Registro</button>
        </div>
        </div> 
         </div>
        </div>
        <br />
        <div class="table-responsive">
        <table className="tabladatospersonales">
          <thead>
            <tr>
            <th>Id</th>
              <th>Número de documento</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Teléfono</th>
              <th>Correo electronico</th>
              <th>Fecha de registro</th>
              <th>¿Está trabajando en este momento?</th>
              <th>¿Por qué no?</th>
              <th>Nombre de la empresa</th>
              <th>Sector de la empresa</th>
              <th>Cargo</th>
              <th>Promedio salarial</th>
              <th>Tipo de contrato</th>
              <th>¿Está conforme con su trabajo o puesto en la empresa donde trabaja?</th>
              <th>¿Considera que su trabajo es bien remunerado/pagado?</th>
              <th>¿Cuántas horas semanales labora?</th>
              <th>¿Cuánto tiempo  lleva trabajando en la empresa?</th>
              <th>¿Cuál es su modalidad de trabajo?</th>
              <th>¿Cuál es su horario de trabajo?</th>
              <th>¿Está trabajando en un área que se relacione con lo que estudió?</th>
              <th>¿Está estudiando actualmente?</th>
              <th>¿Qué está estudiando? </th>
              <th>¿Dónde está estudiando?</th>
              <th>Tipo de estudio</th>
              <th>Fecha de inicio </th>
              <th>Fecha de finalización </th>
              <th>Observaciones</th>
              <th>Acciones</th>

            </tr>
          </thead>
          <tbody>
          {Object.keys(this.state.data).map((i,index)=>{
             //console.log(i);
             
              return <tr key={i}>
                <td>{index+1}</td>
                <td>{this.state.data[i].numerodedocumento}</td>
                <td>{this.state.data[i].nombres}</td>
                <td>{this.state.data[i].apellidos}</td>
                <td>{this.state.data[i].telefono}</td>
                <td>{this.state.data[i].correo}</td>
                <td>{this.state.data[i].fecharegistro}</td>
                <td>{this.state.data[i].estatrabajando}</td>
                <td>{this.state.data[i].porqueno}</td>
                <td>{this.state.data[i].nombreempresa}</td>
                <td>{this.state.data[i].sectorempresa}</td>
                <td>{this.state.data[i].cargo}</td>
                <td>{this.state.data[i].promediosalarial}</td>
                <td>{this.state.data[i].tipocontrato}</td>
                <td>{this.state.data[i].estaconforme}</td>
                <td>{this.state.data[i].trabajobienremunerado}</td>
                <td>{this.state.data[i].horaslaborales}</td>
                <td>{this.state.data[i].tiempoenempresa}</td>
                <td>{this.state.data[i].modalidadtrabajo}</td>
                <td>{this.state.data[i].horariotrabajo}</td>
                <td>{this.state.data[i].arearelacionada}</td>
                <td>{this.state.data[i].estudiaactualmentepregunta}</td>
                <td>{this.state.data[i].estudioactual}</td>
                <td>{this.state.data[i].donde}</td>
                <td>{this.state.data[i].tipodeestudio}</td>
                <td>{this.state.data[i].fechadeinicio}</td>
                <td>{this.state.data[i].fechadefinalizacion}</td>
                <td>{this.state.data[i].observaciones}</td>
              
              <td>
                <button className="boton-iconos" onClick={()=>this.seleccionarSeguimiento(this.state.data[i], i, 'Ver')}><FaIcons.FaEye className="iconover"/></button> {"   "}
                <button className="boton-iconos" onClick={()=>this.seleccionarSeguimiento(this.state.data[i], i, 'Editar')}><FaIcons.FaEdit className="iconoeditar"/></button> {"   "}
                <button className="boton-iconos" onClick={()=>this.MostrarAlerta(i)}><RiIcons.RiDeleteBinFill className="iconoeliminar"/></button>
             </td>
               
            </tr>
            })}
          </tbody>
        </table>
        </div>

        <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalInsertar}>
    <Form>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalInsertar: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Laborales</h1></ModalHeader>
      <ModalBody>
    
     <div className="row contenedor_filtro2">
        <div className="form-group col-md-6">
          <label>Número de documento </label>
          <br />
          <input type="number" required pattern="[0-9- ]{7,12}"  className="form-control"  name="numerodedocumento" onChange={this.handleChange} value={this.state.form.numerodedocumento}/>
          </div>
          <div className="form-group col-md-6">
          <div className="botoneslistadoe">
         <button className="boton-azul2" type='button' onClick={()=>this.filtrocompuesto()}>Consultar</button>
        </div>
          </div>
          <div className="datos_de_contacto">
          <div  className="row">
              <div className="form-group col-md-6">
                  <label>Nombres</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="nombres"  onChange={this.handleChange} value={this.state.form && this.state.form.nombres}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Apellidos</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="apellidos"  onChange={this.handleChange}  value={this.state.form && this.state.form.apellidos}/>
                  <br />
              </div>
              </div>
              <div className="row ">
              <div className="form-group col-md-6">
                  <label>Teléfono</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="telefono"  onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Correo Electrónico</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="correo"   onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
              </div>
              </div>
            </div>
         </div>
        <div className="row ">
        <div className="form-group col-md-6">
          <label>Fecha de registro </label>
          <br />
          <input type="date" required autoComplete="none" className="form-control" name="fecharegistro" onChange={this.handleChange} value={this.state.form && this.state.form.fecharegistro}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en este momento? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estatrabajando" required value="Si" onChange={this.handleChange}/>Si
          <input type="radio" className="botonradio" name="estatrabajando"  value="No" onChange={this.handleChange}/>No
          </div>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label htmlFor="">¿Por qué no?</label>
          <br />
          <textarea type="text" className="form-control" autoComplete="none" name="porqueno" onChange={this.handleChange} value={this.state.form && this.state.form.porqueno}/>
           <br />
            </div>
            <div className="form-group col-md-6">
          <label>Nombre de la empresa </label>
          <br />
          <input type="text" pattern="^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$" className="form-control" autoComplete="none" name="nombreempresa" onChange={this.handleChange} value={this.state.form && this.state.form.nombreempresa}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Sector de la empresa </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" name="sectorempresa" onChange={this.handleChange} value={this.state.form && this.state.form.sectorempresa} aria-label="Default select example">    
                  <option ></option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="De servicios">De servicios</option>
                  <option value="Industrial">Industrial</option>
                  <option value="De transporte">De transporte</option>
                  <option value="De comercio">De comercio</option>
                  <option value="Financiero"> Financiero</option>
                  <option value="De la constrcción">De la constrcción</option>
                  <option value="Minero y enérgetico">Minero y enérgetico</option>
                  <option value="Solidario">Solidario</option>
                  <option value="De Comunicaciones">De Comunicaciones</option>
                  <option value="De la salud">De la salud</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Cargo </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="cargo" onChange={this.handleChange} value={this.state.form && this.state.form.cargo}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Promedio salarial </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="promediosalarial" onChange={this.handleChange} value={this.state.form && this.state.form.promediosalarial} aria-label="Default select example">    
                  <option></option>
                  <option value="Menos de 1 SMLV">Menos de 1 SMLV</option>
                  <option value="1 SMLV">1 SMLV</option>
                  <option value="2 SMLV">2 SMLV</option>
                  <option value="3 SMLV">3 SMLV</option>
                  <option value="4 SMLV">4 SMLV</option>
                  <option value="5 SMLV">5 SMLV</option>
                  <option value="Más de 5 SMLV">Más de 5 SMLV</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Tipo de contrato </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" name="tipocontrato" placeholder="Seleccione" onChange={this.handleChange} value={this.state.form && this.state.form.tipocontrato} aria-label="Default select example">    
                  <option ></option>
                  <option value="Contrato a término fijo">Contrato a término fijo</option>
                  <option value="Contrato a término indefinido">Contrato a término indefinido</option>
                  <option value="Contrato de obra o Laboral">Contrato de obra o Laboral</option>
                  <option value="Contrato de aprendizaje">Contrato de aprendizaje</option>
                  <option value="Contrato temporal, ocasional o accidental">Contrato temporal, ocasional o accidental</option>
                  <option value="Contrato civil por prestación de servicios">Contrato civil por prestación de servicios</option>
            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Está conforme con su trabajo o puesto en la empresa donde trabaja? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estaconforme"  value="Si" onChange={this.handleChange} />Si
          <input type="radio" className="botonradio" name="estaconforme"  value="No" onChange={this.handleChange} />No
          </div>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Considera que su trabajo es bien remunerado/pagado? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="Si" onChange={this.handleChange} />Si
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="No" onChange={this.handleChange} />No
          </div>
        </div>
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuántas horas semanales labora? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" name="horaslaborales" onChange={this.handleChange} value={this.state.form && this.state.form.horaslaborales} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 36 horas">Menos de 36 horas</option>
                  <option value="36 horas">36 horas</option>
                  <option value="40 horas">40 horas</option>
                  <option value="42 horas">42 horas</option>
                  <option value="45 horas">45 horas</option>
                  <option value="48 horas">48 horas</option>
                  <option value="Más de 48 horas">Más de 48 horas</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuánto tiempo lleva trabajando en la empresa? </label>
          <br />
          <select type="text" className="form-control"  autoComplete="none" name="tiempoenempresa" onChange={this.handleChange} value={this.state.form && this.state.form.tiempoenempresa} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 6 meses">Menos de 6 meses</option>
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="Más de 5 años">Más de 5 años</option>

            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuál es su modalidad de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="modalidadtrabajo" onChange={this.handleChange} value={this.state.form && this.state.form.modalidadtrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Teletrabajo autónomo">Teletrabajo autónomo</option>
                  <option value="Teletrabajo suplementario">Teletrabajo suplementario</option>
                  <option value="Teletrabajo móvil">Teletrabajo móvil</option>
                  <option value="Trabajo a domicilio">Trabajo a domicilio</option>

            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuál es su horario de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="horariotrabajo" onChange={this.handleChange} value={this.state.form && this.state.form.horariotrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="4:00 am - 3:00 pm">4:00 am - 3:00 pm</option>
                  <option value="6:00 am - 6:00 pm">6:00 am - 6:00 pm</option>
                  <option value="7:00 am - 5:00 pm">7:00 am - 5:00 pm</option>
                  <option value="7:00 am - 4:00 pm">7:00 am - 4:00 pm</option>
                  <option value="8:00 am - 5:00 pm">8:00 am - 5:00 pm</option>
                  <option value="8:00 am - 8:00 pm">8:00 am - 8:00 pm</option>
                  <option value="6:00 pm-  6:00 am">6:00 pm-  6:00 am</option>
                  <option value="10:00 pm - 6:00 am">10:00 pm - 6:00 am</option>
                  <option value="">Otro</option>
            </select>
          <br />
          </div>
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en un área que se relacione con lo que estudió? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="arearelacionada"  value="Si"  onChange={this.handleChange}/>Si
          <input type="radio" className="botonradio" name="arearelacionada"  value="No"  onChange={this.handleChange}/>No
          </div>
          <br />
          </div>
      </ModalBody>
      <ModalFooter>
      {/*<button className="boton-azul2" onClick={()=>this.setState({modalInsertar: true})}>Guardar</button>*/}
     {/* <button className="boton-naranja2"  type="submit" onClick={this.validacion}>Siguiente2</button>*/}
     <button className="boton-naranja2" onClick={()=>this.setState({modalInsertar2:true, modalInsertar:false})}>Siguiente</button>
      <button className="boton-azul2" onClick={()=>this.setState({modalInsertar: false})}>Cancelar</button>
      </ModalFooter>
      </Form>
    </Modal>


    <Modal  className='modal-dialog modal-dialog-centered modal-lg' isOpen={this.state.modalEditar}>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalEditar: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Datos Laborales</h1></ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="row contenedor_filtro2">
        <div className="form-group col-md-6">
          <label>Número de documento </label>
          <br />
          <input type="number" pattern="[0-9- ]{8,15}" required  className="form-control"  name="numerodedocumento" onChange={this.handleChange} value={this.state.form && this.state.form.numerodedocumento}/>
          </div>
          <div className="form-group col-md-6">
          <div className="botoneslistadoe">
         <button className="boton-azul2"  onClick={()=>this.filtrarElementos()}>Consultar</button>
        </div>
          </div>
          <div className="datos_de_contacto">
          <div  className="row">
              <div className="form-group col-md-6">
                  <label>Nombres</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="nombres"  onChange={this.handleChange} value={this.state.form && this.state.form.nombres}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Apellidos</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="apellidos"  onChange={this.handleChange}  value={this.state.form && this.state.form.apellidos}/>
                  <br />
              </div>
              </div>
              <div className="row ">
              <div className="form-group col-md-6">
                  <label>Teléfono</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="telefono"  onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Correo Electronico</label>
                  <br />
                  <input type="text" className="form-control" autoComplete="none" name="correo"  onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
              </div>
              </div>
            </div>
         </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>Fecha de registro </label>
          <br />
          <input type="date"  required className="form-control"  autoComplete="none" name="fecharegistro" onChange={this.handleChange} value={this.state.form && this.state.form.fecharegistro}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en este momento? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estatrabajando" required  value="Si" onChange={this.handleChange}/>Si
          <input type="radio" className="botonradio" name="estatrabajando"  value="No" onChange={this.handleChange}/>No
          </div>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Por qué no? </label>
          <br />
          <textarea type="text" className="form-control" autoComplete="none" name="porqueno" onChange={this.handleChange} value={this.state.form && this.state.form.porqueno}/> 
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Nombre de la empresa </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="nombreempresa" onChange={this.handleChange} value={this.state.form && this.state.form.nombreempresa}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Sector de la empresa </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="sectorempresa" onChange={this.handleChange} value={this.state.form && this.state.form.sectorempresa} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="De servicios">De servicios</option>
                  <option value="Industrial">Industrial</option>
                  <option value="De transporte">De transporte</option>
                  <option value="De comercio">De comercio</option>
                  <option value="Financiero"> Financiero</option>
                  <option value="De la constrcción">De la constrcción</option>
                  <option value="Minero y enérgetico">Minero y enérgetico</option>
                  <option value="Solidario">Solidario</option>
                  <option value="De Comunicaciones">De Comunicaciones</option>
                  <option value="De la salud">De la salud</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Cargo </label>
          <br />
          <input type="text" className="form-control" autoComplete="none" name="cargo" onChange={this.handleChange} value={this.state.form && this.state.form.cargo}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Promedio salarial </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="promediosalarial" onChange={this.handleChange} value={this.state.form && this.state.form.promediosalarial} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 1 SMLV">Menos de 1 SMLV</option>
                  <option value="1 SMLV">1 SMLV</option>
                  <option value="2 SMLV">2 SMLV</option>
                  <option value="3 SMLV">3 SMLV</option>
                  <option value="4 SMLV">4 SMLV</option>
                  <option value="5 SMLV">5 SMLV</option>
                  <option value="Más de 5 SMLV">Más de 5 SMLV</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Tipo de contrato </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="tipocontrato" onChange={this.handleChange} value={this.state.form && this.state.form.tipocontrato} aria-label="Default select example">    
          <option value="0" selected="">Seleccione</option>
                  <option value="Contrato a término fijo">Contrato a término fijo</option>
                  <option value="Contrato a término indefinido">Contrato a término indefinido</option>
                  <option value="Contrato de obra o Laboral">Contrato de obra o Laboral</option>
                  <option value="Contrato de aprendizaje">Contrato de aprendizaje</option>
                  <option value="Contrato temporal, ocasional o accidental">Contrato temporal, ocasional o accidental</option>
                  <option value="Contrato civil por prestación de servicios">Contrato civil por prestación de servicios</option>
            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Está conforme con su trabajo o puesto en la empresa donde trabaja? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estaconforme"  value="Si" onChange={this.handleChange}/>Si
          <input type="radio" className="botonradio" name="estaconforme"  value="No" onChange={this.handleChange}/>No
          </div>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Considera que su trabajo es bien remunerado/pagado? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="Si" onChange={this.handleChange} />Si
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="No" onChange={this.handleChange} />No
          </div>
        </div>
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuántas horas semanales labora? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" name="horaslaborales" onChange={this.handleChange} value={this.state.form && this.state.form.horaslaborales} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 36 horas">Menos de 36 horas</option>
                  <option value="36 horas">36 horas</option>
                  <option value="40 horas">40 horas</option>
                  <option value="42 horas">42 horas</option>
                  <option value="45 horas">45 horas</option>
                  <option value="48 horas">48 horas</option>
                  <option value="Más de 48 horas">Más de 48 horas</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuánto tiempo lleva trabajando en la empresa? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="tiempoenempresa" onChange={this.handleChange} value={this.state.form && this.state.form.tiempoenempresa} aria-label="Default select example">    
          <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 6 meses">Menos de 6 meses</option>
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="Más de 5 años">Más de 5 años</option>
            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuál es su modalidad de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none"  name="modalidadtrabajo" onChange={this.handleChange} value={this.state.form && this.state.form.modalidadtrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Teletrabajo autónomo">Teletrabajo autónomo</option>
                  <option value="Teletrabajo suplementario">Teletrabajo suplementario</option>
                  <option value="Teletrabajo móvil">Teletrabajo móvil</option>
                  <option value="Trabajo a domicilio">Trabajo a domicilio</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuál es su horario de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" name="horariotrabajo" onChange={this.handleChange} value={this.state.form && this.state.form.horariotrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="4:00 am - 3:00 pm">4:00 am - 3:00 pm</option>
                  <option value="6:00 am - 6:00 pm">6:00 am - 6:00 pm</option>
                  <option value="7:00 am - 5:00 pm">7:00 am - 5:00 pm</option>
                  <option value="7:00 am - 4:00 pm">7:00 am - 4:00 pm</option>
                  <option value="8:00 am - 5:00 pm">8:00 am - 5:00 pm</option>
                  <option value="8:00 am - 8:00 pm">8:00 am - 8:00 pm</option>
                  <option value="6:00 pm-  6:00 am">6:00 pm-  6:00 am</option>
                  <option value="10:00 pm - 6:00 am">10:00 pm - 6:00 am</option>
                  <option value="">Otro</option>
            </select>
          <br />
          </div>
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en un área que se relacione con lo que estudió? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="arearelacionada"  value="Si" onChange={this.handleChange} />Si
          <input type="radio" className="botonradio" name="arearelacionada"  value="No" onChange={this.handleChange} />No
          </div>
          <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja2" onClick={()=>this.setState({modalEditar2:true, modalEditar:false})}>Siguiente</button>
      <button className="boton-azul2" onClick={()=>this.setState({modalEditar: false})}>Cancelar</button>
      </ModalFooter>
    </Modal>


    <Modal  className='modal-dialog modal-dialog-centered modal-lg' isOpen={this.state.modalVer}>
                    <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalVer: false})}>X</button>
                    </ModalHeader>
      <ModalHeader><h1>Datos Laborales</h1></ModalHeader>
      <ModalBody>
        <div className="form-group">
        <div className="row contenedor_filtro2">
        <div className="form-group col-md-6">
          <label>Número de documento </label>
          <br />
          <input type="number" className="form-control" readOnly name="numerodedocumento" onChange={this.handleChange} value={this.state.form && this.state.form.numerodedocumento}/>
          </div>
          <div className="form-group col-md-6">
          <div className="botoneslistadoe">
         <button className="boton-azul2"  onClick={()=>this.filtrarElementos()}>Consultar</button>
         
        </div>
          </div>
          <div className="datos_de_contacto">
          <div  className="row">
              <div className="form-group col-md-6">
                  <label>Nombres</label>
                  <br />
                  <input type="text" className="form-control" readOnly autoComplete="none" name="nombres" readOnly onChange={this.handleChange} value={this.state.form && this.state.form.nombres}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Apellidos</label>
                  <br />
                  <input type="text" className="form-control" readOnly autoComplete="none" name="apellidos" readOnly onChange={this.handleChange}  value={this.state.form && this.state.form.apellidos}/>
                  <br />
              </div>
              </div>
              <div className="row ">
              <div className="form-group col-md-6">
                  <label>Teléfono</label>
                  <br />
                  <input type="text" className="form-control" readOnly autoComplete="none" name="telefono" readOnly onChange={this.handleChange} value={this.state.form && this.state.form.telefono}/>
                  <br />
              </div>
              <div className="form-group col-md-6">
                  <label>Correo Electronico</label>
                  <br />
                  <input type="text" className="form-control" readOnly autoComplete="none" name="correo"  readOnly  onChange={this.handleChange} value={this.state.form && this.state.form.correo}/>
              </div>
              </div>
            </div>
         </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>Fecha de registro </label>
          <br />
          <input type="date" className="form-control" readOnly autoComplete="none" name="fecharegistro"  value={this.state.form && this.state.form.fecharegistro}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en este momento? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estatrabajando"  value={this.state.form && this.state.form.estatrabajando}/>Si
          <input type="radio" className="botonradio" name="estatrabajando"   value={this.state.form && this.state.form.estatrabajando}/>No
          </div>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Por qué no? </label>
          <br />
          <textarea type="text" className="form-control" readOnly autoComplete="none" name="porqueno" value={this.state.form && this.state.form.porqueno}/>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Nombre de la empresa </label>
          <br />
          <input type="text" className="form-control" readOnly autoComplete="none" name="nombreempresa"  value={this.state.form && this.state.form.nombreempresa}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Sector de la empresa </label>
          <br />
          <select type="text" className="form-control" readOnly  autoComplete="none" name="sectorempresa"  value={this.state.form && this.state.form.sectorempresa} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Agropecuario">Agropecuario</option>
                  <option value="De servicios">De servicios</option>
                  <option value="Industrial">Industrial</option>
                  <option value="De transporte">De transporte</option>
                  <option value="De comercio">De comercio</option>
                  <option value="Financiero"> Financiero</option>
                  <option value="De la constrcción">De la constrcción</option>
                  <option value="Minero y enérgetico">Minero y enérgetico</option>
                  <option value="Solidario">Solidario</option>
                  <option value="De Comunicaciones">De Comunicaciones</option>
                  <option value="De la salud">De la salud</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Cargo </label>
          <br />
          <input type="text" className="form-control" readOnly  autoComplete="none" name="cargo"  value={this.state.form && this.state.form.cargo}/>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>Promedio salarial </label>
          <br />
          <select type="text" className="form-control" readOnly autoComplete="none" name="promediosalarial"  value={this.state.form && this.state.form.promediosalarial} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 1 SMLV">Menos de 1 SMLV</option>
                  <option value="1 SMLV">1 SMLV</option>
                  <option value="2 SMLV">2 SMLV</option>
                  <option value="3 SMLV">3 SMLV</option>
                  <option value="4 SMLV">4 SMLV</option>
                  <option value="5 SMLV">5 SMLV</option>
                  <option value="Más de 5 SMLV">Más de 5 SMLV</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>Tipo de contrato </label>
          <br />
          <select type="text" className="form-control" readOnly autoComplete="none"  name="tipocontrato"  value={this.state.form && this.state.form.tipocontrato} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Contrato a término fijo">Contrato a término fijo</option>
                  <option value="Contrato a término indefinido">Contrato a término indefinido</option>
                  <option value="Contrato de obra o Laboral">Contrato de obra o Laboral</option>
                  <option value="Contrato de aprendizaje">Contrato de aprendizaje</option>
                  <option value="Contrato temporal, ocasional o accidental">Contrato temporal, ocasional o accidental</option>
                  <option value="Contrato civil por prestación de servicios">Contrato civil por prestación de servicios</option>
            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Está conforme con su trabajo o puesto en la empresa donde trabaja? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="estaconforme"  value="Si" />Si
          <input type="radio" className="botonradio" name="estaconforme"  value="No" />No
          <br />
          </div>
          </div>
          <div className="form-group col-md-6">
          <label>¿Considera que su trabajo es bien remunerado/pagado? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="Si" value={this.state.form && this.state.form.trabajobienremunerado}/>Si
          <input type="radio" className="botonradio" name="trabajobienremunerado"  value="No" value={this.state.form && this.state.form.trabajobienremunerado}/>No
          <br />
          </div>
        </div>
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuántas horas semanales labora? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" readOnly  name="horaslaborales"  value={this.state.form && this.state.form.horaslaborales} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 36 horas">Menos de 36 horas</option>
                  <option value="36 horas">36 horas</option>
                  <option value="40 horas">40 horas</option>
                  <option value="42 horas">42 horas</option>
                  <option value="45 horas">45 horas</option>
                  <option value="48 horas">48 horas</option>
                  <option value="Más de 48 horas">Más de 48 horas</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuánto tiempo lleva trabajando en la empresa? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" readOnly  name="tiempoenempresa"  value={this.state.form && this.state.form.tiempoenempresa} aria-label="Default select example">    
          <option value="0" selected="">Seleccione</option>
          <option value="0" selected="">Seleccione</option>
                  <option value="Menos de 6 meses">Menos de 6 meses</option>
                  <option value="1 año">1 año</option>
                  <option value="2 años">2 años</option>
                  <option value="3 años">3 años</option>
                  <option value="Más de 5 años">Más de 5 años</option>
            </select>
          <br />
          </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
          <label>¿Cuál es su modalidad de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" readOnly  name="modalidadtrabajo"  value={this.state.form && this.state.form.modalidadtrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="Teletrabajo autónomo">Teletrabajo autónomo</option>
                  <option value="Teletrabajo suplementario">Teletrabajo suplementario</option>
                  <option value="Teletrabajo móvil">Teletrabajo móvil</option>
                  <option value="Trabajo a domicilio">Trabajo a domicilio</option>
            </select>
          <br />
          </div>
          <div className="form-group col-md-6">
          <label>¿Cuál es su horario de trabajo? </label>
          <br />
          <select type="text" className="form-control" autoComplete="none" readOnly  name="horariotrabajo"  value={this.state.form && this.state.form.horariotrabajo} aria-label="Default select example">    
                  <option value="0" selected="">Seleccione</option>
                  <option value="4:00 am - 3:00 pm">4:00 am - 3:00 pm</option>
                  <option value="6:00 am - 6:00 pm">6:00 am - 6:00 pm</option>
                  <option value="7:00 am - 5:00 pm">7:00 am - 5:00 pm</option>
                  <option value="7:00 am - 4:00 pm">7:00 am - 4:00 pm</option>
                  <option value="8:00 am - 5:00 pm">8:00 am - 5:00 pm</option>
                  <option value="8:00 am - 8:00 pm">8:00 am - 8:00 pm</option>
                  <option value="6:00 pm-  6:00 am">6:00 pm-  6:00 am</option>
                  <option value="10:00 pm - 6:00 am">10:00 pm - 6:00 am</option>
                  <option value="">Otro</option>
            </select>
          <br />
          </div>
          </div>
          <div className="form-group col-md-6">
          <label>¿Está trabajando en un área que se relacione con lo que estudió? </label>
          <br />
          <div className="botonesradio">
          <input type="radio" className="botonradio" name="arearelacionada"  value="Si" value={this.state.form && this.state.form.arearelacionada}/>Si
          <input type="radio" className="botonradio" name="arearelacionada"  value="No" value={this.state.form && this.state.form.arearelacionada}/>No
          </div>
          <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>  
      <button className="boton-naranja" onClick={()=>this.setState({modalVer2:true, modalVer:false})}>Siguiente</button>
      <button className="boton-azul" onClick={()=>this.setState({modalVer: false})}>Cerrar</button>
      </ModalFooter>
    </Modal>


    <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalInsertar2}>
      <Form>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalInsertar2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Registrar Otros Estudios</h1></ModalHeader>
      <ModalBody>
      <div className="form-group">
        <div className="row ">
          <div className="form-group col-md-6">
              <label>¿Está estudiando actualmente? </label>
              <br />
              <div className="botonesradio">
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta" required  value="Si" onChange={this.handleChange}/>Si
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta"  value="No" onChange={this.handleChange} />No
              </div>
              <br />
          </div>
          <div className="form-group col-md-6">
            <label>¿Qué está estudiando? </label>
            <br />
            <input type="text" className="form-control"  autoComplete="none" name="estudioactual" onChange={this.handleChange} value={this.state.form && this.state.form.estudioactual}/>
            <br />
            </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
            <label>¿Dónde está estudiando? </label>
            <br />
            <input type="text" className="form-control"  autoComplete="none" name="donde"  onChange={this.handleChange} value={this.state.form && this.state.form.donde}/>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label>Tipo de estudio</label>
            <br />
            <select type="text" className="form-control" autoComplete="none" name="tipodeestudio" onChange={this.handleChange} value={this.state.form && this.state.form.tipodeestudio} aria-label="Default select example">    
                    <option value="0" selected="">Seleccione</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Pregrado">Pregrado</option>
                    <option value="Posgrado">Posgrado</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Diplomado">Diplomado</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Otro">Otro</option>
              </select>
            <br />
          </div>  
          </div>         
          <div className="row ">
          <div className="form-group col-md-6">
            <label>Fecha de inicio </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" name="fechadeinicio" onChange={this.handleChange} value={this.state.form && this.state.form.fechadeinicio}/>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label>Fecha de finalización </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" name="fechadefinalizacion" onChange={this.handleChange} value={this.state.form && this.state.form.fechadefinalizacion}/>
            <br />
          </div>
          </div>  
          <div className="form-group col-md-6">
            <label>Observaciones </label>
            <br />
            <textarea type="text" className="form-control" required autoComplete="none" name="observaciones" onChange={this.handleChange} value={this.state.form && this.state.form.observaciones}/>
            <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalInsertar2: false, modalInsertar: true})}>Anterior</button>
      <button className="boton-azul" onClick={()=>this.peticionPost({modalInsertar2: false})}>Insertar</button>{"   "}
      </ModalFooter>
      </Form>
    </Modal>


    <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalEditar2}>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalEditar2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Editar Otros Estudios</h1></ModalHeader>
      <ModalBody>
      <div className="form-group">
        <div className="row ">
          <div className="form-group col-md-6">
              <label>¿Está estudiando actualmente? </label>
              <br />
              <div className="botonesradio">
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta"  required value="Si" onChange={this.handleChange} />Si
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta"  value="No" onChange={this.handleChange} />No
              </div>
              <br />
          </div>
          <div className="form-group col-md-6">
            <label>¿Qué está estudiando? </label>
            <br />
            <input type="text" className="form-control"  autoComplete="none" name="estudioactual"  onChange={this.handleChange}  value={this.state.form && this.state.form.estudioactual}/>
            <br />
            </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
            <label>¿Dónde está estudiando? </label>
            <br />
            <input type="text" className="form-control"  autoComplete="none" name="donde" onChange={this.handleChange} value={this.state.form && this.state.form.donde}/>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label>Tipo de estudio</label>
            <br />
            <select type="text" className="form-control" autoComplete="none" name="tipodeestudio" onChange={this.handleChange} value={this.state.form && this.state.form.tipodeestudio} aria-label="Default select example">    
            <option value="0" selected="">Seleccione</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Pregrado">Pregrado</option>
                    <option value="Posgrado">Posgrado</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Diplomado">Diplomado</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Otro">Otro</option>
              </select>
            <br />
          </div>          
        </div>
        <div className="row ">
          <div className="form-group col-md-6">
            <label>Fecha de inicio </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" name="fechadeinicio" onChange={this.handleChange} value={this.state.form && this.state.form.fechadeinicio}/>
            <br />
          </div>

          <div className="form-group col-md-6">
            <label>Fecha de finalización </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" name="fechadefinalizacion" onChange={this.handleChange} value={this.state.form && this.state.form.fechadefinalizacion}/>
            <br />
          </div>
          </div>
          <div className="form-group col-md-6">
            <label>Observaciones </label>
            <br />
            <textarea type="text" className="form-control" required autoComplete="none" name="observaciones" onChange={this.handleChange} value={this.state.form && this.state.form.observaciones}/>
            <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalEditar2: false, modalEditar: true})}>Anterior</button>
        <button className="boton-azul" onClick={()=>this.peticionPut({modalEditar2: false})}>Guardar</button>{"   "}
      </ModalFooter>
    </Modal>


    <Modal className="modal-dialog modal-dialog-centered modal-lg" isOpen={this.state.modalVer2}>
                      <ModalHeader className="espacio-boton-x-formularios">
                      <button className="boton-cerrar-x-formularios" onClick={()=>this.setState({modalVer2: false})}>X</button>
                      </ModalHeader>
      <ModalHeader><h1>Ver Otros Estudios</h1></ModalHeader>
      <ModalBody>
      <div className="form-group">
        <div className="row ">
          <div className="form-group col-md-6">
              <label>¿Está estudiando actualmente? </label>
              <br />
              <div className="botonesradio">
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta"  value="Si" value={this.state.form && this.state.form.estudiaactualmentepregunta} />Si
                <input type="radio" className="botonradio" name="estudiaactualmentepregunta"  value="No" value={this.state.form && this.state.form.estudiaactualmentepregunta} />No
              </div>
              <br />
          </div>
          <div className="form-group col-md-6">
            <label>¿Qué está estudiando? </label>
            <br />
            <input type="text" className="form-control" readOnly  autoComplete="none" name="estudioactual"  value={this.state.form && this.state.form.estudioactual}/>
            <br />
            </div>
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
            <label>¿Dónde está estudiando? </label>
            <br />
            <input type="text" className="form-control" readOnly autoComplete="none" name="donde"  value={this.state.form && this.state.form.donde}/>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label>Tipo de estudio</label>
            <br />
            <select type="text" className="form-control" readOnly autoComplete="none" name="tipodeestudio"  value={this.state.form && this.state.form.tipodeestudio}  aria-label="Default select example">    
            <option value="0" selected="">Seleccione</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Pregrado">Pregrado</option>
                    <option value="Posgrado">Posgrado</option>
                    <option value="Maestría">Maestría</option>
                    <option value="Especialización">Especialización</option>
                    <option value="Diplomado">Diplomado</option>
                    <option value="Doctorado">Doctorado</option>
                    <option value="Otro">Otro</option>
              </select>
            <br />
          </div>          
          </div>
          <div className="row ">
          <div className="form-group col-md-6">
            <label>Fecha de inicio </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" readOnly name="fechadeinicio"  value={this.state.form && this.state.form.fechadeinicio}/>
            <br />
          </div>
          <div className="form-group col-md-6">
            <label>Fecha de finalización </label>
            <br />
            <input type="date" autoComplete="none" className="form-control" readOnly name="fechadefinalizacion"  value={this.state.form && this.state.form.fechadefinalizacion}/>
            <br />
          </div>
          </div>
          <div className="form-group col-md-6">
            <label>Observaciones </label>
            <br />
            <textarea type="text" className="form-control" autoComplete="none" readOnly name="observaciones"  value={this.state.form && this.state.form.observaciones}/>
            <br />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
      <button className="boton-naranja" onClick={()=>this.setState({modalVer2: false, modalVer: true})}>Anterior</button>
      <button className="boton-azul"onClick={()=>this.setState({modalVer2: false})}>Cerrar</button>
      </ModalFooter>
    </Modal>
   
      </div>
      </container-fluid>
    );
  }
}

export default CrudSeguimiento;