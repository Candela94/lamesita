




import './cajas.css'

import { cajas } from '../../../data/cajas';
import { Cajas } from '../../component/cards/Cards';
import { useState } from 'react';

import { Contacto } from '../../component/cards/Cards';


const CajasSection = () => {


    const [cajaAbierta, setCajaAbierta] = useState(null);

    const handleToggle = (id) => {
      setCajaAbierta(prev => prev === id ? null : id); // si clicas la misma, la cierra
    };

    return ( 



        <>
        <section className="section section-cajas">


        <h1 className='titulo-cajas'>ELIGE <br /> LO JUSTO PARA <br /> UN GRAN MOMENTO</h1>


<p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cum voluptate dolor! Dolore eligendi, debitis sunt eos nam error perspiciatis fugit labore, maxime nobis inventore commodi necessitatibus. Hic, amet nisi.
Doloribus consectetur voluptatem officiis dignissimos illo facilis natus labore at dolor assumenda sit, eaque consequatur illum dicta sint eligendi quo, non nostrum nisi aliquid praesentium. Laborum unde minima aspernatur voluptatum?</p>

     


        <div className="galeria">
            
       
            {

                cajas.map((c,id) => (
                    <ul className="galeria-cajas">
                        <li key={id} className="cajas-li"><Cajas caja={c} isOpen={cajaAbierta===id}          onToggle={() => handleToggle(id)}
                        /></li>

                    </ul>
                ))
            }
        </div>



        {/* <Contacto /> */}


        </section>
        
        
        </>
     );
}




 
export default CajasSection;