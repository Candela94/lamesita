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
        style={{
          opacity,
          scale,
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </motion.section>
    </div>
  );
};

// Demo
export default function Demo() {
  const secciones = [
    { id: 'seccion-1', bg: '#667eea', titulo: 'Sección 1' },
    { id: 'seccion-2', bg: '#f5576c', titulo: 'Sección 2' },
    { id: 'seccion-3', bg: '#4facfe', titulo: 'Sección 3' },
    { id: 'seccion-4', bg: '#43e97b', titulo: 'Sección 4' }
  ];

  return (
    <div style={{ background: '#000' }}>
      {secciones.map((seccion) => (
        <Seccion key={seccion.id} id={seccion.id}>
          <div style={{
            
            width: '90%',
            height: '80%',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
           
          
          }}>
            {seccion.titulo}
          </div>
        </Seccion>
      ))}
    </div>
  );
}
