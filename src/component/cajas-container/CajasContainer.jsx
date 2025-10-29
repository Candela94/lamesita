


import { Cajas } from "../cards/Cards";
import { CajaPersonalizada } from "../cards/Cards";



export const CajasContainer = ({ caja, isOpen, onToggle }) => {
    const esPersonalizada = caja.nombre === 'HAZ TU PROPIA CAJITA';
    
    return esPersonalizada ? (
      <CajaPersonalizada caja={caja} isOpen={isOpen} onToggle={onToggle} />
    ) : (
      <Cajas caja={caja} isOpen={isOpen} onToggle={onToggle} />
    );
  };