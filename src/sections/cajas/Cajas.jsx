import './cajas.css';
import { cajas } from '../../../data/cajas';
import { CajasContainer } from '../../component/cajas-container/CajasContainer';
import { useState, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SplitText from '../../component/splitText/SplitText';

const TituloCajas = memo(() => (
  <h1 className="titulo-cajas">
    <SplitText
      text={`LO JUSTO \nPARA UN GRAN \nMOMENTO`}
      delay={0}
      duration={1}
      ease="power2.out"
      splitType="chars"
      from={{ opacity: 0, scale: 0.8 }}
      to={{ opacity: 1, scale: 1 }}
      threshold={0.1}
      rootMargin="-100px"
      textAlign="start"
      initialDelay={400}
    />
  </h1>
));

const TextoCajas = memo(() => (
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
    from={{ opacity: 0, scale: 0.8 }}
    to={{ opacity: 1, scale: 1 }}
    threshold={0.1}
    rootMargin="-100px"
    textAlign="start"
    initialDelay={700}
  />
));

const CajasSection = ({ id }) => {
  const [cajaAbierta, setCajaAbierta] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleToggleCaja = (id) => {
    setCajaAbierta((prev) => (prev === id ? null : id));
  };

  const cajasNormales = cajas.filter((c) => c.nombre !== 'HAZ TU PROPIA CAJITA');
  const cajaPersonalizada = cajas.find((c) => c.nombre === 'HAZ TU PROPIA CAJITA');

  return (
    <section id={id} className="section section-cajas">
      <TituloCajas />

      <div className="texto-ver-imagen">
        <TextoCajas />

        <button
          className="btn-ver-imagen"
          onClick={() => setOverlayVisible(true)}
        >
          VER CAJITA
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            className="overlay-caja"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOverlayVisible(false)}
          >
            <motion.div
              className="overlay-imagen-wrapper"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="overlay-cerrar"
                onClick={() => setOverlayVisible(false)}
              >
                ×
              </button>

              <img src="/img/CAJAS.png" alt="CAJA" className="overlay-imagen" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="galeria">
        <AnimatePresence>
          {cajasNormales.map((c, i) => (
            <li key={`normal-${i}`} className="cajas-li" style={{ zIndex: i }}>
              <CajasContainer
                caja={c}
                isOpen={cajaAbierta === i}
                onToggle={() => handleToggleCaja(i)}
              />
            </li>
          ))}

          {cajaPersonalizada && (
            <li
              key="personalizada"
              className="cajas-li"
              style={{ zIndex: cajasNormales.length }}
            >
              <CajasContainer
                caja={cajaPersonalizada}
                isOpen={cajaAbierta === cajasNormales.length}
                onToggle={() => handleToggleCaja(cajasNormales.length)}
              />
            </li>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default memo(CajasSection);
