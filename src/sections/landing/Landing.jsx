

import './landing.css'
import '../../css/App.css'
import Introduccion from '../intro/Introduccion';

import Info from '../info/Info';
import About from '../about/About';
import CajasSection from '../cajas/Cajas';
import Galeria from '../../component/galeria/Galeria';

import {Seccion} from '../../component/seccion/Seccion';
import { Contacto } from '../../component/cards/Cards';


const Landing = () => {

    return (

        <>
           <Introduccion />
           <About />
           <Galeria />
           <Info />
           <CajasSection />

             
                {/* <Seccion><About /></Seccion>
                <Seccion><Galeria/></Seccion>
                <Seccion><Info /></Seccion>
               
                <Seccion><CajasSection /></Seccion> */}


           
        </>
    );
}

export default Landing;