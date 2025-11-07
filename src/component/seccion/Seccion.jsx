import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './seccion.css';

export const Seccion = ({ children, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });



  return (
    <motion.section
      id={id}
      ref={ref}
      className="seccion"
    
    >
      <div className="seccion-contenido">
        {children}
      </div>
    </motion.section>
  );
};