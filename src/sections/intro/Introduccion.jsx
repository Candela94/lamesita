



import './introduccion.css'
import { FondoIntro } from '../../component/fondo-intro/FondoIntro';






const Introduccion = () => {


    return ( 

        <>


        <section className="section section-intro">


            <div className="intro-imagen">

                <img src="/img/paisaje.jpg" alt="paisaje" className="imagen" />
                {/* <FondoIntro /> */}

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