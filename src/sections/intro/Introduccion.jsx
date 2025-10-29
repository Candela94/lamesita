



import './introduccion.css'
import { FondoIntro } from '../../component/fondo-intro/FondoIntro';






const Introduccion = () => {


    return ( 

        <>


        <section className="section section-intro">


            <div className="intro-imagen">

                <img src="/img/fondo--fondo.jpg" alt="paisaje" className="imagen-fondo" />

                <img src="/img/LOGO_BEIGE_1.png" alt="logo" className="logo" />


                {/* <video src="https://res.cloudinary.com/dnz96cick/video/upload/v1761643191/4877881-sd_426_226_25fps_xcrvzb.mp4" autoPlay muted loop playsInline className='imagen'></video> */}

                {/* <img src="/img/bolsa.png" alt="bolsa" className="mockup" /> */}
                

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