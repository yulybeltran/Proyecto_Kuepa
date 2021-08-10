import './Footer.css';
import logofooter from '../../assets/img/logokuepa.png';
import * as FaIcons from 'react-icons/fa';

function Footer () {
    return (
            <div className="row contenedor-footer">
                <div className="col-sm-12 col-md-9 col-lg-9 logofooter">
                    <img src={logofooter}/>
                </div>	 

                <div className="col-sm-12 col-md-3 col-lg-3 derechos-autor">
                    <p>CopyRight&copy; Kuepa 2021 </p>
               </div>	
            </div>
    );
  } 
  export default Footer;
