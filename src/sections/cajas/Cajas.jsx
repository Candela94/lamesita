import './cajas.css';
import { cajas } from '../../../data/cajas';
import { CajasContainer } from '../../component/cajas-container/CajasContainer';
import { useState, memo } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplitText from '../../component/splitText/SplitText';

// 🧠 Título estático: no se vuelve a renderizar nunca
const TituloCajas = memo(() => {
  console.log('Renderizando TituloCajas una vez ✅');

  return (
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
  );
});

// 🧠 Texto también fijo
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

  const handleToggle = (id) => {
    setCajaAbierta((prev) => (prev === id ? null : id));
  };

  // Filtramos las cajas
  const cajasNormales = cajas.filter((c) => c.nombre !== 'HAZ TU PROPIA CAJITA');
  const cajaPersonalizada = cajas.find((c) => c.nombre === 'HAZ TU PROPIA CAJITA');

  return (
    <section id={id} className="section section-cajas">
      {/* 🚫 SplitText está fuera del flujo reactivo */}
      <TituloCajas />
      <TextoCajas />

      <div className="galeria">
        <AnimatePresence>
          {cajasNormales.map((c, i) => (
            <li key={`normal-${i}`} className="cajas-li" style={{ zIndex: i }}>
              <CajasContainer
                caja={c}
                isOpen={cajaAbierta === i}
                onToggle={() => handleToggle(i)}
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
                onToggle={() => handleToggle(cajasNormales.length)}
              />
            </li>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// 🚀 memo para evitar re-renders del propio CajasSection
export default memo(CajasSection);
