import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './seccion.css';

export const Seccion = ({ children }) => {
  const ref = useRef(null);

  // Trackea el progreso del scroll dentro del elemento
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]  // Empieza cuando entra al viewport y termina cuando sale
  });

  // Transiciones para la opacidad, escala y posición vertical
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <motion.section
      ref={ref}
      style={{
        opacity,
        scale,
        y: translateY,
      }}
      className="seccion"
    >
      <div className="seccion-contenido">
        {children}
      </div>
    </motion.section>
  );
};
