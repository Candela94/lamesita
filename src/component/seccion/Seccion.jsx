import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './seccion.css'

export const Seccion = ({ children, index = 0 }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // La sección se va "pegando" arriba mientras scrolleas
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <motion.section 
      ref={ref} 
      style={{ y, scale, opacity }} 
      className="seccion"
    >
      <div className="seccion-contenido">
        {children}
      </div>
    </motion.section>
  );
};