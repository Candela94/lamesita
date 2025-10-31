import { FondoIntro } from "./component/fondo-intro/FondoIntro"
import { Outlet } from "react-router"

import { AnimatePresence } from "framer-motion"
function App() {

  return (

    <>

    {/* <main className="main-principal"> */}

<AnimatePresence mode="wait">
<Outlet key={location.pathname}/>
</AnimatePresence>
{/* </main> */}
  
    </>
  )
}

export default App
