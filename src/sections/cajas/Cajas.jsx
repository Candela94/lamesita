




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



     


        <div className="galeria">
            
        <h1 className='titulo'>SECCIÓN CAJITAS</h1>

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