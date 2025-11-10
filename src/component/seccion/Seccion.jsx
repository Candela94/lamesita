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
        minHeight: '100vh', // Altura mínima de viewport completo
        width: '100%', // Ancho completo
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.section
        id={id}
        style={{
          y,
          opacity,
          scale,
          width: '100%',
          height: scrollable ? maxHeight : '100%',
          maxHeight: scrollable ? maxHeight : 'none',
          overflowY: scrollable ? 'auto' : 'visible',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </motion.section>
    </div>
  );
};