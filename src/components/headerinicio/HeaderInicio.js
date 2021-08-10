import './HeaderInicio.css';
import logo from '../../assets/img/logokuepa.png';
import * as FaIcons from 'react-icons/fa';

function HeaderInicio () {
    return (
            <div className="row contenedor-headerinicio">
                <div className="col-sm-12 col-md-12 col-lg-12 logoheaderinicio">
                    <img src={logo}/>
                </div>	
            </div>
    );
  } 
  export default HeaderInicio;