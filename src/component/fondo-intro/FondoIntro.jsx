

import './fondoIntro.css'
import { useEffect, useState } from 'react';

export const FondoIntro = () => {


    const fondos = [

        {id:1, src: 'https://i.pinimg.com/736x/16/18/9a/16189a394e673cc2e02939dec6fc9625.jpg'},

        {id:2, src: 'https://i.pinimg.com/736x/b2/f5/7e/b2f57e7671aa0aa8a705a7f93a9a7e7a.jpg'},

        {id:3, src: 'https://i.pinimg.com/1200x/e6/66/78/e66678c3ca0f1422e0f4f3a03564542a.jpg'},

        {id:4, src: 'https://i.pinimg.com/736x/c9/5b/27/c95b2711477a187a64229bc98b49fbb4.jpg'}

    
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