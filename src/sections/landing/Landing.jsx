

import './landing.css'
import '../../css/App.css'
import Introduccion from '../intro/Introduccion';

import Info from '../info/Info';
import About from '../about/About';
import CajasSection from '../cajas/Cajas';
import Galeria from '../../component/galeria/Galeria';

import {Seccion} from '../../component/seccion/Seccion';
import { Header } from '../../component/header/Header';


const Landing = () => {

    return (


        <>
       
        <Header />

        
        <main className='section main-principal'>
        <Introduccion />
           <About id='about'/>
           <Galeria  id='galeria'/>
         
           <CajasSection id='cajas'/>
           <Info id='info'/>

             



           
        </main>
        </>
    );
}

export default Landing;