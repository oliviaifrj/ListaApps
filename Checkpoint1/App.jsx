import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const comandante = " Marina Sena";
  const planetaDestino = {
    nome: "Marte",
    temperatura: "10°C",
    gravidade: "7g",
    descricao: "Um mistério de Coisas Naturais.",
    clima: "Sol",
  };

  const statusMissao = {
    distanciaTotal: 200000000,
    distanciaPercorrida: 11132900,
  };

  const previsao = {
    clima: "Neve",
    umidadeSolar: "Alta",
    radiacaoCosmica: "Baixa",
  };

  const relatorio = [
    "Decolagem concluída com sucesso",
    "Entrada no hiperespaço",
    "Contato com estação Espacial",
    "Ajuste de rota realizado",
  ];

  const progresso =
    (statusMissao.distanciaPercorrida / statusMissao.distanciaTotal) * 100;

  const iconesClima = {
    sol: "☀️",
    tempestade: "🌩️",
    neve: "❄️",
    nuvens: "☁️",
    radiação: "☢️",
  };

  const agora = new Date();
  const diasSemana = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const diaSemana = diasSemana[agora.getDay()];
  const dia = agora.getDate();
  const mes = meses[agora.getMonth()];
  const ano = agora.getFullYear();

  return (
    <div
      className="App"
      style={{
        background: "#0d0d0d",
        color: "#00ffcc",
        fontFamily: "monospace",
        padding: "2rem",
      }}
    >
      <h1>Bem-vinda, Comandante {comandante} </h1>
      <p>
        Hoje é {diaSemana}, {dia} de {mes} de {ano}
      </p>

      <h2>Status da Missão</h2>
      <p>Progresso: {progresso.toFixed(1)}%</p>
      <progress
        value={progresso}
        max="100"
        style={{ width: "100%" }}
      ></progress>

      <h2>Planeta de Destino: {planetaDestino.nome}</h2>
      <p>{planetaDestino.descricao}</p>
      <p>Temperatura: {planetaDestino.temperatura}</p>
      <p>Gravidade: {planetaDestino.gravidade}</p>
      <p>
        Clima: {iconesClima[planetaDestino.clima] || "🛰️"} (
        {planetaDestino.clima})
      </p>

      <h2>Previsão do Tempo</h2>
      <p>
        Clima: {iconesClima[previsao.clima] || "🌤️"} ({previsao.clima})
      </p>
      <p>Umidade Solar: {previsao.umidadeSolar}</p>
      <p>Radiação Cósmica: {previsao.radiacaoCosmica}</p>

      <h2>Relatório de Bordo</h2>
      <ol>
        {relatorio.map((evento, index) => (
          <li key={index}>{evento}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
