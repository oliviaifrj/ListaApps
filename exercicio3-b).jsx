import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ListaComidas() {
  const pratos = ["Macarrão a bolonhesa", "Strogonoff", "Lasanha quatro queijos", "Empada"];

  return (
    <div>
      <h2>Minhas comidas favoritas</h2>
      <ul>
        {pratos.map((prato, index) => (
          <li key={index}>{prato}</li>
        ))}
      </ul>{" "}
    </div>
  );
}

export default ListaComidas;
