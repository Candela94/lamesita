

import { GiBoltSaw } from 'react-icons/gi';
import './fondoIntro.css'
import { useEffect, useState } from 'react';

export const FondoIntro = () => {


    const fondos = [

        {id:1, src: 'img/fondo-ajustado.png'},

        {id:2, src: 'https://res.cloudinary.com/dnz96cick/image/upload/v1762086151/IMG_4150_whzsuw.jpg'},


        

     
    
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






export const FondoIntroDesk = () => {


    const fondos = [

        {id:1, src:  
            'https://res.cloudinary.com/dnz96cick/image/upload/v1762086153/LAMESITA_2_j1vvpo.jpg',

        },

        {id:2, src:    'https://res.cloudinary.com/dnz96cick/image/upload/v1762086152/LAMESITA_-8_jdccar.jpg' 
        },


        

     
    
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