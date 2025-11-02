import { useState } from "react";
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
                                            <a target="_blank" href="https://www.instagram.com/lamesita.valencia
"><RiInstagramFill style={{ marginTop: '0.3rem' }} className="icons" /></a>

                                            <a target="_blank" href="https://www.tiktok.com/@lamesita.valencia"><FaTiktok className="icons" /></a>






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

    return (


        <>
            <header className="header-desk">
                <nav className="desk-nav">
                    <ul className="desk-ul">
                        <li className="desk-li"><a href="#about">LA MESITA</a></li>
                        <li className="desk-li"><a href="#cajas">NUESTRAS CAJITAS</a></li>
                        <li className="desk-li"><a href="#info">VISÍTANOS</a></li>


                       
                            <ul className="redes-lista">

                                <li className="redes-icons"> <a target="_blank" href="https://www.instagram.com/lamesita.valencia"><RiInstagramFill className="icons-desk" /></a></li>
                                <li className="redes-icons"> <a target="_blank" href="https://www.tiktok.com/@lamesita.valencia"><FaTiktok className="icons-desk" /></a></li>
                            </ul>
                       
                    </ul>
                </nav>
            </header>

        </>
    );
}