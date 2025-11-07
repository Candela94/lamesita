

import './landing.css'
import '../../css/App.css'
import Introduccion from '../intro/Introduccion';

import Info from '../info/Info';
import About from '../about/About';
import CajasSection from '../cajas/Cajas';
import Galeria from '../../component/galeria/Galeria';

import {Seccion} from '../../component/seccion/Seccion';
import { Header, HeaderDesk } from '../../component/header/Header';
import Datos from '../datos/Datos';


const Landing = () => {

    return (


        <>
       

       
        <Header className='h-mobile'/>
        <HeaderDesk className='h-desk'/>

        
        <main className='section main-principal'>
         <Seccion><Introduccion id='intro' /></Seccion>
           <Seccion><About id='about'/></Seccion>
          <Seccion> <Galeria  id='galeria'/></Seccion>
         
          <Seccion> <CajasSection id='cajas'/></Seccion>
          <Seccion> <Info id='info'/> </Seccion>








           
        </main>
        
        </>
    );
}

export default Landing;