import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import './header.css';
import { FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


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
                            <p className="header-menu" onClick={handleToggleMenu}>
                                MENÚ
                            </p>
                        )}
                    </div>

                    <AnimatePresence>
                        {menuAbierto && (
                            <motion.div>
                                {/* Fondo desenfocado */}
                                <motion.div
                                    className="blur-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={handleToggleMenu} // cerrar al hacer clic fuera
                                />

                                {/* Menú lateral izquierdo */}
                                <motion.ul


                                    className='header-ul'
                                    initial={{ x: '-100%', opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: '-100%', opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <li className="header-li">
                                        <a href="#about" onClick={handleLinkClick}>LA MESITA</a>
                                    </li>
                                    <li className="header-li">
                                        <a href="#cajas" onClick={handleLinkClick}>NUESTRAS CAJITAS</a>
                                    </li>
                                    <li className="header-li">
                                        <a href="#info" onClick={handleLinkClick}>VISÍTANOS</a>
                                    </li>


                                    <div className="politica-redes">
                                        <p className="privacidad">POLÍTICA <br/> DE PRIVACIDAD</p>

                                        <div className="rrss">
                                        <AiFillInstagram  style={{marginTop:'0.3rem'}}className="icons"/>

                                        <FaTiktok className="icons"/>



                                     


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
