

import './landing.css'
import '../../css/App.css'
import Introduccion from '../intro/Introduccion';

import Info from '../info/Info';
import About from '../about/About';
import CajasSection from '../cajas/Cajas';
import Galeria from '../../component/galeria/Galeria';

import {Seccion} from '../../component/seccion/Seccion';


const Landing = () => {

    return (

        <div className='section'>
           <Seccion id='inicio'> <Introduccion /></Seccion>
           {/* <About />
           <Galeria />
           <Info />
           <CajasSection /> */}

             
                <Seccion id='about'><About /></Seccion>
                <Seccion id='galeria'><Galeria/></Seccion>
               
               
                <Seccion id='cajas'><CajasSection /></Seccion>
                <Seccion id='info'><Info /></Seccion>


           
        </div>
    );
}

export default Landing;