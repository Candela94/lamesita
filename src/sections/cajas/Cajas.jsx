import './cajas.css'
import { cajas } from '../../../data/cajas';



import { CajasContainer } from '../../component/cajas-container/CajasContainer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { Contacto } from '../../component/cards/Cards';



const CajasSection = () => {
    const [cajaAbierta, setCajaAbierta] = useState(null);

    const handleToggle = (id) => {
        setCajaAbierta(prev => prev === id ? null : id);
    };

    // Separar las cajas normales de la personalizada
    const cajasNormales = cajas.filter(c => c.nombre !== 'HAZ TU PROPIA CAJITA');
    const cajaPersonalizada = cajas.find(c => c.nombre === 'HAZ TU PROPIA CAJITA');

    return (
        <>
            <section className="section section-cajas">
                <div className="texto-cajas">
                    <h1 className='titulo-cajas'>LO JUSTO PARA UN GRAN MOMENTO</h1>
                </div>

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