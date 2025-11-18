import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Saudacao({nome}){
  return<h1>Olá, {nome}</h1>
}


function myApp(){
  return (<Saudacao nome = "Olivia"/>)
}

export default myApp