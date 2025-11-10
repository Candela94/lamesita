import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Seccion = ({ 
  children, 
  id, 
  index = 0, 
  maxHeight = 'none',
  scrollable = false 
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduce el movimiento vertical para que estén más juntas
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 1, 1, 0.3]);
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.5, 0.8, 1], 
    [0.9, 1, 1, 0.9]
  );

  return (
    <div 
      className='section' 
      ref={ref} 
      style={{ 
        position: 'relative',
        marginBottom: '-50px', // Overlap negativo para juntar secciones
      }}
    >
      <motion.section
        id={id}
        style={{
          y,
          opacity,
          scale,
          width: '100%',
          maxHeight: scrollable ? maxHeight : 'none',
          overflowY: scrollable ? 'auto' : 'visible',
        }}
      >
        {children}
      </motion.section>
    </div>
  );
};