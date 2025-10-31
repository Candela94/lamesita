

import { createBrowserRouter } from "react-router";

import App from '../App'
import Landing from "../sections/landing/Landing";

import Datos from "../sections/datos/Datos";



const router = createBrowserRouter([{

    path: '/',
    element: <App />,
    children: [

        {
            index: true,
            element:<Landing />
        },



      

        {
            path: "/privacy",
            element: <Datos />
        },



    ]

    


}])


export default router