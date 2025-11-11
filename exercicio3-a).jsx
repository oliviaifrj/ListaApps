import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function ListaHobbies() {
  const hobbies = ['Ler', 'Colorir', 'Escrever', 'Cozinhar']

  return(
    <div>
      <h2>Meus Hobbies Favoritos</h2>
      <ul>
        {hobbies.map((hobby, index) => (
         <li key = {index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaHobbies
