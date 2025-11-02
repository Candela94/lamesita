

import { GiBoltSaw } from 'react-icons/gi';
import './fondoIntro.css'
import { useEffect, useState } from 'react';

export const FondoIntro = () => {


    const fondos = [

        {id:1, src: 'img/fondo-ajustado.png'},

        {id:2, src: 'img/fondo-bolsa.png'},

     
    
    ]


    const [id, setId] = useState(0);
    const [prevId, setPrevId] = useState(fondos.length -1)

    useEffect(() => {

        const interval = setInterval(() => {

            setPrevId(id);
            setId((prev) => (prev + 1) % fondos.length)

            
        }, 2500)

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