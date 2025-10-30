import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './seccion.css';

export const Seccion = ({ children, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Efecto slider con transiciones más marcadas
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.5, 0.9, 1], [0.8, 1, 1, 1, 0.8]);
  const translateY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{
        opacity,
        scale,
        y: translateY,
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
      className="seccion"
    >
      <div className="seccion-contenido">
        {children}
      </div>
    </motion.section>
  );
};