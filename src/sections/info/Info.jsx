import './info.css'
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Card, Location } from '../../component/cards/Cards';


const Info = () => {


    
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imgRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 1.1,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'bounce.out',
      }
    );
  }, []);



  return (
    <section className="section ubicacion">

        <div className="mapa">
          <h1 className="titulo-ubicacion">VEN A VERNOS AL MERCADO</h1>




          <div className="mapa-card">

        



            <div className="imagen-mapa">
              <img
                ref={imgRef}
                src="/img/mercado.png"
                alt="mercado"
                className="ilu-mercado"
              />



            </div>

            <div className="horarios">
              <Card dia="Lunes a Sábado" horario="8:00 a 14:30" />
              {/* <Card dia="Domingo" horario="cerrado" /> */}
              <Location />

            </div>

          </div>
        </div>
   
    </section>
  );
};

export default Info;
