



import './introduccion.css'
import { FondoIntro } from '../../component/fondo-intro/FondoIntro';






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
                            srcSet="https://res.cloudinary.com/dnz96cick/image/upload/v1762086153/LAMESITA_1_b102ar.jpg"
                        />

                        {/* Imagen por defecto (móvil/tablet) */}
                        {/* <img
                            src="img/fondo-ajustado.png"
                            alt="paisaje"
                            className="imagen-fondo"
                            loading="lazy"
                        /> */}
                        <FondoIntro />
                    </picture>



                    <div className="logo-cta">
                        {/* <div className="logo-container">
                        <img src="/img/LOGO_BEIGE_1.png" alt="logo" className="logo" /> */}
                        {/* </div> */}
                        <div className="btn-cont" >
                            <a  className="boton-cta" onClick={(e) => handleScrollTo(e, 'cajas')}>
                                Disfruta sin complicaciones                  </a>
                        </div>

                    </div>



                </div>



                {/* <picture className="png">

        <source media="(min-width:768px)" srcSet="/img/desktop.png" />
        <img src="/img/MOBILE.png" alt="Fondo" className="imagen-fondo" />


        </picture> */}






                {/* 
            <div className="intro-slider">
                <FondoIntro />

            </div> */}







            </section>



        </>
    );



}





export default Introduccion;