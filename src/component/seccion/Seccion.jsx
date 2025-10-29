import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './seccion.css';

export const Seccion = ({ children }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // La sección se desvanece más rápido después de pasar el punto medio
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.8, 1, 1, 0.9]);
  const translateY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [15, 0, 0, -20]);

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