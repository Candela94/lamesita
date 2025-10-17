

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
            <Seccion><Introduccion /></Seccion>
            <main className='main-contenido'>

             
                <Seccion><About /></Seccion>
                <Seccion><Galeria/></Seccion>
                <Seccion><Info /></Seccion>
               
                <Seccion><CajasSection /></Seccion>

            </main>
        </>
    );
}

export default Landing;