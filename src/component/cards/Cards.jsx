import './cards.css'
import { IoClose, IoAddCircle, IoLocationOutline } from "react-icons/io5";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


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





  // ─────────────────────────────
  // FUNCIONES
  // ─────────────────────────────



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
      alert('Por favor, selecciona un tipo de producto para personalizar tu cajita :)');
    }



  };

  const construirMensaje = () => {

    const productos = Object.entries(seleccion)

      .map(([producto, tipo]) => `- ${producto}: ${tipo}`)

      .join('\n');

    return `¡Hola! Soy ${nombreUsuario}, he seleccionado esta caja de La Mesita.\n\n${caja.nombre} (${caja.precio})\n\nHe escogido estos productos:\n\n${productos}\n\n¡Muchas gracias!`;
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

  // ─────────────────────────────
  // ANIMACIONES
  // ─────────────────────────────


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




  // ─────────────────────────────
  // RENDER
  // ─────────────────────────────




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
          {isOpen ? <IoClose /> : <IoAddCircle />}
        </motion.button>
      </div>

      <AnimatePresence initial={false}>


        {isOpen && (
          <motion.div
            className="caja"
            key="content"
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


                <motion.img
                  src="/img/caja.png"
                  alt="caja"
                  className="caja-img"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
                />



                <motion.div
                  className="caja-info"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >


                  <h5 className="precio">{caja.precio}</h5>
                  {caja.productos.map((pr, id) => (
                    <ul className="productos-lista" key={id}>
                      <li className="nombre-producto">
                        {pr.nombre} {mostrarCantidad(pr.tipos)}
                      </li>
                    </ul>
                  ))}
                </motion.div>




                <motion.div
                  onClick={handleOpenOverlay}
                  className="caja-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="btn-container" style={{color:caja.color}}>
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
                {caja.productos.map((prod, id) => (
                  <div key={id} className="producto-overlay">
                    <h3>{prod.nombre}</h3>
                    <ul className="overlay-producto-tipos">
                      {prod.tipos.map((tipo, idx) => (
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
                   
                      ))}
                    </ul>
                  </div>
                ))}

                <input
                  type="text"
                  style={{color:'var(--background'}}
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
                  <button className="btn-container" style={{color:caja.color, width:'90%'}}>
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





                <motion.div
                  onClick={handleEnviarWhatsApp}
                  className="caja-btn"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <button className="btn-container" style={{color:caja.color, width:'70%'}}>
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
