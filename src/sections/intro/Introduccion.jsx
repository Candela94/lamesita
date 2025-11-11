import './introduccion.css';
import { motion } from 'framer-motion'; // 🆕 importa framer motion

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
              srcSet="https://res.cloudinary.com/dnz96cick/image/upload/v1762086153/LAMESITA_2_j1vvpo.jpg"
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
            <motion.div
              className="btn-cont"
              initial={{ opacity: 0, scale: 0.95}}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.3
              }}
              viewport={{ once: false, amount: 0.4 }}
              whileHover={{ scale: 1.01 }} // 💫 opcional: pequeño efecto hover
            >
              <a
                className="boton-cta"
                onClick={(e) => handleScrollTo(e, 'cajas')}
              >
                Disfruta sin complicaciones
              </a>
            </motion.div>
          </div>
        </div>

      </section>
    </>
  );
};

export default Introduccion;
