import './cards.css'
import { IoClose, IoAddCircle, IoLocationOutline } from "react-icons/io5";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// ─────────────────────────────────────────────
// CARD SIMPLE
// ─────────────────────────────────────────────
export const Card = ({ dia, horario }) => (
  <div className="card card-horario card-gsap">
    <h5 className="dia">{dia}</h5>
    <p className="horario">{horario}</p>
  </div>
);


// ─────────────────────────────────────────────
// LOCATION CARD
// ─────────────────────────────────────────────
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


// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL: CAJAS
// ─────────────────────────────────────────────
export const Cajas = ({ caja }) => {
  const [overlay, setOverlay] = useState(false);
  const [seleccion, setSeleccion] = useState({});
  const [pasoFinal, setPasoFinal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [abierta, setAbierta] = useState(false);

  const toggleCaja = () => setAbierta(!abierta);
  const mostrarCantidad = (tipos) => tipos.length > 1 ? `(${tipos.length})` : '';
  const handleOpenOverlay = () => setOverlay(true);
  const handleCloseOverlay = () => setOverlay(false);

  const handleSeleccion = (productoNombre, tipo) => {
    setSeleccion((prev) => ({
      ...prev,
      [productoNombre]: tipo
    }));
  };

  const handleGuardar = () => {
    if (!nombreUsuario.trim()) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }

    const seleccionados = caja.productos.every((prod) => seleccion[prod.nombre]);
    if (seleccionados) {
      setPasoFinal(true);
      setOverlay(false);
    } else {
      alert('Por favor, selecciona un tipo de producto :)');
    }
  };

  const construirMensaje = () => {
    const productos = Object.entries(seleccion)
      .map(([producto, tipo]) => `- ${producto}: ${tipo}`)
      .join('\n');

    return `¡Hola! Soy ${nombreUsuario} y esto es una prueba de las cajitasssssss, he seleccionado esta caja.\n\n${caja.nombre} (${caja.precio})\n\nEsta pedazo de cajita tiene estos productos:\n\n${productos}\n\n¡Muchas gracias!`;
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

  // ─────────────────────────────────────────────
  // VARIANTES DE ANIMACIÓN
  // ─────────────────────────────────────────────
  const variants = {
    collapsed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  return (
    <div
      className={`caja-item ${abierta ? 'abierta' : ''}`}
      style={{ backgroundColor: caja.color }}
    >
      <div className="caja-header" onClick={toggleCaja}>
        <span className="nombre"><h2 className="nombre-caja">{caja.nombre}</h2></span>
        <button className="caja-toggle">
          {abierta ? <IoClose /> : <IoAddCircle />}
        </button>
      </div>

      {/* Animación del contenido */}
      <AnimatePresence initial={false}>
        {abierta && (
          <motion.div
            className="caja"
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={variants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* Paso 1 */}
            {!overlay && !pasoFinal && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <img src="/img/caja.png" alt="caja" className="caja-img" />
                <div className="caja-info">
                  <h5 className="precio">{caja.precio}</h5>
                  {caja.productos.map((pr, id) => (
                    <ul className="productos-lista" key={id}>
                      <li className="nombre-producto">
                        {pr.nombre} {mostrarCantidad(pr.tipos)}
                      </li>
                    </ul>
                  ))}
                </div>
                <button onClick={handleOpenOverlay} className="caja-btn">
                  Personalizar cajita
                </button>
              </motion.div>
            )}

            {/* Paso 2 */}
            {overlay && (
              <motion.div
                className="card-options"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {caja.productos.map((prod, id) => (
                  <div key={id} className="producto-overlay">
                    <h3>{prod.nombre}</h3>
                    <ul className="overlay-producto-tipos">
                      {prod.tipos.map((tipo, idx) => (
                        <li
                          key={idx}
                          className={`tipos ${seleccion[prod.nombre] === tipo ? 'activo' : ''}`}
                          onClick={() => handleSeleccion(prod.nombre, tipo)}
                        >
                          {tipo}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombreUsuario}
                  onChange={(e) => setNombreUsuario(e.target.value)}
                  className="input-nombre"
                />
                <button onClick={handleGuardar} className="caja-btn">
                  Guardar productos en mi cajita
                </button>
              </motion.div>
            )}

            {/* Paso 3 */}
            {pasoFinal && (
              <motion.div
                className="caja caja-resumen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/img/caja.png" alt="caja" className="caja-img" />
                <h2>TU CAJITA, {nombreUsuario.toUpperCase()}</h2>
                <div className="caja-info">
                  <ul>
                    {Object.entries(seleccion).map(([producto, tipo]) => (
                      <li key={producto}>
                        {producto}: <strong>{tipo}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={handleEnviarWhatsApp} className="caja-btn">
                  Contacta y haz tu pedido
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
