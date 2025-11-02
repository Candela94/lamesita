import './datos.css';

import { useNavigate } from 'react-router';
import { useState } from 'react';
import {motion} from 'framer-motion'

const Datos = () => {
    const navigate = useNavigate();
    const [isExiting, setIsExiting] = useState(false);

    const handleAceptar = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate('/');
        }, 500); // igual al duration de la animación
    };

    return (
        <section className='section'>
            <motion.main
                className="datos-main"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="datos-titulo">
                    TU PRIVACIDAD <br /> SE QUEDA  <br /> EN LA MESITA
                </h1>

                <div className="texto-datos-container">
                    <p className="datos-texto">
                        En La Mesita creemos en las cosas simples, honestas y bien hechas.
                        Cuando nos escribes por WhatsApp o por cualquier otro medio,
                        <strong> usamos tus datos solo para lo que tiene sentido: responderte y ayudarte.</strong>
                    </p>

                    <p className="datos-texto">
                        <strong>No guardamos información para campañas, ni compartimos tus datos con nadie.</strong>
                        Tu conversación con nosotros se queda entre nosotros, como una charla de confianza al otro lado de la mesa.
                    </p>

                    <p className="datos-texto">
                        Cuidamos tu privacidad con el mismo cuidado que ponemos en cada detalle: con
                        <strong> respeto, cercanía y atención.</strong>
                        Porque los buenos momentos —y las buenas conversaciones— siempre empiezan con confianza.
                    </p>
                </div>

                <div className="boton-datos-container" onClick={handleAceptar}>
                
                        Aceptar y volver al inicio
                   
                </div>
            </motion.main>
        </section>
    );
};

export default Datos;
