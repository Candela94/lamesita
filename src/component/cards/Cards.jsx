import './cards.css'
import { IoClose, IoAddCircle, IoLocationOutline } from "react-icons/io5";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { extrasGlobales } from '../../../data/cajas';
import { useMemo } from 'react';


// ─────────────────────────────
// CARD Y LOCATION (sin cambios)
// ─────────────────────────────
export const Card = ({ dia, horario }) => (
  <div className="card card-horario card-gsap">
    <h5 className="dia">{dia}</h5>
    <p className="horario">{horario}</p>
  </div>
);






export const Location = () => (
  <a
    href="https://www.google.com/maps/place/Plaza+de+Jes%C3%BAs,+Valencia"
    target="_blank"
    rel="noopener noreferrer"
    className="card-location card-gsap"
  >
    <IoLocationOutline className='icon' />
    <div className="info">
      <h4 className="dia">LA MESITA</h4>
      <p className="calle">Mercado de Jesús (puestos 43/44), Valencia</p>
    </div>
  </a>
);






export const Contacto = () => {


  return (


    <>

      <div className="card-contacto">

        <div className="mensaje">

          <h4 className="mensaje-titulo">Escribe un mensajito</h4>

          <ul className="contacto-lista">
            <li className="contacto-li">whatsapp</li>
            <li className="contacto-li">hola@lamesita.es</li>

          </ul>

        </div>


        <div className="telefono">
          <h4 className="telef">Llámanos</h4>
          <p className="numero">+34 654 068 208</p>
        </div>






      </div>





    </>
  );



}


// ─────────────────────────────
// COMPONENTE PRINCIPAL: CAJAS
// ─────────────────────────────




export const Cajas = ({ caja, isOpen, onToggle }) => {

  const [overlay, setOverlay] = useState(false);
  const [seleccion, setSeleccion] = useState({});
  const [pasoFinal, setPasoFinal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  // Verificar si es la cajita personalizada
  const esPersonalizada = caja.nombre === 'HAZ TU PROPIA CAJITA';

  const handleOpenOverlay = () => setOverlay(true);

  // Filtrar extras disponibles para esta caja
  const extrasDisponibles = extrasGlobales.filter(extra =>
    caja.extrasDisponibles?.includes(extra.id)
  );





 
  const totalPrice = useMemo(() => {
    const precioBase = typeof caja.precio === 'number' ? caja.precio : 30;
    const precioExtras = extrasSeleccionados.reduce((total, extraId) => {
      const extra = extrasGlobales.find(e => e.id === extraId);
      return total + (extra?.precio || 0);
    }, 0);
    return precioBase + precioExtras;
  }, [caja.precio, extrasSeleccionados]);
  console.log('PRECIO TOTAL:', totalPrice);









  // Manejar selección de extras
  const handleExtraToggle = (extraId) => {
    setExtrasSeleccionados(prev => {
      if (prev.includes(extraId)) {
        return prev.filter(id => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };







  const handleSeleccion = (productoNombre, tipo) => {
    if (esPersonalizada) {
      // Determinar si el producto es la base
      const esBase = productoNombre === 'Elige una base';
      
      if (esBase) {
        // Para la base, simplemente actualizar el tipo seleccionado
        setSeleccion({ ...seleccion, [productoNombre]: tipo });
      } else {
        // Para productos sin tipos: toggle de selección
        if (seleccion[productoNombre]) {
          // Si ya está seleccionado, deseleccionar
          const nuevoSeleccion = { ...seleccion };
          delete nuevoSeleccion[productoNombre];
          setSeleccion(nuevoSeleccion);
        } else {
          // Si no está seleccionado, verificar límite de 6 productos (sin contar base)
          const productosSeleccionados = Object.keys(seleccion).filter(
            p => p !== 'Elige una base'
          ).length;
          
          if (productosSeleccionados >= 6) {
            alert('Solo puedes seleccionar hasta 6 productos 🙂');
            return;
          }
          
          // NUEVO: Guardar con valor "Seleccionado" para productos sin tipos
          setSeleccion({ ...seleccion, [productoNombre]: 'Seleccionado' });
        }
      }
    } else {
      // Para otras cajas, funciona igual que antes
      setSeleccion((prev) => ({
        ...prev,
        [productoNombre]: tipo
      }));
    }
  };




  const handleGuardar = () => {

    if (!nombreUsuario.trim()) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }


  
    if (esPersonalizada) {

      const productosSeleccionados = Object.keys(seleccion).filter(
        p => p !== 'Elige una base'
      ).length;

      const tieneBase = seleccion['Elige una base'];
  
      if (!tieneBase) {
        alert('Por favor, selecciona una base (Cava o Vino) 🙂');
        return;
      }


  
      if (productosSeleccionados !== 6) {
        alert(`Debes seleccionar exactamente 6 productos. Actualmente tienes ${productosSeleccionados} 🙂`);
        return;
      }
    } else {
      // ✅ Solo validar si hay productos con tipos
      const productosConTipos = caja.productos.filter(
        (prod) => prod.tipos && prod.tipos.length > 0
      );
  
      if (productosConTipos.length > 0) {
        const todosSeleccionados = productosConTipos.every((prod) => seleccion[prod.nombre]);
        if (!todosSeleccionados) {
          alert('Por favor, selecciona un tipo de producto para personalizar tu cajita 🙂');
          return;
        }
      }
    }
  
    setPasoFinal(true);
    setOverlay(false);
  };
  





  const construirMensaje = () => {
    const productos = Object.entries(seleccion)
      .map(([producto, tipo]) => `- ${producto}: ${tipo}`)
      .join('\n');

    let mensaje = `¡Hola! Soy ${nombreUsuario}, he seleccionado ${caja.nombre} (${totalPrice}€) de La Mesita con los siguientes productos:\n\n${productos}`;

    if (extrasSeleccionados.length > 0) {
      const extras = extrasSeleccionados.map(extraId => {
        const extra = extrasGlobales.find(e => e.id === extraId);
        return `- ${extra.nombre} (+${extra.precio}€)`;
      }).join('\n');
      mensaje += `\n\nExtras:\n${extras}`;
    }

    mensaje += `\n\n¡Muchas gracias!`;

    return mensaje;
  };





  const handleEnviarWhatsApp = () => {
    if (!nombreUsuario) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }

    const mensaje = construirMensaje();
    const numero = '34654068208';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };





  const handleVolverASeleccion = () => {
    setOverlay(true);
    setPasoFinal(false);
  };




  // ANIMACIONES
  const containerVariants = {
    collapsed: { opacity: 0, height: 0 },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { when: "beforeChildren", staggerChildren: 0.15 }
    }
  };

  const boxVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } }
  };








  return (


    <div className={`caja-item ${isOpen ? 'abierta' : ''}`} style={{ backgroundColor: caja.color }}>
      <div className="caja-header" onClick={onToggle}>
        <span className="nombre"><h2 className="nombre-caja">{caja.nombre}</h2></span>



        <motion.button
          className="caja-toggle"
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {isOpen ? <IoClose className='icons'/> : <IoAddCircle className='icons'/>}
        </motion.button>
      </div>





      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="caja"
            key={overlay ? 'overlay' : pasoFinal ? 'resumen' : 'inicio'}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={containerVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >







            {!overlay && !pasoFinal && (
              <motion.div
                variants={boxVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="caja-contenido"
              >
                <div className="imagen-box">
                  <motion.img
                    src="/img/caja.jpeg"
                    alt="caja"
                    className="caja-img"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                  />
                </div>

                <motion.div
                  className="caja-info"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <p className="descripcion">{caja.descripcion}</p>
                  <h3 className="precio">{caja.precio}€</h3>
                </motion.div>

                <motion.div
                  onClick={handleOpenOverlay}
                  className="caja-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="btn-container" style={{ color: caja.color }}>
                    Personalizar cajita
                  </button>
                </motion.div>
              </motion.div>
            )}

            {overlay && (
              <motion.div
                className="card-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {esPersonalizada ? (
                  //  Interfaz especial para cajita personalizada
                  <>



                    {caja.productos.map((prod, id) => {
                      // si el producto tiene tipos (es la base)
                      const tieneTipos = prod.tipos && prod.tipos.filter(t => t.trim() !== '').length > 0;
                      
                      return (




                        <div 
                          key={id} 
                          className="producto-overlay"
                          // NUEVO: Si no tiene tipos, el div completo es clickeable
                          onClick={!tieneTipos ? () => handleSeleccion(prod.nombre, null) : undefined}




                          style={{
                            cursor: !tieneTipos ? 'pointer' : 'default',


                            // NUEVO: Estilos por defecto y cuando está seleccionado

                            padding: !tieneTipos ? '0.7rem' : undefined,

                            border: !tieneTipos ? '1px solid var(--background)' : 'none',

                            borderRadius: !tieneTipos ? '8px' : undefined,

                            backgroundColor: !tieneTipos && seleccion[prod.nombre]

                              ? 'var(--background)'
                              : 'transparent',

                            color: !tieneTipos && seleccion[prod.nombre] ? caja.color : 'inherit',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <h3 style={{
                            fontWeight: !tieneTipos && seleccion[prod.nombre] ? 'bold' : 'normal'
                          }}>




                            {/*Mostrar checkmark si está seleccionado */}
                            {!tieneTipos && seleccion[prod.nombre] && '✓ '}
                            {prod.nombre}
                          </h3>






                          {tieneTipos ? (


                            // CASO 1: Producto con tipos (Base) - mostrar opciones
                            <ul className="overlay-producto-tipos">
                              {prod.tipos.map((tipo, idx) => (
                                tipo.trim() !== '' && (
                                  <li
                                    key={idx}
                                    className="tipos"
                                    onClick={() => handleSeleccion(prod.nombre, tipo)}
                                    style={
                                      seleccion[prod.nombre] === tipo
                                        ? {
                                            backgroundColor: 'var(--background)',
                                            color: caja.color,
                                            fontWeight: 'bold',
                                            boxShadow: '0.5px 0.5px 10px var(--background)',
                                            transform: 'scale(1.05)',
                                          }
                                        : {}
                                    }
                                  >
                                    {tipo}
                                  </li>
                                )
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}

                    {/* Mostrar contador sin contar la base */}
                    <div style={{ marginTop: '10px', fontSize: '14px', textAlign: 'center', fontWeight: 'bold' }}>
                      Productos seleccionados: {Object.keys(seleccion).filter(p => p !== 'Elige una base').length} / 6
                    </div>
                  </>
                ) : (
                  // Interfaz original para otras cajas
                  <>
                    {caja.productos.map((prod, id) => (
                      <div key={id} className="producto-overlay">
                        <h3>{prod.nombre}</h3>

                        {prod.tipos && prod.tipos.filter(t => t.trim() !== '').length > 0 && (
                          <ul className="overlay-producto-tipos">
                            {prod.tipos.map((tipo, idx) => (
                              tipo.trim() !== '' && (
                                <li
                                  key={idx}
                                  className="tipos"
                                  onClick={() => handleSeleccion(prod.nombre, tipo)}
                                  style={
                                    seleccion[prod.nombre] === tipo
                                      ? {
                                          backgroundColor: 'var(--background)',
                                          color: caja.color,
                                          fontWeight: 'bold',
                                          boxShadow: '0.5px 0.5px 10px var(--background)',
                                          transform: 'scale(1.05)',
                                        }
                                      : {}
                                  }
                                >
                                  {tipo}
                                </li>
                              )
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Sección de Extras */}
                {extrasDisponibles.length > 0 && (
                  <div className="extras-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '10px', fontSize: '16px' }}>Añade extras a tu cajita:</h3>

                    {extrasDisponibles.map((extra) => (
                      <div key={extra.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                          type="checkbox"
                          className='check'
                          id={extra.id}
                          checked={extrasSeleccionados.includes(extra.id)}
                          onChange={() => handleExtraToggle(extra.id)}
                          style={{ 
                            marginRight: '1rem',
                            cursor: 'pointer',
                            '--color-caja': caja.color,
                            accentColor: caja.color,
                          }}
                        />
                        <label htmlFor={extra.id} style={{ cursor: 'pointer', flex: 1 }}>
                          {extra.nombre} (+{extra.precio}€)
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Precio Total */}
                <motion.div key={totalPrice} style={{ marginTop: '15px', textAlign: 'center' }}>
                  <h3 className="total">Precio total: {totalPrice}€</h3>
                </motion.div>

                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="input-nombre"
                />

                <motion.div
                  onClick={handleGuardar}
                  className="caja-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="btn-container" style={{ color: caja.color, width: '90%' }}>
                    Guardar productos en mi cajita
                  </button>
                </motion.div>
              </motion.div>
            )}

            {pasoFinal && (
              <motion.div
                className="caja caja-resumen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <img src="/img/caja.png" alt="caja" className="caja-img" />
                <h2 className='resumen-nombre'>TU CAJITA, {nombreUsuario.toUpperCase()}</h2>
                <div className="caja-info">
                  <h4>Productos:</h4>
                  <ul className='info-resumen'>
                    {Object.entries(seleccion).map(([producto, tipo]) => (
                      <li key={producto}>
                        {producto}: <strong>{tipo}</strong>
                      </li>
                    ))}
                  </ul>

                  {extrasSeleccionados.length > 0 && (
                    <>
                      <h4 style={{ marginTop: '15px' }}>Extras:</h4>
                      <ul>
                        {extrasSeleccionados.map(extraId => {
                          const extra = extrasGlobales.find(e => e.id === extraId);
                          return (
                            <li key={extraId}>
                              {extra.nombre} <strong>(+{extra.precio}€)</strong>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  <h3 style={{ fontSize: '20px', marginTop:'2rem' }}>
                    Total: {totalPrice}€
                  </h3>
                </div>

                <motion.div
                  onClick={handleEnviarWhatsApp}
                  className="caja-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="btn-container" style={{ color: caja.color, width: '70%' }}>
                    Contacta y haz tu pedido
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};