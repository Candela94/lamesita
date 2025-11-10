import './landing.css'
import '../../css/App.css'

import Introduccion from '../intro/Introduccion';
import Info from '../info/Info';
import About from '../about/About';
import CajasSection from '../cajas/Cajas';
import Galeria from '../../component/galeria/Galeria';
import { Seccion } from '../../component/seccion/Seccion';
import { Header, HeaderDesk } from '../../component/header/Header';

const Landing = () => {

  const secciones = [
    { id: 'intro', componente: <Introduccion /> },
    { id: 'about', componente: <About /> },
    { id: 'galeria', componente: <Galeria /> },
    { id: 'cajas', componente: <CajasSection /> },
    { id: 'info', componente: <Info /> },
  ];

  return (
    <>
      <Header className='h-mobile' />
      <HeaderDesk className='h-desk' />

      <main className='main-principal'>
        <div style={{ height: `${secciones.length * 100}vh` }}>
          {secciones.map((seccion, index) => (
            <Seccion
              key={seccion.id}
              id={seccion.id}
              index={index}
              totalSections={secciones.length}
              scrollable={true} // si alguna sección necesita scroll interno
            >
              {seccion.componente}
            </Seccion>
          ))}
        </div>
      </main>
    </>
  );
};

export default Landing;
