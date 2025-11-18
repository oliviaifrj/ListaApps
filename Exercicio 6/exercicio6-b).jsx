import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MostrarEsconder(){
  const[mostrar, setMostrar] = useState(false);
 
  return(
  <div>
    <button onClick={() => setMostrar (!mostrar)}>
      {mostrar ? 'Esconder foto' : 'Mostrar foto'}
    </button>
    {mostrar && <img src="src/assets/marina-sena.jpg"/>}
  </div>
  );
}

export default MostrarEsconder

