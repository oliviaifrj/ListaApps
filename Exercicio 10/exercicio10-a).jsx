import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numero1, setNumero1] = useState(0);
  const [numero2, setNumero2] = useState(0);
  const [resposta, setResposta] = useState("Nenhum cálculo foi realizado");

  const calcular = (operacao) => {
    if (operacao == "soma") {
      const resposta = (
        <p>
          O valor da soma entre {numero1} e {numero2} = {Number(numero1) + Number(numero2)}
        </p>
      );
      setResposta(resposta);
    }
    if (operacao == "subtracao") {
      const resposta = (
        <p>
          O valor da soma entre {numero1} é {numero2} = {numero1 - numero2}
        </p>
      );
      setResposta(resposta);
    }
    if (operacao == "divisao") {
      const resposta = (
        <p>
          O valor da soma entre {numero1} é {numero2} = {numero1 / numero2}
        </p>
      );
      setResposta(resposta);
    }
    if (operacao == "multiplicacao") {
      const resposta = (
        <p>
          O valor da soma entre {numero1} é {numero2} = {numero1 * numero2}
        </p>
      );
      setResposta(resposta);
    }
  };

  return (
    <div>
      <h2>Calculadora</h2>
      <input
        type="number"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
        placeholder="Digite o primeiro número"
      />


      <input
        type="number"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
        placeholder="Digite o segundo número"
      />
      <div>{resposta}</div>
      <div>
        <button onClick={() => calcular("soma")}>Somar</button>
        <button onClick={() => calcular("subtracao")}>Subtração</button>
        <button onClick={() => calcular("divisao")}>Divisão</button>
        <button onClick={() => calcular("multiplicacao")}>Multiplicação</button>
      </div>
    </div>
  );
}

export default App;



