import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function MeuRestaurante() {
  const pratos = [
    { nome:'Hamburguer' , preco: 23.90, descricao:'Pão, carne e queijo'},
    { nome:'Filé com fritas' , preco: 35.80, descricao:'Filé grelhado com batatas fatiadas e fritas'},
    { nome:'Lasanha bolonhesa' , preco: 39.00, descricao:'Lasanha com molho bolonhesa'},
    { nome:'Risoto de gorgonzola' , preco: 36.70, descricao:'Arroz arbóreo com queijo gorgonzola'}
  ];

  return(
    <div>
      <h1>Cardápio do Restaurante</h1>
      <div className = "menu-grid">
        {pratos.map((prato, index) => (
        <div key = {index} className = "prato-card">
          <h3>{prato.nome}</h3>
          <p className="preco">R$ {prato.preco.toFixed(2)}</p>
          <p className="descricao">{prato.descricao}</p>
        </div>
        ))}
      </div>
    </div>
  );
}

export default MeuRestaurante;
