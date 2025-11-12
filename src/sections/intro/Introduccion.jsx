import './introduccion.css'

const Introduccion = ({ id }) => {

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
                        {/* Imagen para pantallas grandes (desktop) */}
                        <source
                            media="(min-width: 1024px)"
                            srcSet= 'https://res.cloudinary.com/dnz96cick/image/upload/v1762086153/LAMESITA_2_j1vvpo.jpg'

                        />

                        {/* Imagen por defecto (móvil / tablet) */}
                        <img
                            src="img/fondo-ajustado.png"
                            alt="Fondo de La Mesita"
                            className="imagen-fondo"
                            loading="lazy"
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

                {/* <picture className="png">
                    <source media="(min-width:768px)" srcSet="/img/desktop.png" />
                    <img src="/img/mobile.png" alt="Decoración" loading="lazy" />
                </picture> */}
            </section>
        </>
    );
};

export default Introduccion;
