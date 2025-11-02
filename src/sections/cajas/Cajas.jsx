import './cajas.css'
import { cajas } from '../../../data/cajas';



import { CajasContainer } from '../../component/cajas-container/CajasContainer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'



const CajasSection = ({id}) => {
    const [cajaAbierta, setCajaAbierta] = useState(null);

    const handleToggle = (id) => {
        setCajaAbierta(prev => prev === id ? null : id);
    };

    // Separar las cajas normales de la personalizada
    const cajasNormales = cajas.filter(c => c.nombre !== 'HAZ TU PROPIA CAJITA');
    const cajaPersonalizada = cajas.find(c => c.nombre === 'HAZ TU PROPIA CAJITA');



    return (
        <>
            <section id={id} className="section section-cajas">
               
                    <h1 className='titulo-cajas'>LO JUSTO <br />PARA UN GRAN <br/> MOMENTO</h1>
            

                <p className="texto">Pequeños momentos para disfrutar sin complicaciones.<br/> <strong>Cada cajita está pensada para compartir, regalar o darse un capricho con productos seleccionados de nuestra tienda.</strong><br/> Combina sabores, abre una botella y deja que lo simple vuelva a ser especial.</p>

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