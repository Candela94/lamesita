import './introduccion.css'
import { useState, useEffect } from 'react';
import { FondoIntro, FondoIntroDesk } from '../../component/fondo-intro/FondoIntro';

const Introduccion = ({ id }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScrollTo = (e, targetId) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            document.documentElement.style.scrollSnapType = "none";
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
                document.documentElement.style.scrollSnapType = "y proximity";
            }, 1000);
        }
    };

    return (
        <>
            <section id={id} className="section section-intro">
                <div className="intro-imagen">
                    <picture>
                        <source
                            media="(min-width: 1024px)"
                            srcSet="https://res.cloudinary.com/dnz96cick/image/upload/v1762086153/LAMESITA_1_b102ar.jpg"
                        />
                    </picture>

                    <div className="logo-cta">
                        <div className="btn-cont">
                            <a className="boton-cta" onClick={(e) => handleScrollTo(e, 'cajas')}>
                                Disfruta sin complicaciones
                            </a>
                        </div>
                    </div>
                </div>

                <picture className="png">
                    {isDesktop ? <FondoIntroDesk /> : <FondoIntro />}
                </picture>
            </section>
        </>
    );
};

export default Introduccion;
