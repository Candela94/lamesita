import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './seccion.css';

export const Seccion = ({ children, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Escala de pequeño a grande cuando entra
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.8, 1, 1]
  );

  // Opacidad
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 1]
  );

  return (
    <motion.section
      id={id}
      ref={ref}
      className="seccion"
      style={{
        scale,
        opacity
      }}
    >
      <div className="seccion-contenido">
        {children}
      </div>
    </motion.section>
  );
};