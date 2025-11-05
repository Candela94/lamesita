import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import './header.css';
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { NavLink } from "react-router";
import { FiMenu } from "react-icons/fi";

export const Header = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

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

    return (
        <header className='header'>
            <nav className="header-nav">
                <div className="menu-container">
                    <div className='menu-icon-wrapper'>
                        {menuAbierto ? (
                            <IoClose onClick={handleToggleMenu} className="menu-icon" />
                        ) : (
                            <div className="header-menu" onClick={handleToggleMenu}>
                             <FiMenu style={{marginTop:'0.3rem'}}/>
                            </div>
                        )}
                    </div>

                    <AnimatePresence>
                        {menuAbierto && (
                            <motion.div>
                                <motion.div
                                    className="blur-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={handleToggleMenu}
                                />

                                <motion.ul
                                    className='header-ul'
                                    initial={{ x: '100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '100%', opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <li className="header-li">
                                        <a href="#about" onClick={handleLinkClick}>NOSOTROS</a>
                                    </li>
                                    <li className="header-li">
                                        <a href="#cajas" onClick={handleLinkClick}>LAS CAJITAS</a>
                                    </li>
                                    <li className="header-li">
                                        <a href="#info" onClick={handleLinkClick}>CONTACTO</a>
                                    </li>

                                    <div className="politica-redes">
                                       <NavLink to='/privacy'> <p className="privacidad">POLÍTICA <br /> DE PRIVACIDAD</p></NavLink>

                                        <div className="rrss">
                                            <a target="_blank" href="https://www.instagram.com/lamesita.valencia">
                                              <RiInstagramFill style={{ marginTop: '0.3rem' }} className="icons" />
                                            </a>
                                            <a target="_blank" href="https://www.tiktok.com/@lamesita.valencia">
                                              <FaTiktok className="icons" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>
        </header>
    );
};







export const HeaderDesk = () => {
  useEffect(() => {
    const secciones = document.querySelectorAll("section[id]");

    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;

      secciones.forEach((seccion) => {
        const top = seccion.offsetTop;
        const height = seccion.offsetHeight;
        const id = seccion.getAttribute("id");
        const link = document.querySelector(`.desk-li a[href="#${id}"]`);

        if (scrollPos >= top && scrollPos < top + height) {
          link?.classList.add("activo");
        } else {
          link?.classList.remove("activo");
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header-desk">
      <nav className="desk-nav">
        <ul className="desk-ul">
          <div className="desk-logo">
            <a href="#intro">
              <img src="img/LOGO_AZUL_1.png" alt="logo" className="logo-header" />
            </a>
          </div>

          <li className="desk-li text-header">
            <a href="#about">NOSOTROS</a>
          </li>
          <li className="desk-li text-header">
            <a href="#cajas">LAS CAJITAS</a>
          </li>
          <li className="desk-li text-header">
            <a href="#info">CONTACTO</a>
          </li>

          <ul className="redes-lista">
            <li className="redes-icons">
              <a target="_blank" href="https://www.instagram.com/lamesita.valencia">
                <RiInstagramFill style={{ marginTop: '0.5rem' }} className="icons-desk" />
              </a>
            </li>
            <li className="redes-icons">
              <a target="_blank" href="https://www.tiktok.com/@lamesita.valencia">
                <FaTiktok style={{ marginTop: '0.5rem' }} className="icons-desk" />
              </a>
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
};