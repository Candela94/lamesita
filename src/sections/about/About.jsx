import './about.css'
import { useState } from 'react';
import { MdOutlineChangeCircle } from "react-icons/md";







const About = () => {
    const [activeTab, setActiveTab] = useState('LA MESITA');




    const tabs = [
        {
            nombre: 'LA MESITA',
            descripcion:
                'No hace falta una gran mesa.\nNi mantel de lino, ni invitación formal.\nEl mejor momento cabe en un rincón del balcón, la encimera de la cocina, la pausa entre dos cosas, el brindis antes de la comida.\nLa Mesita nace de ahí.\nDe lo pequeño que se hace grande. Del sabor que no necesita excusas. De lo que se comparte sin ceremonia, pero con amor.\nSomos de acá.\nDe los sabores que tienen historia, de los gestos simples que se repiten con cariño.\nPorque los grandes momentos caben en una mesita.',
            fondo: '/img/paisaje.jpg',
            img: '/img/ilu-mercado.png',
            h1: 'CONOCE'
        },

    ];





    const tabActivo = tabs.find(tab => tab.nombre === activeTab);






    return (



        <section className='section section-about'>



            <img src='/img/fondo-about.jpg' alt="fondo" className="fondo-img" />





            <div className="fondo">

                {/* <h1 className='conoce'>CONOCE <br /> LA MESITA</h1> */}


                <div className="mesita-imagen">
                <img src="/img/mesita.png" alt="ilustración mesita" className="imagen-about" />
            </div>


                <div className="mesita-texto">
                    {tabActivo.descripcion.split('\n').map((frase, i) => (
                        <p key={i} className="contenido-parrafo">{frase}</p>
                    ))}

                </div>



           




            </div>

          










        </section>
    );
};

export default About;
