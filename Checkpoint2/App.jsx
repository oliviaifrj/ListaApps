import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import{ useState, useMemo } from 'react';
function RPGApp() {

    const [nome, setNome] = useState("HERÓI MISTERIOSO");
    const [raca, setRaca] = useState("Humano");
    const [classe, setClasse] = useState("Guerreiro");
    const [atributos, setAtributos] = useState({ forca: 1, resistencia: 1, inteligencia: 1, sorte: 1 });
    const [pontosAtributo, setPontosAtributo] = useState(10);
    const [mostraStatus, setMostraStatus] = useState(false);

    const maxHp = 100 + atributos.resistencia * 5;
    const [hp, setHp] = useState(maxHp);
    const [xp, setXp] = useState(0);
    const [nivel, setNivel] = useState(1);
    const xpParaProxNivel = nivel * 300;

    const [ouro, setOuro] = useState(50);
    const [mostraLoja, setMostraLoja] = useState(false);

    const [inventarioAberto, setInventarioAberto] = useState(false);
    const [inventario, setInventario] = useState(['Espada', 'Poção de Cura (3x)', 'Mapa Antigo']);

    const [missaoInput, setMissaoInput] = useState('');
    const [missaoCategoriaInput, setMissaoCategoriaInput] = useState('Secundária');
    const [missoes, setMissoes] = useState([
        { id: 1, texto: 'Derrotar o Dragão', categoria: 'Principal', concluida: false },
        { id: 2, texto: 'Comprar 1 Poção', categoria: 'Secundária', concluida: false }
    ]);
    const missoesCompletas = missoes.filter(m => m.concluida).length;

    const [palavraBase, setPalavraBase] = useState('');
    const [encantamentoGerado, setEncantamentoGerado] = useState('');

    const [novoHeroiNome, setNovoHeroiNome] = useState('');
    const [novoHeroiClasse, setNovoHeroiClasse] = useState('Mago');
    const [herois, setHerois] = useState([
        { nome: 'Eldrin', nivel: 2, xp: 450, classe: 'Arqueiro' },
        { nome: 'Zargoth', nivel: 1, xp: 150, classe: 'Mago' },
        { nome: 'Você', nivel: nivel, xp: xp, classe: classe },
    ]);
    
    // FUNÇÕES
    const ganharOuro = (quantia) => setOuro(o => o + quantia);
    const gastarOuro = (quantia) => setOuro(o => Math.max(0, o - quantia));
    const comprarItem = (custo, item) => {
        if (ouro >= custo) {
            gastarOuro(custo);
            setInventario(prev => [...prev, item]);
            alert(`Você comprou: ${item}! (-15 Ouro)`);
        } else { alert('Ouro Insuficiente!'); }
    };
    const curar = () => { setHp(prev => Math.min(prev + 10, maxHp)); };
    const sofrerDano = () => {
        const danoBase = 15;
        const danoFinal = Math.max(1, danoBase - Math.floor(atributos.resistencia / 3));
        setHp(prev => Math.max(0, prev - danoFinal));
    };
    const ganharXp = (quantidade) => {
        setXp(prevXp => {
            let novoXp = prevXp + quantidade;
            let novoNivel = nivel;
            while (novoXp >= novoNivel * 300) {
                novoXp -= novoNivel * 300;
                novoNivel += 1;
                alert(`🎉 Parabéns! Você subiu para o Nível ${novoNivel}! 🎉`);
                setPontosAtributo(prev => prev + 5);
            }
            setNivel(novoNivel);
            setHerois(prev => prev.map(h => h.nome === 'Você' ? { ...h, nivel: novoNivel, xp: novoXp } : h));
            return novoXp;
        });
    };
    const adicionarMissao = () => {
        if (missaoInput.trim() !== '') {
            setMissoes([...missoes, { id: Date.now(), texto: missaoInput, categoria: missaoCategoriaInput, concluida: false }]);
            setMissaoInput('');
        }
    };
    const completarMissao = (id) => {
        setMissoes(prevMissoes => prevMissoes.map(m => m.id === id ? { ...m, concluida: true } : m));
        ganharXp(100);
        ganharOuro(25); 
    };
    const gerarEncantamento = () => {
        if (palavraBase.length > 0) {
            const baseReversa = palavraBase.toUpperCase().split('').reverse().join('');
            const magia = `Arcano de ${baseReversa} - ZYX`;
            setEncantamentoGerado(magia);
        } else { setEncantamentoGerado('Digite uma palavra base.'); }
    };
    const adicionarCompanheiro = () => {
        if (novoHeroiNome.trim() && !herois.some(h => h.nome === novoHeroiNome)) {
            const novoHeroi = { nome: novoHeroiNome, nivel: 1, xp: 0, classe: novoHeroiClasse };
            setHerois(prev => [...prev.filter(h => h.nome !== 'Você'), novoHeroi, prev.find(h => h.nome === 'Você')]);
            setNovoHeroiNome('');
        } else { alert('Nome inválido ou já existe.'); }
    };
    const editarNivelHeroi = (nomeHeroi, delta) => {
        setHerois(prev => prev.map(h => h.nome === nomeHeroi && h.nome !== 'Você' ? { ...h, nivel: Math.max(1, h.nivel + delta) } : h));
    };
    const incrementarAtributo = (attr) => {
        if (pontosAtributo > 0) {
            setAtributos(prev => ({ ...prev, [attr]: prev[attr] + 1 }));
            setPontosAtributo(prev => prev - 1);
        }
    };
    const decrementarAtributo = (attr) => {
        if (atributos[attr] > 1) {
            setAtributos(prev => ({ ...prev, [attr]: prev[attr] - 1 }));
            setPontosAtributo(prev => prev + 1);
        }
    };

    const rankingOrdenado = useMemo(() => {
        const heroisComAtualizado = herois.map(h => h.nome === 'Você' ? { ...h, nivel, xp, classe } : h);
        return [...heroisComAtualizado].sort((a, b) => b.nivel - a.nivel || b.xp - a.xp);
    }, [herois, nivel, xp, classe]);

    const vidaPercentual = (hp / maxHp) * 100;
    let vidaClasse = '';
    if (vidaPercentual < 30) vidaClasse = 'vida-critica';
    else if (vidaPercentual <= 70) vidaClasse = 'vida-alerta';
    else vidaClasse = 'vida-normal';

    // RENDERIZAÇÃO
    return (
        <div className="rpg-app-wrapper">
            <h1 className="main-title">✨ SISTEMA DE AVENTURA - {nome.toUpperCase()} ✨</h1>
            <div className="rpg-grid-container">
                <div className="rpg-column col-1">
                    <div className="rpg-section">
                        <h3 className="section-title">📋 Painel do Personagem</h3>
                        <div className="input-group"><label>Nome:</label><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} /></div>
                        <div className="input-group"><label>Raça:</label><select value={raca} onChange={(e) => setRaca(e.target.value)}><option>Humano</option><option>Elfo</option><option>Anão</option></select></div>
                        <div className="input-group"><label>Classe:</label><select value={classe} onChange={(e) => setClasse(e.target.value)}><option>Guerreiro</option><option>Mago</option><option>Arqueiro</option></select></div>
                        <button className="rpg-button secondary" onClick={() => setMostraStatus(!mostraStatus)}>{mostraStatus ? 'Ocultar Efeitos' : 'Mostrar Efeitos de Status'}</button>
                        {mostraStatus && (<p className="status-effect">Efeitos Ativos: Coragem (+5 Força)</p>)}
                    </div>
                    <div className="rpg-section status-section">
                        <h3 className="section-title">⚔️ Status e Progresso</h3>
                        <div className="status-line">
                            <span className="status-label">Vida:</span>
                            <div className={`health-bar-container ${vidaClasse}`}>
                                <div className="health-bar-fill" style={{ width: `${vidaPercentual}%` }}></div>
                                <span className="health-text">{hp}/{maxHp} HP</span>
                            </div>
                            {hp < 30 && <span className="warning">⚠️ CRÍTICO!</span>}
                        </div>
                        <div className="status-line">
                            <span className="status-label">Nível {nivel}:</span>
                            <div className="xp-bar-container">
                                <div className="xp-bar-fill" style={{ width: `${(xp / xpParaProxNivel) * 100}%` }}></div>
                                <span className="xp-text">{xp} / {xpParaProxNivel} XP</span>
                            </div>
                        </div>
                        <p className="gold-counter">💰 Ouro: {ouro} moedas</p>
                        <div className="action-buttons">
                            <button className="rpg-button primary" onClick={curar} disabled={hp === maxHp}>Curar (+10 HP)</button>
                            <button className="rpg-button danger" onClick={sofrerDano}>Sofrer Dano</button>
                            <button className="rpg-button success" onClick={() => ganharXp(50)}>Derrotar Inimigo</button>
                        </div>
                    </div>
                    <div className="rpg-section attributes-section">
                        <h3 className="section-title">💪 ATRIBUTOS DE {nome.toUpperCase()} (Pontos Restantes: {pontosAtributo})</h3>
                        {Object.keys(atributos).map(attr => (
                            <div key={attr} className="attribute-line">
                                <span className="attribute-label">{attr}: {atributos[attr]}</span>
                                <button className="rpg-button attr-btn plus" onClick={() => incrementarAtributo(attr)} disabled={pontosAtributo === 0}>+</button>
                                <button className="rpg-button attr-btn minus" onClick={() => decrementarAtributo(attr)} disabled={atributos[attr] === 1}>-</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rpg-column col-2">
                    <div className="rpg-section mission-section">
                        <h3 className="section-title">📜 Diário de Missões (Completas: {missoesCompletas})</h3>
                        <div className="mission-input-group">
                            <input type="text" value={missaoInput} onChange={(e) => setMissaoInput(e.target.value)} placeholder="Nova Missão..." />
                            <select value={missaoCategoriaInput} onChange={(e) => setMissaoCategoriaInput(e.target.value)}>
                                <option value="Principal">Principal</option>
                                <option value="Secundária">Secundária</option>
                                <option value="Urgente">Urgente</option>
                            </select>
                            <button className="rpg-button primary" onClick={adicionarMissao}>Adicionar</button>
                        </div>
                        <ul className="mission-list">
                            {missoes.map(missao => (
                                <li key={missao.id} className={`mission-item ${missao.concluida ? 'completed' : missao.categoria.toLowerCase()}`}>
                                    [{missao.categoria}] - {missao.texto} 
                                    {!missao.concluida && (
                                        <button className="rpg-button complete-mission-btn" onClick={() => completarMissao(missao.id)}>✔️ Concluir (+25 Ouro)</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rpg-section">
                        <h3 className="section-title">🎒 INVENTÁRIO DE {nome.toUpperCase()}</h3>
                        <button className="rpg-button secondary" onClick={() => setInventarioAberto(!inventarioAberto)}>
                            {inventarioAberto ? 'Fechar Inventário' : 'Abrir Inventário 👝'}
                        </button>
                        {inventarioAberto && (
                            <ul className="inventory-list">
                                {inventario.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        )}
                    </div>
                    
                    {/* Loja */}
                    <div className="rpg-section store-section">
                        <button className="rpg-button secondary store-toggle" onClick={() => setMostraLoja(!mostraLoja)}>
                            {mostraLoja ? 'Fechar Loja' : 'Abrir Loja'}
                        </button>
                        {mostraLoja && (
                            <div className="rpg-store">
                                <p className="store-title"><strong>LOJA DO FERREIRO</strong>: Promoção, tudo por 15 ouros</p>
                                <button className="rpg-button store-item" onClick={() => comprarItem(15, 'Escudo Reforçado')}>Comprar Escudo</button>
                                <button className="rpg-button store-item" onClick={() => comprarItem(15, 'Poção de Mana')}>Comprar Poção Mana</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="rpg-column col-3">
                    <div className="rpg-section ranking-section">
                        <h3 className="section-title">🏆 Ranking dos Heróis (Gerenciar Party)</h3>
                        <div className="input-group party-add">
                            <input type="text" value={novoHeroiNome} onChange={(e) => setNovoHeroiNome(e.target.value)} placeholder="Nome do Companheiro" />
                            <select value={novoHeroiClasse} onChange={(e) => setNovoHeroiClasse(e.target.value)}>
                                <option>Guerreiro</option><option>Mago</option><option>Arqueiro</option>
                            </select>
                            <button className="rpg-button primary" onClick={adicionarCompanheiro}>Add</button>
                        </div>
                        <table className="rpg-table">
                            <thead>
                                <tr><th>Pos.</th><th>Nome</th><th>Nível</th><th>Ações</th></tr>
                            </thead>
                            <tbody>
                                {rankingOrdenado.map((heroi, index) => (
                                    <tr key={heroi.nome} className={heroi.nome === 'Você' ? 'current-hero' : ''}>
                                        <td>{index + 1}</td>
                                        <td>{heroi.nome}</td>
                                        <td>{heroi.nivel}</td>
                                        <td>
                                            {heroi.nome !== 'Você' && (
                                                <div className="action-buttons-compact">
                                                    <button className="rpg-button tertiary" onClick={() => editarNivelHeroi(heroi.nome, 1)}>+</button>
                                                    <button className="rpg-button tertiary" onClick={() => editarNivelHeroi(heroi.nome, -1)}>-</button>
                                                </div>
                                            )}
                                            {heroi.nome === 'Você' && ' - '}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="rpg-section enchantment-section">
                        <h3 className="section-title">🔮 GERADOR DE ENCANTAMENTOS PARA {nome.toUpperCase()}</h3>
                        <div className="input-group">
                            <label>Palavra Mágica:</label>
                            <input type="text" value={palavraBase} onChange={(e) => setPalavraBase(e.target.value)} />
                            <button className="rpg-button primary" onClick={gerarEncantamento}>Gerar</button>
                        </div>
                        {encantamentoGerado && <p className="enchantment-result">Encantamento: {encantamentoGerado}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RPGApp;