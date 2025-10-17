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



            {tabActivo && (



                <>
                    <img src={tabActivo.fondo} alt='img' className="imagen-fondo" />

                    <div className="fondo">
                        <h1 className='conoce'>CONOCE <br /> {tabActivo.nombre}</h1>

                        {/* <header className="subheader">
                            <nav className="subheader-nav">
                                <div className="subheader-tabs">
                                    {tabs
                                        .filter(tab => tab.nombre !== activeTab)
                                        .map(tab => (
                                            <div
                                                key={tab.nombre}
                                                className="tab-option"
                                                onClick={() => setActiveTab(tab.nombre)}
                                            >
                                                <span className="tab-icon">
                                                    <MdOutlineChangeCircle /> {tab.nombre}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </nav>
                        </header> */}

                        <section className="tab-content">
                            
                            <div className="contenido">


                                <div className="mesita-texto">
                                    {tabActivo.descripcion.split('\n').map((frase, i) => (
                                        <p key={i} className="contenido-parrafo">{frase}</p>
                                    ))}

                                </div>


                                <div className="ilustracion">
                                    <img src={tabActivo.img} alt="ilu" className="ilu" />

                                </div>
                            </div>
                        </section>
                    </div>
                </>




            )}





        </section>
    );
};

export default About;
