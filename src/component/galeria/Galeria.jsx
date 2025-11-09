import './galeria.css'
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { imagenesMercado } from '../../../data/cajas';

const Galeria = () => {
  const [indiceActual, setIndiceActual] = useState(1);
  const scrollContainerRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // Crear array extendido con clones
  const imagenesExtendidas = [
    imagenesMercado[imagenesMercado.length - 1],
    ...imagenesMercado,
    imagenesMercado[0]
  ];

  const scrollToIndex = (idx, smooth = true) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        left: idx * container.offsetWidth,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  // Inicializar posición
  useEffect(() => {
    scrollToIndex(1, false);
  }, []);

  // Manejar el evento scrollend (cuando el scroll termina completamente)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollEnd = () => {
      if (isTransitioningRef.current) return;

      const scrollPos = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const currentIndex = Math.round(scrollPos / itemWidth);

      // Si estamos en el clon de la última (índice 0)
      if (currentIndex === 0) {
        isTransitioningRef.current = true;
        setIndiceActual(imagenesMercado.length);
        requestAnimationFrame(() => {
          scrollToIndex(imagenesMercado.length, false);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 50);
        });
      }
      // Si estamos en el clon de la primera (último índice)
      else if (currentIndex === imagenesExtendidas.length - 1) {
        isTransitioningRef.current = true;
        setIndiceActual(1);
        requestAnimationFrame(() => {
          scrollToIndex(1, false);
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 50);
        });
      }
      // Actualizar índice normal
      else if (currentIndex !== indiceActual) {
        setIndiceActual(currentIndex);
      }
    };

    container.addEventListener('scrollend', handleScrollEnd);
    
    return () => {
      container.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [indiceActual, imagenesExtendidas.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;
      
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [indiceActual]);

  const goNext = () => {
    if (isTransitioningRef.current) return;
    const nuevoIndice = indiceActual + 1;
    setIndiceActual(nuevoIndice);
    scrollToIndex(nuevoIndice);
  };

  const goPrev = () => {
    if (isTransitioningRef.current) return;
    const nuevoIndice = indiceActual - 1;
    setIndiceActual(nuevoIndice);
    scrollToIndex(nuevoIndice);
  };

  // Calcular índice real para los indicadores y fondo
  const getIndiceReal = () => {
    if (indiceActual === 0) return imagenesMercado.length - 1;
    if (indiceActual === imagenesExtendidas.length - 1) return 0;
    return indiceActual - 1;
  };

  const indiceReal = getIndiceReal();

  return (
    <section className="galeria-dinamica">
      <motion.div
        key={indiceReal}
        className="fondo-dinamico"
        style={{ backgroundImage: `url(${imagenesMercado[indiceReal]})` }}
        initial={{ opacity: 1, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div 
        ref={scrollContainerRef}
        className="scroll-container"
      >
        {imagenesExtendidas.map((src, id) => (
          <div
            key={id}
            className="imagen-wrapper"
          >
            <img src={src} alt={`mercado-${id}`} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Flechas para escritorio */}
      <div className="flechas-navegacion">
        <button onClick={goPrev}>‹</button>
        <button onClick={goNext}>›</button>
      </div>

      {/* Indicadores */}
      <div className="indicadores">
        {imagenesMercado.map((_, idx) => (
          <button
            key={idx}
            className={`indicador ${idx === indiceReal ? 'activo' : ''}`}
            onClick={() => {
              if (isTransitioningRef.current) return;
              setIndiceActual(idx + 1);
              scrollToIndex(idx + 1);
            }}
            aria-label={`Ir a imagen ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Galeria;