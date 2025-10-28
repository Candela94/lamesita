import './info.css'
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Card, Contacto, Location } from '../../component/cards/Cards';
import { FaAngleDown } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const Info = () => {



  const [visible, setVisible] = useState(false);

  const [renderDesplegable, setRenderDesplegable] = useState(false);

  const desplegableRef = useRef(null);

  const opcionesRef = useRef([]);




  const handleToggle = () => {
    if (!visible) {
      // Abriendo
      setRenderDesplegable(true);
      setVisible(true);
    } else {
      // Cerrando
      setVisible(false);
    }
  };




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

  // Animación del desplegable
  useEffect(() => {


    if (visible && renderDesplegable) {

      // ABRIR: Anima el contenedor desplegable
      gsap.fromTo(
        desplegableRef.current,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );

      // ABRIR: Anima cada opción con delay
      gsap.fromTo(
        opcionesRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.2,
        }
      );
    } else if (!visible && renderDesplegable) {
      // CERRAR: Anima las opciones primero
      gsap.to(opcionesRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        stagger: 0.1,
        ease: 'power2.in',
      });

      // CERRAR: Luego cierra el contenedor
      gsap.to(desplegableRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.2,
        onComplete: () => {
          setRenderDesplegable(false); // Quita del DOM cuando termina
        },
      });
    }


  }, [visible, renderDesplegable]);

  

  return (





    <main className="mapa-card section">



      <div className="titulo-ilustracion">



        <h1 className="titulo-ubicacion">VEN A VERNOS AL MERCADO</h1>


         <div className="imagen-mapa"> 
          <img
            ref={imgRef}
            src="/img/merc.png"
            alt="mercado"
            className="ilu-mercado"
          />
         </div> 


      </div>





      <div className="horarios">
        <Card dia="LUNES A SÁBADO" horario="8:00 a 14:30" />
        <Location />
      </div>


      <div className="footer">
        <div className="mensaje">
          <ul className="mensaje-opciones">
            <div className="mensajito-wrapper">
              <div className="mensajito" onClick={handleToggle}>
                <h3 className="titulo">ENVÍA UN MENSAJITO</h3>
                <FaAngleDown className={visible ? 'flecha-rotada' : ''} />
              </div>

              {renderDesplegable && (
                <ul
                  ref={desplegableRef}
                  className="mensaje-opciones-desplegable"
                >
                  <li
                    ref={el => opcionesRef.current[0] = el}
                    className="opcion-mensaje"
                    onClick={() => window.location.href = 'https://wa.me/34665940987'}

                  >
                   
                    <h4 className="opcion">CHATÉANOS</h4>
                    <IoLogoWhatsapp style={{marginBottom:'0.3rem'}}/>
                  </li>




                  <li
                    ref={el => opcionesRef.current[1] = el}
                    className="opcion-mensaje"
                    onClick={() => window.location.href = 'mailto:hola@lamesita.es'}

                  >
                    {/* <IoMail /> */}
                    <h4 className="opcion">ESCRIBE UN CORREITO</h4>
                  </li>
                </ul>
              )}
            </div>

            <div className="mensajito-phone"
              onClick={() => window.location.href = 'tel:+34665940987'} 
>
              {/* <BsFillTelephoneFill /> */}
              <h3 className="titulo">LLÁMANOS</h3>
            </div>
          </ul>
        </div>
        </div>



    </main>



  );
};

export default Info;