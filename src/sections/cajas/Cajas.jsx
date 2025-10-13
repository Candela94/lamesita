




import './cajas.css'

import { cajas } from '../../../data/cajas';
import { Cajas } from '../../component/cards/Cards';




const CajasSection = () => {

    return ( 



        <>
        <section className="section section-cajas">



        <h1 className='titulo'>SECCIÓN CAJITAS</h1>


        <div className="galeria">

            {

                cajas.map((c) => (
                    <ul className="galeria-cajas">
                        <li className="cajas-li"><Cajas caja={c}/></li>

                    </ul>
                ))
            }
        </div>


        </section>
        
        
        </>
     );
}
 
export default CajasSection;