import './galeria.css'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { imagenesMercado } from '../../../data/cajas';




const Galeria = () => {


  const [indiceActual, setIndiceActual] = useState(0);
  const scrollContainerRef = useRef(null);






  const scrollToIndex = (idx) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        left: idx * container.offsetWidth,
        behavior: 'smooth',
      });
    }
  };
  


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [indiceActual]); // importante para que tenga el índice actualizado
  



  const goNext = () => {
    const nuevoIndice = (indiceActual + 1) % imagenesMercado.length;
    setIndiceActual(nuevoIndice);
    scrollToIndex(nuevoIndice);
  };
  
  const goPrev = () => {
    const nuevoIndice = (indiceActual - 1 + imagenesMercado.length) % imagenesMercado.length;
    setIndiceActual(nuevoIndice);
    scrollToIndex(nuevoIndice);
  };
  

  // Detectar scroll manual
  
  const handleScroll = () => {


    if (scrollContainerRef.current) {

      const container = scrollContainerRef.current;
      const scrollPos = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const newIndex = Math.round(scrollPos / itemWidth);
      
      if (newIndex !== indiceActual) {
        setIndiceActual(newIndex);
      }
    }



  };

  // El fondo es la imagen anterior (o la última si estamos en la primera)
  const indiceFondo = indiceActual === 0 ? imagenesMercado.length - 1 : indiceActual - 1;




  return (


    <section className="galeria-dinamica">
      <motion.div
        key={indiceFondo}
        className="fondo-dinamico"
        style={{ backgroundImage: `url(${imagenesMercado[indiceFondo]})` }}
        initial={{ opacity: 1, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}



      />

      <div 

        ref={scrollContainerRef}
        className="scroll-container"
        onScroll={handleScroll}
      >
        {imagenesMercado.map((src, id) => (

          <div
            key={id}
            className="imagen-wrapper"
          >
            <img src={src} alt={`mercado-${id}`} loading="lazy" />
          </div>
        ))}
      </div>

     
{/* 🔁 Flechas para escritorio */}
<div className="flechas-navegacion">
  <button onClick={goPrev}>‹</button>
  <button onClick={goNext}>›</button>
</div>



     {/* Indicadores */}
     <div className="indicadores">
        {imagenesMercado.map((_, idx) => (
          <button
            key={idx}
            className={`indicador ${idx === indiceActual ? 'activo' : ''}`}
            onClick={() => {
              setIndiceActual(idx);
              if (scrollContainerRef.current) {
                const container = scrollContainerRef.current;
                container.scrollTo({
                  left: idx * container.offsetWidth,
                  behavior: 'smooth'
                })
              }
            }}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Galeria;