import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const Seccion = ({ children, id }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={ref} style={{ height: '100vh', position: 'relative' }}>
      <motion.section
        id={id}
      
      >
        {children}
      </motion.section>
    </div>
  );
};

