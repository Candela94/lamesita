import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import './header.css';

export const Header = () => {
  console.log("🎯 HEADER SE ESTÁ RENDERIZANDO");
  
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [estiloMenu, setEstiloMenu] = useState("blanco"); // Valor inicial

  console.log("Estado actual estiloMenu:", estiloMenu);

  const seccionesBlancas = ["inicio", "galeria", "about"];
  const seccionesAzules = ["cajas", "info"];

  const handleToggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    setMenuAbierto(false);

    const targetId = e.currentTarget.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      document.documentElement.style.scrollSnapType = "none";

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setTimeout(() => {
        document.documentElement.style.scrollSnapType = "y proximity";
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Buscar por IDs específicos en lugar de section[id]
      const idsABuscar = [...seccionesBlancas, ...seccionesAzules];
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let id of idsABuscar) {
        const seccion = document.getElementById(id);
        if (!seccion) continue;
        const rect = seccion.getBoundingClientRect();
        const seccionTop = rect.top + window.scrollY;
        const seccionBottom = seccionTop + rect.height;

        if (scrollPosition >= seccionTop && scrollPosition <= seccionBottom) {
          if (seccionesBlancas.includes(id)) {
            setEstiloMenu("blanco");
          } else if (seccionesAzules.includes(id)) {
            setEstiloMenu("azul");
          }
          break;
        }
      }
    };

    handleScroll(); // Ejecutar al montar
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${estiloMenu}`}>
      <nav className="header-nav">
        <div className="menu-container">
          <div className={`menu-icon-wrapper ${estiloMenu}`}>
            {menuAbierto ? (
              <IoClose onClick={handleToggleMenu} className="menu-icon" />
            ) : (
              <p className="header-menu" onClick={handleToggleMenu}>
                MENÚ
              </p>
            )}
          </div>

          <AnimatePresence>
            {menuAbierto && (
              <motion.ul
                className={`header-ul ${estiloMenu}`}
                key={estiloMenu} // IMPORTANTE: fuerza re-render con la clase correcta
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ originX: 1 }}
              >
                <li className="header-li">
                  <a href="#about" onClick={handleLinkClick}>CONÓCENOS</a>
                </li>
                <li className="header-li">
                  <a href="#cajas" onClick={handleLinkClick}>NUESTRAS CAJITAS</a>
                </li>
                <li className="header-li">
                  <a href="#info" onClick={handleLinkClick}>VEN A VERNOS</a>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};