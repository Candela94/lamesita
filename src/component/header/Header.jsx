import { useState, useEffect } from "react";
import { TfiMenu } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import './header.css';

export const Header = () => {
    const [menu, setMenu] = useState(false);
    const [estiloMenu, setEstiloMenu] = useState('blanco'); // Empezar con blanco

    const handleOpenMenu = () => {
        setMenu(prev => !prev);
    };

    const handleLinkClick = () => {
        setMenu(true);
    };

    useEffect(() => {
        const handleScroll = () => {
            const secciones = document.querySelectorAll("section[id]");
            const scrollPosition = window.scrollY + window.innerHeight * 0.9; // Punto medio de la pantalla

            secciones.forEach(seccion => {
                const rect = seccion.getBoundingClientRect();
                const seccionTop = rect.top + window.scrollY;
                const seccionBottom = seccionTop + rect.height;

                // Si el punto medio de la pantalla está dentro de esta sección
                if (scrollPosition >= seccionTop && scrollPosition <= seccionBottom) {
                    const id = seccion.id;
                    console.log('Sección actual:', id); // Debug

                    if (id === "inicio" || id === "galeria" || id === "about") {
                        setEstiloMenu("blanco");
                    } else {
                        setEstiloMenu("azul");
                    }
                }
            });
        };

        // Ejecutar al cargar
        handleScroll();

        // Ejecutar al hacer scroll
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header">
            <nav className="header-nav">
                <div className="menu-container">
                    <div className={`menu-icon-wrapper ${estiloMenu}`}>
                        {menu ? (
                            <TfiMenu onClick={handleOpenMenu} className="menu-icon" />
                        ) : (
                            <IoClose onClick={handleOpenMenu} className="menu-icon" />
                        )}
                    </div>

                    <AnimatePresence>
                        {!menu && (
                            <motion.ul
                                className={`header-ul ${estiloMenu}`}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                exit={{ scaleX: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
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

            {/* Debug: muestra el estilo actual */}
            {/* <div style={{ position: 'fixed', top: '60px', right: '10px', background: 'black', color: 'white', padding: '5px', fontSize: '12px', zIndex: 9999 }}>
        Estilo: {estiloMenu}
      </div> */}
        </header>
    );
};