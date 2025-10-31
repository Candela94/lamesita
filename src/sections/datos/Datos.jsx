

import './datos.css'
import { NavLink } from 'react-router';


const Datos = () => {
    return (

        <section className='section'>



            <main className="datos-main">


                <h1 className="datos-titulo">TU<br/> PRIVACIDAD <br /> SE QUEDA EN <br />LA MESITA</h1>
                <div className="texto-datos-container">




                    <p className="datos-texto"> En La Mesita creemos en las cosas simples, honestas y bien hechas.
Cuando nos escribes por WhatsApp o por cualquier otro medio, <strong>usamos tus datos solo para lo que tiene sentido: responderte y ayudarte.</strong>


                    </p>


                    <p className="datos-texto">

                    <strong> No guardamos información para campañas, ni compartimos tus datos con nadie.</strong>
Tu conversación con nosotros se queda entre nosotros, como una charla de confianza al otro lado de la mesa.

                    </p>


                    <p className="datos-texto">
                    Cuidamos tu privacidad con el mismo cuidado que ponemos en cada detalle: con <strong>respeto, cercanía y atención.</strong>
                    Porque los buenos momentos —y las buenas conversaciones— siempre empiezan con confianza.</p>





                </div>

                <div className="boton-datos-container"><NavLink to='/'>
 Aceptar y volver al inicio</NavLink>
</div>


            </main>
        </section>
    );
}

export default Datos;