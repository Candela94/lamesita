

import './fondoIntro.css'
import { useEffect, useState } from 'react';

export const FondoIntro = () => {


    const fondos = [

        {id:1, src: 'https://i.pinimg.com/736x/35/f5/e2/35f5e21b989353b4295650fa101a70be.jpg'},

        {id:2, src: 'https://i.pinimg.com/736x/27/f2/3c/27f23c4cc35f99475269ade343c5bbb9.jpg'},

        {id:3, src: 'https://i.pinimg.com/736x/b2/da/9d/b2da9dd64d50e47edbabcd157a658963.jpg'},

        {id:4, src: 'https://i.pinimg.com/736x/b3/60/9e/b3609e978376f5c472f2a9f7b7446aae.jpg'}

    
    ]


    const [id, setId] = useState(0);
    const [prevId, setPrevId] = useState(fondos.length -1)

    useEffect(() => {

        const interval = setInterval(() => {

            setPrevId(id);
            setId((prev) => (prev + 1) % fondos.length)

            
        }, 1500)

        return () => clearInterval(interval)
    } , [id])









    return ( 

        <>
        
        <div className="fondo-container">
      
        {
            fondos.map((f, index) => (
                <img key={f.id} src={f.src} alt={`Fondo numero ${f.id}`}       className={`fondo-imagen ${index === id ? 'active' : 'inactive'}`}
                />
            ))
        }

        </div>
        
        
        </>



     );
}