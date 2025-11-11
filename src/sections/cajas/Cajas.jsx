import './cajas.css'
import { cajas } from '../../../data/cajas';


import { CajasContainer } from '../../component/cajas-container/CajasContainer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import SplitText from '../../component/splitText/SplitText';



const CajasSection = ({ id }) => {
    const [cajaAbierta, setCajaAbierta] = useState(null);


    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };

    const handleToggle = (id) => {
        setCajaAbierta(prev => prev === id ? null : id);
    };

    // Separar las cajas normales de la personalizada
    const cajasNormales = cajas.filter(c => c.nombre !== 'HAZ TU PROPIA CAJITA');
    const cajaPersonalizada = cajas.find(c => c.nombre === 'HAZ TU PROPIA CAJITA');



    return (
        <>
            <section id={id} className="section section-cajas">

            <h1 className="titulo-cajas">
  <SplitText
    text={`LO JUSTO \nPARA UN GRAN \nMOMENTO`}
    delay={0}                // un poco más de tiempo entre letras
    duration={1}              // cada letra tarda más en aparecer
    ease="power2.out"         // suaviza la curva del fade
    splitType="chars"
    from={{ opacity: 0, scale: 0.8 }}
    to={{ opacity: 1, scale:1 }}
    threshold={0.1}
    rootMargin="-100px"
    textAlign="start"
    onLetterAnimationComplete={handleAnimationComplete}
    initialDelay={400}
  />
</h1>




                <SplitText
                    tag="p"
                    className="texto"
                    text={
                        <>
                            Pequeños momentos para disfrutar sin complicaciones.
                            {'\n'}
                            <strong>
                                Cada cajita está pensada para compartir, regalar o darse un capricho con
                                productos seleccionados de nuestra tienda.
                            </strong>
                            {'\n'}
                            Combina sabores, abre una botella y deja que lo simple vuelva a ser especial.
                        </>
                    }
                    delay={0}
                    duration={1}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, scale: 0.8  }}
                    to={{ opacity: 1, scale: 1 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="start"
                    initialDelay={700}
                />

                <div className="galeria">
                    <AnimatePresence>
                        {/* Primero las 3 cajas normales */}
                        {cajasNormales.map((c, i) => (
                            <li
                                key={`normal-${i}`}
                                className="cajas-li"
                                style={{ zIndex: i }}
                            >
                                <CajasContainer
                                    caja={c}
                                    isOpen={cajaAbierta === i}
                                    onToggle={() => handleToggle(i)}
                                />
                            </li>
                        ))}

                        {/* Después la caja personalizada */}
                        {cajaPersonalizada && (
                            <li
                                key="personalizada"
                                className="cajas-li"
                                style={{ zIndex: cajasNormales.length }}
                            >
                                <CajasContainer
                                    caja={cajaPersonalizada}
                                    isOpen={cajaAbierta === cajasNormales.length}
                                    onToggle={() => handleToggle(cajasNormales.length)}
                                />
                            </li>
                        )}
                    </AnimatePresence>
                </div>

                {/* <Contacto /> */}
            </section>
        </>
    );
}

export default CajasSection;