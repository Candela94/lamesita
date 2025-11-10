import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const Seccion = ({ 
  children, 
  id, 
  index = 0, 
  maxHeight = 'none',
  scrollable = false,
  totalSections = 1 // Necesario para calcular el efecto
}) => {
  const ref = useRef(null);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight);
    };
    
    updateVh();
    window.addEventListener('resize', updateVh);
    window.addEventListener('orientationchange', updateVh);
    
    return () => {
      window.removeEventListener('resize', updateVh);
      window.removeEventListener('orientationchange', updateVh);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Efecto de slide: cada sección se mueve hacia arriba y desaparece
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, -vh * 0.3] // Se mueve hacia arriba al hacer scroll
  );
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.5, 0.9, 1], 
    [1, 1, 0.5, 0] // Desaparece al final
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [0, 1], 
    [1, 0.95] // Reduce ligeramente el tamaño
  );

  return (
    <div 
      className='section' 
      ref={ref} 
      style={{ 
        position: 'sticky', // STICKY en vez de relative
        top: 0,
        minHeight: vh ? `${vh}px` : '100vh',
        height: vh ? `${vh}px` : '100vh',
        width: '100%',
        zIndex: totalSections - index, // Las primeras secciones tienen mayor z-index
      }}
    >
 <motion.section
  id={id}
  style={{
    opacity,
    scale,
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }}
>
  <motion.div
    style={{
      y: useTransform(scrollYProgress, [0, 1], [0, -130]), // 👈 efecto parallax
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    {children}
  </motion.div>
</motion.section>

    </div>
  );
};