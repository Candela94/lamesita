




import './cajas.css'

import { cajas } from '../../../data/cajas';
import { Cajas } from '../../component/cards/Cards';
import { useState } from 'react';
import {motion, AnimatePresence} from 'framer-motion'
import { Contacto } from '../../component/cards/Cards';


const CajasSection = () => {


    const [cajaAbierta, setCajaAbierta] = useState(null);

    const handleToggle = (id) => {
        setCajaAbierta(prev => prev === id ? null : id); // si clicas la misma, la cierra
    };

    return (



        <>
            <section className="section section-cajas">




                <div className="texto-cajas">

                    
                    <h1 className='titulo-cajas'>LO JUSTO PARA UN GRAN MOMENTO</h1>


                    <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum voluptate dolor! Dolore eligendi, debitis sunt eos nam error perspiciatis fugit labore, maxime nobis inventore commodi necessitatibus. Hic, amet nisi.
                        Doloribus consectetur voluptatem officiis dignissimos illo facilis natus labore at dolor assumenda sit</p>


                </div>


...

<div className="galeria">
  <AnimatePresence>
  {cajas.map((c, i) => (
  <li
    key={i}
    className="cajas-li"
    style={{ zIndex: i }} // 👈 Esto hace que la PRIMERA tenga el índice más bajo
  >
    <Cajas
      caja={c}
      isOpen={cajaAbierta === i}
      onToggle={() => handleToggle(i)}
    />
  </li>
))}


  </AnimatePresence>
</div>



                {/* <Contacto /> */}


            </section>


        </>
    );
}





export default CajasSection;