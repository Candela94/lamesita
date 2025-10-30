



import './introduccion.css'
import { FondoIntro } from '../../component/fondo-intro/FondoIntro';






const Introduccion = ({id}) => {


    return (

        <>


            <section id={id} className="section section-intro">


                <div className="intro-imagen">

                    <img src="/img/fondo--fondo.jpg" alt="paisaje" className="imagen-fondo" />



                    <div className="logo-cta">
                        <div className="logo-container">
                        <img src="/img/LOGO_AZUL_1.png" alt="logo" className="logo" />
                        </div>
                        <div className="btn-cont">
                            <a className="boton-cta" href='#cajas'>
                                Disfruta sin complicaciones                  </a>
                        </div>

                    </div>



                </div>




        <img src="/img/png/botella.png" alt="botella" className="png uno" />
        <img src="/img/png/copa.png" alt="copa" className="png dos" />
        <img src="/img/png/miel.png" alt="miel" className="png tres" />
        <img src="/img/png/pan.png" alt="pan" className="png cuatro" />
        <img src="/img/png/queso.png" alt="queso" className="png cinco" />
        <img src="/img/png/sacacorchos.png" alt="sacacorchos" className="png seis" />
        <img src="/img/png/tabla.png" alt="tabla" className="png siete" />      
        <img src="/img/png/miel.png" alt="miel" className="png ocho" />





                {/* 
            <div className="intro-slider">
                <FondoIntro />

            </div> */}







            </section>



        </>
    );



}





export default Introduccion;