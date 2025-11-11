import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Temperatura(){
  const[temperatura, setTemp] = useState(20);
  
  const getCorTemperatura = (temp) => {
  if(temp < 15) return '#4a90e2';
  if(temp < 25) return '#f5a623';
  return '#d0021b'
};

  return(
  <div style ={{
      fontSize: '48px',
      fontWeight: 'bold',
      color: getCorTemperatura(temperatura),
      textShadow: '2px 2px 4px #312800ff'
    }}>

    <h2>Temperatura: {temperatura}°c</h2>
    <button onClick={() => setTemp (temperatura + 2)}>+2</button>
    <button onClick={() => setTemp (temperatura - 2)}>-2</button>
  </div>

  );
}

export default Temperatura;