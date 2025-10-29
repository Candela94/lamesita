



import './introduccion.css'
import { FondoIntro } from '../../component/fondo-intro/FondoIntro';






const Introduccion = () => {


    return ( 

        <>


        <section className="section section-intro">


            <div className="intro-imagen">

                <img src="/img/fondo--fondo.jpg" alt="paisaje" className="imagen-fondo" />



        <div className="logo-cta">
                <img src="/img/LOGO_BEIGE_1.png" alt="logo" className="logo" />

                <div className="btn-cont">
                    <a className="boton-cta" href='#cajas'>
                       CTA CAJAS
                    </a>
                </div>

                </div>
             
                

            </div>


{/* 
            <div className="intro-slider">
                <FondoIntro />

            </div> */}
        






        </section>
        
        
        
        </>
     );



}




 
export default Introduccion;