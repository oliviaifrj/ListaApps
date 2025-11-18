import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CartaoLivro({titulo, autor, ano, genero}){  
  return(
    <div>
      <h2>{titulo}</h2>
      <p><strong>Autor: </strong>{autor}</p>
      <p><strong>Ano: </strong>{ano}</p>
      <p><strong>Gênero: </strong>{genero}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <CartaoLivro titulo = "IDIOTAS" autor = "Jakob Arjouni" ano = {2006} genero = "Conto"/>
    </div>
  );
}

export default App;
