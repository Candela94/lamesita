

import './landing.css'
import '../../css/App.css'
import Introduccion from '../intro/Introduccion';

import Info from '../info/Info';
import About from '../about/About';
import { Cajas } from '../../component/cards/Cards';
import CajasSection from '../cajas/Cajas';




const Landing = () => {

    return (

        <>
            <Introduccion />
            <main className='main-contenido'>

             
                <About />
                {/* <Cajas /> */}
                <Info />
                <CajasSection />

            </main>
        </>
    );
}

export default Landing;