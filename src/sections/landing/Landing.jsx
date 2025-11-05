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
                <Seccion id='intro'>
                    <Introduccion />
                </Seccion>

                <Seccion id='about'>
                    <About />
                </Seccion>

                <Seccion id='galeria'>
                    <Galeria />
                </Seccion>
                
                <Seccion id='cajas'>
                    <CajasSection />
                </Seccion>

                <Seccion id='info'>
                    <Info />
                </Seccion>
            </main>
        </>
    );
}

export default Landing;