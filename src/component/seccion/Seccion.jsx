import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const Seccion = ({ 
  children, 
  id, 
  index = 0, 
  maxHeight = 'none',
  scrollable = false,
  totalSections = 1,
  expandible = false // NUEVO: permite expandirse
}) => {
  const ref = useRef(null);
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const updateVh = () => setVh(window.innerHeight);
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

  const y = useTransform(scrollYProgress, [0, 4], [0, expandible ? 0 : -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9, 1], [1, 1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div
      className='section'
      ref={ref}
      style={{
        position: expandible ? 'relative' : 'sticky',
        top: 0,
        minHeight: expandible ? 'auto' : (vh ? `${vh}px` : '100vh'),
        height: expandible ? 'auto' : (vh ? `${vh}px` : '100vh'),
        width: '100%',
        zIndex: totalSections - index,
      }}
    >
      <motion.section
        id={id}
        style={{
          opacity,
          scale,
          width: '100%',
          height: expandible ? 'auto' : '100%',
          maxHeight: '100%',
          overflowY: scrollable ? 'auto' : 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            y,
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
