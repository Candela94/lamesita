

import { createBrowserRouter } from "react-router";

import App from '../App'
import Landing from "../sections/landing/Landing";





const router = createBrowserRouter([{

    path: '/',
    element: <App />,
    children: [

        {
            index: true,
            element:<Landing />
        },


    ]

    


}])


export default router