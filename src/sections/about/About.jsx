import './about.css';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {




    // Texto de "La Mesita"
    const descripcion = `No hace falta una gran mesa.
Ni mantel de lino, ni invitación formal.
El mejor momento cabe en un rincón del balcón, la encimera de la cocina, la pausa entre dos cosas, el brindis antes de la comida.
La Mesita nace de ahí.
De lo pequeño que se hace grande. Del sabor que no necesita excusas. De lo que se comparte sin ceremonia, pero con amor.
Somos de acá.
De los sabores que tienen historia, de los gestos simples que se repiten con cariño.
Porque los grandes momentos caben en una mesita.`;





    useEffect(() => {
        // Scroll al inicio al cargar (opcional)
        window.scrollTo(0, 0);
    }, []);





    return (



        <section className="section section-about">
            <img
                src="/img/fondo-about.jpg"
                alt="fondo"
                className="fondo-img" />

            <div className="fondo">
                {/* <h1 className="conoce">TODO NACE   <br />DE LO SENCILLO</h1> */}


                    <div className="mesita-texto">
                        {descripcion.split('\n').map((frase, i) => (
                            <p key={i} className="contenido-parrafo">
                                {frase}
                            </p>
                        ))}
                    </div>

                

            </div>



 
           <div className="texto-final">
                <h2 className='closing'>TODO NACE DE LO SENCILLO</h2>
            </div> 
        </section>
    );
};

export default About;