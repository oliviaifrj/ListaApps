import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [time, setTime] = useState("");
  const [pontuacao, setPontuacao] = useState(0);
  const [lista, setLista] = useState([]);

  const adicionarTime = () => {
    let verificacao = true;

    lista.forEach((element) => {
      if (element.nomeTime == time) {
        element.pontuacao = pontuacao;
        verificacao = false;
        setLista(lista.sort((a, b) => b.pontuacao - a.pontuacao));
        setPontuacao(0);
        setTime("");
      }
    });

    if (verificacao) {
      if (pontuacao && time) {
        const obje = {
          nomeTime: time,
          pontuacao: pontuacao,
        };


        setLista([...lista, obje].sort((a, b) => b.pontuacao - a.pontuacao));
        setPontuacao(0);
        setTime("");
      }
    }
  };

  return (
    <div>
      <h2>Lista de Times</h2>
      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Digite seu time"
      />
      <input
        type="number"
        value={pontuacao}
        onChange={(e) => setPontuacao(e.target.value)}
        placeholder="Digite a pontuação"
      />
      <button onClick={adicionarTime}>Adicionar time</button>

      <ul>
        Times e suas pontuações
        {lista.map((itemLista, index) => (
          <li key={index}>
            <strong>Nome do Time:</strong> {itemLista.nomeTime}
            <p>
              <strong>Pontuação:</strong> {itemLista.pontuacao}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



