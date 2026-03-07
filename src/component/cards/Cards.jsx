import './cards.css'

import { useState, useRef, useEffect } from 'react';
import { extrasGlobales } from '../../../data/cajas';
import { useMemo } from 'react';
import { IoClose } from "react-icons/io5";


import { FaAngleDown } from "react-icons/fa6";




// ─────────────────────────────
// CARD Y LOCATION (sin cambios)
// ─────────────────────────────
export const Card = ({ dia, horario }) => (
  <div className="card card-horario card-gsap">
    <h4 className="dia">{dia}</h4>
    <p className="horario">{horario}</p>
  </div>
);






export const Location = () => (
  <a
    href="https://www.google.com/maps/dir//Mercado+Municipal+de+Jes%C3%BAs+-+Patraix,+Jes%C3%BAs,+46007+Valencia/@39.454811,-0.3654215,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0xd604faf9064664b:0xa0ffcb3e23a9a0b2!2m2!1d-0.3885811!2d39.4599901?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
    target="_blank"
    rel="noopener noreferrer"
    className="card-location card-gsap"
  >
    {/* <IoLocationOutline className='icon' /> */}
    <div className="info">
      <h3 className="dia">ENCUENTRA LA MESITA</h3>
      <p className="calle">M. JESÚS<br /> (PUESTOS 43/44)</p>
    </div>
  </a>
);





export const Cajas = ({ caja, isOpen, onToggle }) => {
  const [overlay, setOverlay] = useState(false);
  const [seleccion, setSeleccion] = useState({});
  const [pasoFinal, setPasoFinal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const esCajaRomantica = caja.nombre === 'CAJITA ROMÁNTICA';
  const colorRomantico = '#9F4854';
  const colorTextoBotonRomantico = '#EDCDD4';


  const handleOpenOverlay = () => setOverlay(true);

  const ref = useRef(null);



  useEffect(() => {
    if (isOpen) {
      setMostrarContenido(true);
    } else {
      // espera a que acabe la animación antes de ocultar el contenido (600ms = duración en CSS)
      setTimeout(() => setMostrarContenido(false), 600);
    }
  }, [isOpen]);
  

  // Scroll automático cuando se abre
  useEffect(() => {
    if (isOpen && ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [isOpen]);

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
    setSeleccion((prev) => ({
      ...prev,
      [productoNombre]: tipo,
    }));
  };

  const handleGuardar = () => {
    if (!nombreUsuario.trim()) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }

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

    setOverlay(false);
    setTimeout(() => {
      setPasoFinal(true);
    }, 100);
  };

  const construirMensaje = () => {
    const productos = Object.entries(seleccion)
      .map(([producto, tipo]) => `- ${producto}: ${tipo}`)
      .join('\n');

    let mensaje = `¡Hola! Soy ${nombreUsuario}, he seleccionado "${caja.nombre}" de La Mesita, por ${totalPrice}€. \n En mi cajita, he seleccionado los siguientes productos:\n\n${productos}`;

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
    const numero = '34665940987';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    
    // Guardar el estado antes de ir a WhatsApp
    sessionStorage.setItem('volviendoDeWhatsApp', 'true');
    
    // Redirigir a WhatsApp
    window.location.href = url;
  };
  
  // Añade este useEffect al componente para detectar cuando vuelves
  useEffect(() => {
    const volviendoDeWhatsApp = sessionStorage.getItem('volviendoDeWhatsApp');
    
    if (volviendoDeWhatsApp === 'true') {
      sessionStorage.removeItem('volviendoDeWhatsApp');
      // Forzar recarga completa si detectamos problemas
      if (document.readyState !== 'complete') {
        window.location.reload();
      }
    }
  }, []);

  const handleVolverASeleccion = () => {
    setPasoFinal(false);
    setOverlay(true);
  };
  const handleToggleCaja = () => {
    onToggle();
  
    if (isOpen) {
      setOverlay(false);
      setPasoFinal(false);
      setSeleccion({});
      setNombreUsuario('');
      setExtrasSeleccionados([]);
    }
  };

  return (
    <div
      ref={ref}
      className={`caja-item ${isOpen ? 'abierta' : ''}`}
      style={{
        backgroundColor: caja.color,
        ...(esCajaRomantica ? { color: colorRomantico } : {}),
      }}
    >
      <div className="caja-header" onClick={handleToggleCaja}>
        <span className="nombre">
          {esCajaRomantica ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 className="nombre-caja" style={{ color: colorRomantico }}>
                {caja.nombre}
              </h2>
              <div className='belamusa' >
                <img
                  src="/img/BELAMUSA-ROJO.png"
                  alt="Belamusa"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          ) : (
            <h2 className="nombre-caja">{caja.nombre}</h2>
          )}
        </span>

        <button
          className={`caja-toggle ${isOpen ? 'rotated' : ''}`}
          style={esCajaRomantica ? { color: colorRomantico } : undefined}
        >
          {isOpen ? (
            <IoClose className='icons' style={esCajaRomantica ? { color: colorRomantico } : undefined} />
          ) : (
            <FaAngleDown className='icons' style={esCajaRomantica ? { color: colorRomantico } : undefined} />
          )}
        </button>
      </div>

      <div className={`caja-accordion ${isOpen ? 'accordion-open' : ''}`}>
        {isOpen && !overlay && !pasoFinal && (
          <div className="caja caja-fade-in">
            <div className="caja-contenido">
            {/* <div className="imagen-box">
              <img
                src={caja.imagen}
                alt="caja"
                className="caja-img caja-img-scale"
              />
            </div> */}

            <div className="caja-info">
              <p className="descripcion" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                {caja.descripcion}
              </p>
              <h3 className="precio" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                {caja.precio}€
              </h3>
            </div>

            <div onClick={handleOpenOverlay} className="caja-btn-personalizar caja-uno caja-btn-delayed">
              <button
                className="btn-container-personalizar personalizar "
                style={
                  esCajaRomantica
                    ? {
                        backgroundColor: colorRomantico,
                        border: `2px solid ${colorRomantico}`,
                        color: colorTextoBotonRomantico,
                      }
                    : { color: caja.color }
                }
              >
                Personalizar cajita
              </button>
            </div>
          </div>
        </div>
        )}

        {isOpen && overlay && (
          <div className="caja caja-fade-in">
          <div className="card-options">
            {esCajaRomantica && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                <div className='caja-rosa'>
                  <img
                    src="/img/caja-rosa.jpeg"
                    alt="Cajita romántica"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            )}
            {caja.productos.map((prod, id) => (
              <div key={`prod-${id}-${prod.nombre}`} className="producto-overlay">
                <h4 className='productos' style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                  {prod.nombre}
                </h4>

                {prod.tipos && prod.tipos.filter(t => t.trim() !== '').length > 0 && (
                  <ul className="overlay-producto-tipos">
                    {prod.tipos.map((tipo, idx) => (
                      tipo.trim() !== '' && (
                        <li
                          key={`tipo-${idx}-${tipo}`}
                          className="tipos"
                          onClick={() => handleSeleccion(prod.nombre, tipo)}
                          style={
                            seleccion[prod.nombre] === tipo
                              ? esCajaRomantica
                                ? {
                                    backgroundColor: colorRomantico,
                                    color: colorTextoBotonRomantico,
                                    border: `1px solid ${colorRomantico}`,
                                    fontWeight: 'bold',
                                    boxShadow: `0.5px 0.5px 10px ${colorRomantico}`,
                                    transform: 'scale(1.05)',
                                  }
                                : {
                                    backgroundColor: 'var(--background)',
                                    color: caja.color,
                                    fontWeight: 'bold',
                                    boxShadow: '0.5px 0.5px 10px var(--background)',
                                    transform: 'scale(1.05)',
                                  }
                              : esCajaRomantica
                                ? { color: colorRomantico, border: `1px solid ${colorRomantico}` }
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

            {extrasDisponibles.length > 0 && (
              <div className="extras-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <h4
                  style={{
                    marginBottom: '10px',
                    fontSize: '16px',
                    ...(esCajaRomantica ? { color: colorRomantico } : {}),
                  }}
                >
                  Añade extras a tu cajita:
                </h4>

                {extrasDisponibles.map((extra) => (
                  <div key={`extra-${extra.id}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      className='check'
                      id={`extra-checkbox-${extra.id}`}
                      checked={extrasSeleccionados.includes(extra.id)}
                      onChange={() => handleExtraToggle(extra.id)}
                      style={{
                        marginRight: '1rem',
                        cursor: 'pointer',
                        '--color-caja': caja.color,
                        accentColor: caja.color,
                      }}
                    />
                    <label
                      htmlFor={`extra-checkbox-${extra.id}`}
                      style={{ cursor: 'pointer', flex: 1, ...(esCajaRomantica ? { color: colorRomantico } : {}) }}
                    >
                      {extra.nombre} <strong>+{extra.precio}€</strong>
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div key={totalPrice} style={{ marginTop: '15px', textAlign: 'center' }}>
              <h2 className="productos" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                Precio total: {totalPrice}€
              </h2>
            </div>


            <div className="pagos">
              <p className="pagos-texto" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                En La Mesita, aceptamos pagos por bizum, transferencia o efectivo.
              </p>
              
              <p className="pagos-texto" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                <strong>Preparamos tu pedido con cariño, por lo que estará listo para recoger en tienda 24 horas hábiles tras haber realizado el pedido.</strong>
              </p>
              <p className="pagos-texto" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                <strong>Cada cajita se prepara de forma artesanal, por lo que los pesos en gramos pueden presentar ligeras variaciones.</strong>
              </p>
              <p className="pagos-texto" style={esCajaRomantica ? { color: colorRomantico } : undefined}>
                Si prefieres que te lo enviemos, el coste de envío se calculará aparte.
              </p>


            </div>

        

            <div  className="caja-btn caja-uno caja-btn-delayed">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="input-nombre"
              style={
                esCajaRomantica
                  ? {
                      color: colorRomantico,
                      border: `2px solid ${colorRomantico}`,
                      '--placeholder-color': colorRomantico,
                    }
                  : undefined
              }
            />
              <button
                onClick={handleGuardar}
                className="btn-container"
                style={
                  esCajaRomantica
                    ? {
                        backgroundColor: colorRomantico,
                        border: `2px solid ${colorRomantico}`,
                        color: colorTextoBotonRomantico,
                      }
                    : { color: caja.color }
                }
              >
                Guardar productos en mi cajita
              </button>
            </div>
          </div>
        </div>
        )}

        {isOpen && pasoFinal && (
          <div className="caja caja-fade-in">
          <div className="caja-resumen caja-resumen-scale">
            {/* <img src={caja.imagen} alt="caja" className="caja-img-resumen" /> */}
            <h2 className='resumen-nombre'>TU CAJITA, {nombreUsuario.toUpperCase()}</h2>
            <div className="caja-info-resumen">
              <h4>Productos:</h4>
              <ul className='info-resumen'>
                {Object.entries(seleccion).map(([producto, tipo]) => (
                  <li key={`resumen-${producto}`}>
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
                        <li key={`resumen-extra-${extraId}`}>
                          {extra.nombre} <strong>(+{extra.precio}€)</strong>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              <h3 style={{ marginTop: '2rem' }}>
                Total: {totalPrice}€
              </h3>
            </div>




            <div onClick={handleEnviarWhatsApp} className="caja-btn caja-editar caja-btn-delayed">
              <button
                className="btn-container"
                style={
                  esCajaRomantica
                    ? {
                        backgroundColor: colorRomantico,
                        border: `2px solid ${colorRomantico}`,
                        color: colorTextoBotonRomantico,
                        width: '70%',
                      }
                    : { color: caja.color, width: '70%' }
                }
              >
                Contacta y haz tu pedido
              </button>
            </div>




            <div onClick={handleVolverASeleccion} className="caja-btn caja-editar caja-dos caja-btn-delayed">
              <button
                className="btn-container "
                style={
                  esCajaRomantica
                    ? {
                        backgroundColor: colorRomantico,
                        border: `2px solid ${colorRomantico}`,
                        color: colorTextoBotonRomantico,
                        width: '70%',
                      }
                    : {
                        border: '2px solid var(--background',
                        background: 'none',
                        color: 'var(--background)',
                        width: '70%',
                      }
                }
              >
                Volver a editar mi cajita
              </button>
            </div>




          </div>
        </div>
        )}
      </div>
    </div>
  );
};





export const CajaPersonalizada = ({ caja, isOpen, onToggle }) => {
  const [overlay, setOverlay] = useState(false);
  const [seleccion, setSeleccion] = useState({});
  const [pasoFinal, setPasoFinal] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [extrasSeleccionados, setExtrasSeleccionados] = useState([]);

  const esCajaRomantica = caja.nombre === 'CAJITA ROMÁNTICA';
  const colorRomantico = '#9F4854';
  const colorTextoBotonRomantico = '#EDCDD4';

  const handleOpenOverlay = () => setOverlay(true);
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen && ref.current) {
      setTimeout(() => {
        try {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        } catch (err) {
          console.warn('scrollIntoView falló en móvil:', err);
        }
      }, 100);
    }
  }, [isOpen]);

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

  const handleExtraToggle = (extraId) => {
    setExtrasSeleccionados(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleSeleccion = (productoNombre, tipo, tieneTipos = false) => {
    if (!productoNombre) return;

    const esBase = productoNombre === 'Elige una base';
    if (esBase) {
      setSeleccion(prev => ({ ...prev, [productoNombre]: tipo }));
    } else {
      setSeleccion(prev => {
        const productosSeleccionados = Object.keys(prev).filter(p => p !== 'Elige una base').length;
        const yaEstaSeleccionado = !!prev[productoNombre];
        
        // Si el producto tiene tipos y ya está seleccionado, solo cambiamos el tipo
        if (tieneTipos && yaEstaSeleccionado) {
          return { ...prev, [productoNombre]: tipo };
        }
        
        // Si no está seleccionado y ya tenemos 6 productos, no permitir agregar más
        if (productosSeleccionados >= 6 && !yaEstaSeleccionado) {
          alert('Solo puedes seleccionar hasta 6 productos 🙂');
          return prev;
        }

        const nuevoSeleccion = { ...prev };
        if (yaEstaSeleccionado && !tieneTipos) {
          // Solo hacer toggle si NO tiene tipos (productos simples como Miel)
          delete nuevoSeleccion[productoNombre];
        } else {
          // Agregar o actualizar el producto
          nuevoSeleccion[productoNombre] = tipo || 'Seleccionado';
        }
        return nuevoSeleccion;
      });
    }
  };

  const handleGuardar = () => {
    if (!nombreUsuario.trim()) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }

    const productosSeleccionados = Object.keys(seleccion).filter(p => p !== 'Elige una base').length;
    const tieneBase = seleccion['Elige una base'];

    if (!tieneBase) {
      alert('Por favor, selecciona una base (Cava o Vino) 🙂');
      return;
    }

    if (productosSeleccionados !== 6) {
      alert(`Debes seleccionar exactamente 6 productos. Actualmente tienes ${productosSeleccionados} 🙂`);
      return;
    }

    setOverlay(false);
    setTimeout(() => setPasoFinal(true), 100);
  };

  const construirMensaje = () => {
    const productos = Object.entries(seleccion)
      .map(([producto, tipo]) => `- ${producto}: ${tipo}`)
      .join('\n');

    let mensaje = `¡Hola! Soy ${nombreUsuario}, he seleccionado "${caja.nombre}" de La Mesita, por ${totalPrice}€. 
En mi cajita, he seleccionado los siguientes productos:\n\n${productos}`;

    if (extrasSeleccionados.length > 0) {
      const extras = extrasSeleccionados
        .map(extraId => {
          const extra = extrasGlobales.find(e => e.id === extraId);
          return `- ${extra.nombre} (+${extra.precio}€)`;
        })
        .join('\n');
      mensaje += `\n\nExtras:\n${extras}`;
    }

    mensaje += `\n\n¡Muchas gracias!`;
    return mensaje;
  };

  const handleEnviarWhatsApp = () => {
    if (!nombreUsuario.trim()) {
      alert('Por favor, introduce tu nombre 🙂');
      return;
    }

    const mensaje = construirMensaje();
    const numero = '34665940987';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleVolverASeleccion = () => {
    setPasoFinal(false);
    setOverlay(true);
  };

  const handleToggleCaja = () => {
    onToggle();
    if (isOpen) {
      setOverlay(false);
      setPasoFinal(false);
      setSeleccion({});
      setNombreUsuario('');
      setExtrasSeleccionados([]);
    }
  };

  return (
    <div
      ref={ref}
      className={`caja-item ${isOpen ? 'abierta' : ''}`}
      style={{
        backgroundColor: caja.color,
        ...(esCajaRomantica ? { color: colorRomantico } : {}),
      }}
    >
      <div className="caja-header" onClick={handleToggleCaja}>
        <span className="nombre">
          {esCajaRomantica ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 className="nombre-caja" style={{ color: colorRomantico }}>
                {caja.nombre}
              </h2>
              <div style={{ width: 'clamp(28px, 8vw, 44px)' }}>
                <img
                  src="/img/BELAMUSA-ROJO.png"
                  alt="Belamusa"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          ) : (
            <h2 className="nombre-caja">{caja.nombre}</h2>
          )}
        </span>
        <button className={`caja-toggle ${isOpen ? 'rotated' : ''}`}>
          {isOpen ? (
            <IoClose className='icons' style={esCajaRomantica ? { color: colorRomantico } : undefined} />
          ) : (
            <FaAngleDown className='icons' style={esCajaRomantica ? { color: colorRomantico } : undefined} />
          )}
        </button>
      </div>

      <div className={`caja-accordion ${isOpen ? 'accordion-open' : ''}`}>
        {isOpen && !overlay && !pasoFinal && (
          <div className="caja caja-fade-in">
            <div className="caja-contenido">
              <div className="caja-info">
                <p className="descripcion">{caja.descripcion}</p>
                <h3 className="precio">{caja.precio}€</h3>
              </div>
              <div onClick={handleOpenOverlay} className="caja-btn-personalizar caja-uno caja-btn-delayed">
                <button
                  className="btn-container-personalizar"
                  style={
                    esCajaRomantica
                      ? {
                          backgroundColor: colorRomantico,
                          border: `2px solid ${colorRomantico}`,
                          color: colorTextoBotonRomantico,
                        }
                      : { color: caja.color }
                  }
                >
                  Personalizar cajita
                </button>
              </div>
            </div>
          </div>
        )}

        {isOpen && overlay && (
          <div className="caja caja-fade-in">
            <div className="card-options">
              {esCajaRomantica && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                  <div style={{ width: 'clamp(72px, 20vw, 140px)' }}>
                    <img
                      src="/img/caja-rosa.jpeg"
                      alt="Cajita romántica"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              )}
              {(() => {
                const base = caja.productos.find(p => p.nombre === 'Elige una base');
                const otrosProductos = caja.productos.filter(p => p.nombre !== 'Elige una base');
                return (
                  <>
                    {base && (
                      <div className="producto-overlay">
                        <h4>{base.nombre}</h4>
                        <ul className="overlay-producto-tipos">
                          {base.tipos.filter(t => typeof t === 'string' && t.trim() !== '').map((tipo, tipoIdx) => (
                            <li
                              key={`${caja.nombre}-tipo-base-${tipoIdx}`}
                              className="tipos"
                              onClick={() => handleSeleccion(base.nombre, tipo, true)}
                              style={
                                seleccion[base.nombre] === tipo
                                  ? esCajaRomantica
                                    ? {
                                        backgroundColor: colorRomantico,
                                        color: colorTextoBotonRomantico,
                                        border: `1px solid ${colorRomantico}`,
                                        fontWeight: 'bold',
                                        boxShadow: `0.5px 0.5px 10px ${colorRomantico}`,
                                        transform: 'scale(1.05)',
                                      }
                                    : {
                                        backgroundColor: 'var(--background)',
                                        color: caja.color,
                                        fontWeight: 'bold',
                                        boxShadow: '0.5px 0.5px 10px var(--background)',
                                        transform: 'scale(1.05)',
                                      }
                                  : esCajaRomantica
                                    ? { color: colorRomantico, border: `1px solid ${colorRomantico}` }
                                    : {}
                              }
                            >
                              {tipo}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '1.5rem' }}>
                      <h4>Elige 6 productos: {Object.keys(seleccion).filter(p => p !== 'Elige una base').length} / 6</h4>
                    </div>

                    {otrosProductos.map((prod, idx) => {
                      const tiposValidos = Array.isArray(prod.tipos)
                        ? prod.tipos.filter(t => typeof t === 'string' && t.trim() !== '')
                        : [];
                      const tieneTipos = tiposValidos.length > 0;
                      const estaSeleccionado = !!seleccion[prod.nombre];

                      return (
                        <div
                          key={`${caja.nombre}-prod-${prod.nombre}-${idx}`}
                          className="producto-overlay"
                          onClick={
                            !tieneTipos
                              ? (e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setTimeout(() => handleSeleccion(prod.nombre, 'Seleccionado', false), 0);
                                }
                              : undefined
                          }
                          style={{
                            cursor: !tieneTipos ? 'pointer' : 'default',
                            padding: !tieneTipos ? '0.7rem' : undefined,
                            border: !tieneTipos ? '1px solid var(--background)' : 'none',
                            borderRadius: !tieneTipos ? '8px' : undefined,
                            backgroundColor: !tieneTipos && estaSeleccionado ? 'var(--background)' : 'transparent',
                            color: !tieneTipos && estaSeleccionado ? caja.color : 'inherit',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <h4 style={{ fontWeight: !tieneTipos && estaSeleccionado ? 'bold' : 'normal' }}>
                            {!tieneTipos && estaSeleccionado && '✓ '}
                            {prod.nombre}
                          </h4>

                          {tieneTipos && (
                            <ul className="overlay-producto-tipos">
                              {tiposValidos.map((tipo, tipoIdx) => (
                                <li
                                  key={`${caja.nombre}-tipo-${prod.nombre}-${tipo}-${tipoIdx}`}
                                  className="tipos"
                                  onClick={() => handleSeleccion(prod.nombre, tipo, true)}
                                  style={
                                    seleccion[prod.nombre] === tipo
                                      ? esCajaRomantica
                                        ? {
                                            backgroundColor: colorRomantico,
                                            color: colorTextoBotonRomantico,
                                            border: `1px solid ${colorRomantico}`,
                                            fontWeight: 'bold',
                                            boxShadow: `0.5px 0.5px 10px ${colorRomantico}`,
                                            transform: 'scale(1.05)',
                                          }
                                        : {
                                            backgroundColor: 'var(--background)',
                                            color: caja.color,
                                            fontWeight: 'bold',
                                            boxShadow: '0.5px 0.5px 10px var(--background)',
                                            transform: 'scale(1.05)',
                                          }
                                      : esCajaRomantica
                                        ? { color: colorRomantico, border: `1px solid ${colorRomantico}` }
                                        : {}
                                  }
                                >
                                  {tipo}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </>
                );
              })()}

              {extrasDisponibles.length > 0 && (
                <div className="extras-section" style={{ marginTop: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Añade extras a tu cajita:</h4>
                  {extrasDisponibles.map((extra) => (
                    <div key={`${caja.nombre}-extra-${extra.id}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'  }}>
                      <input
                        type="checkbox"
                        className='check'
                        id={`${caja.nombre}-extra-checkbox-${extra.id}`}
                        checked={extrasSeleccionados.includes(extra.id)}
                        onChange={() => handleExtraToggle(extra.id)}
                        style={{
                          marginRight: '1rem',
                          cursor: 'pointer',
                          '--color-caja': caja.color,
                          accentColor: caja.color,
                        }}
                      />
                      <label htmlFor={`${caja.nombre}-extra-checkbox-${extra.id}`} style={{ cursor: 'pointer', flex: 1 }}>
                        {extra.nombre} <strong> +{extra.precio}€</strong>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <div key={`price-${totalPrice}`} style={{ marginTop: '15px', textAlign: 'center' }}>
                <h2 className="productos">Precio total: {totalPrice}€</h2>
              </div>

            

              <div  className="caja-btn caja-uno caja-btn-delayed">
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="input-nombre"
                style={
                  esCajaRomantica
                    ? {
                        color: colorRomantico,
                        border: `2px solid ${colorRomantico}`,
                        '--placeholder-color': colorRomantico,
                      }
                    : undefined
                }
              />
                <button
                  onClick={handleGuardar}
                  className="btn-container"
                  style={
                    esCajaRomantica
                      ? {
                          backgroundColor: colorRomantico,
                          border: `2px solid ${colorRomantico}`,
                          color: colorTextoBotonRomantico,
                        }
                      : { color: caja.color }
                  }
                >
                  Guardar productos en mi cajita
                </button>
              </div>
            </div>
          </div>
        )}

        {isOpen && pasoFinal && (
          <div className="caja caja-fade-in">
            <div className="caja-resumen caja-resumen-scale">
              {/* <img src={caja.imagen} alt="caja" className="caja-img-resumen" /> */}
              <h2 className='resumen-nombre'>TU CAJITA, {nombreUsuario.toUpperCase()}</h2>
              <div className="caja-info-resumen">
                <h4>Productos:</h4>
                <ul className='info-resumen'>
                  {Object.entries(seleccion).map(([producto, tipo]) => (
                    <li key={`resumen-${caja.nombre}-${producto}`}>
                      {tipo === 'Seleccionado' ? producto : `${producto}: `}<strong>{tipo !== 'Seleccionado' && tipo}</strong>
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
                          <li key={`resumen-extra-${caja.nombre}-${extraId}`}>
                            {extra.nombre} <strong>(+{extra.precio}€)</strong>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                <h3 style={{ fontSize: '20px', marginTop: '2rem' }}>
                  Total: {totalPrice}€
                </h3>
              </div>

              <div onClick={handleEnviarWhatsApp} className="caja-btn caja-editar caja-btn-delayed">
                <button
                  className="btn-container"
                  style={
                    esCajaRomantica
                      ? {
                          backgroundColor: '#9F4854',
                          border: '2px solid #9F4854',
                          color: '#EDCDD4',
                          width: '70%',
                        }
                      : { color: caja.color, width: '70%' }
                  }
                >
                  Contacta y haz tu pedido
                </button>
              </div>
              <div onClick={handleVolverASeleccion} className="caja-btn caja-editar caja-dos caja-btn-delayed">
                <button
                  className="btn-container"
                  style={
                    esCajaRomantica
                      ? {
                          backgroundColor: '#9F4854',
                          border: '2px solid #9F4854',
                          color: '#EDCDD4',
                          width: '70%',
                        }
                      : {
                          border: '2px solid var(--background)',
                          background: 'none',
                          color: 'var(--background)',
                          width: '70%',
                        }
                  }
                >
                  Volver a editar mi cajita
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};