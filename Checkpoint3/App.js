import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Player from "./components/Player";
import ListaMusicas from "./components/ListaMusicas";
import Playlists from "./components/Playlists";

/*
  NOTE: project uses simulated playback (no real audio files).
  Progress advances while isPlaying is true. All state stored in App and
  passed down via props to satisfy the "props and composition" requirement.
*/

const SAMPLE_SONGS = [
  {
    id: "s1",
    title: "Lua Cheia",
    artist: "Marina Sena",
    duration: 210,
    img: "https://i1.sndcdn.com/artworks-MHiql86Llhq3ZIlO-3yvl6g-t1080x1080.jpg",
  },
  {
    id: "s2",
    title: "Coisas Naturais",
    artist: "Marina Sena",
    duration: 185,
    img: "data:image/jpeg;base64,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",
  },
  {
    id: "s3",
    title: "Faz uma Loucura por mim",
    artist: "Alcione",
    duration: 200,
    img: "https://akamai.sscdn.co/letras/360x360/albuns/8/f/f/0/4221447429508.jpg",
  },
  {
    id: "s4",
    title: "A Loba",
    artist: "Alcione",
    duration: 240,
    img: "https://cdn-images.dzcdn.net/images/cover/9f76f8025479a1f5269abf9de67578fb/500x500.jpg",
  },
  {
    id: "s5",
    title: "Acesa",
    artist: "Alcione",
    duration: 195,
    img: "https://i.scdn.co/image/ab67616d0000b2735e0140d22d80858b89894c02",
  },
];

export default function App() {
  // songs (static here, could be fetched)
  const [songs] = useState(SAMPLE_SONGS);

  // UI / global state
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fav")) || [];
    } catch {
      return [];
    }
  });
  const [playlists, setPlaylists] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("pls")) || [
          { id: "p_default", name: "Minha Playlist", trackIds: ["s1"] },
        ]
      );
    } catch {
      return [{ id: "p_default", name: "Minha Playlist", trackIds: ["s1"] }];
    }
  });

  const [currentTrackId, setCurrentTrackId] = useState(() => {
    return localStorage.getItem("currentTrackId") || null;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // seconds
  const [volume, setVolume] = useState(
    () => Number(localStorage.getItem("volume")) || 0.8
  );

  // Derived
  const currentTrack = useMemo(
    () => songs.find((s) => s.id === currentTrackId) || null,
    [songs, currentTrackId]
  );

  // Persist favorites, playlists, volume, current track
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("pls", JSON.stringify(playlists));
  }, [playlists]);
  useEffect(() => {
    localStorage.setItem("volume", String(volume));
  }, [volume]);
  useEffect(() => {
    if (currentTrackId) localStorage.setItem("currentTrackId", currentTrackId);
  }, [currentTrackId]);

  // Simulate playback progress
  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const t = setInterval(() => {
      setProgress((prev) => {
        if (currentTrack && prev >= currentTrack.duration) {
          // auto-next
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(t);
    // we intentionally do not include progress in deps
  }, [isPlaying, currentTrack]); // eslint-disable-line

  // When track changes, reset progress
  useEffect(() => setProgress(0), [currentTrackId]);

  // Search filter
  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.artist.toLowerCase().includes(search.toLowerCase())
  );

  // Controls
  function simulatePlay(id) {
    if (id && id !== currentTrackId) setCurrentTrackId(id);
    setIsPlaying(true);
  }
  function simulatePause() {
    setIsPlaying(false);
  }
  function handlePrev() {
    if (!currentTrack) return;
    const idx = songs.findIndex((s) => s.id === currentTrack.id);
    const prev = songs[(idx - 1 + songs.length) % songs.length];
    setCurrentTrackId(prev.id);
    setIsPlaying(true);
  }
  function handleNext() {
    if (!currentTrack) return;
    const idx = songs.findIndex((s) => s.id === currentTrack.id);
    const next = songs[(idx + 1) % songs.length];
    setCurrentTrackId(next.id);
    setIsPlaying(true);
  }
  function seekTo(pct) {
    if (!currentTrack) return;
    const secs = Math.max(0, Math.min(1, pct)) * currentTrack.duration;
    setProgress(Math.floor(secs));
  }

  // Favorites
  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Playlists
  function createPlaylist(name) {
    const n = name.trim();
    if (!n) return;
    setPlaylists((prev) => [
      ...prev,
      { id: `pl_${Date.now()}`, name: n, trackIds: [] },
    ]);
  }
  function addToPlaylist(trackId, playlistId) {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, trackIds: Array.from(new Set([...pl.trackIds, trackId])) }
          : pl
      )
    );
  }
  function removeFromPlaylist(trackId, playlistId) {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.id === playlistId
          ? { ...pl, trackIds: pl.trackIds.filter((t) => t !== trackId) }
          : pl
      )
    );
  }

  return (
    <div className="spotify-app">
      <Header search={search} setSearch={setSearch} />

      <main className="main-grid">
        <aside className="left-col">
          <Playlists
            playlists={playlists}
            createPlaylist={createPlaylist}
            songs={songs}
            addToPlaylist={addToPlaylist}
            removeFromPlaylist={removeFromPlaylist}
          />
        </aside>

        <section className="center-col">
          <div className="section-header">
            <h2>Descobrir</h2>
            <p className="muted">
              Busque por título ou artista — resultados atualizam em tempo real.
            </p>
          </div>

          <ListaMusicas
            songs={filtered}
            playTrack={(id) => simulatePlay(id)}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToPlaylist={addToPlaylist}
          />
        </section>

        <aside className="right-col">
          <div className="now-card">
            <h3>Agora tocando</h3>
            {currentTrack ? (
              <>
                <div className="now-art">
                  <img
                    src={
                      currentTrack.img ||
                      currentTrack.imgUrl ||
                      `https://picsum.photos/200?${currentTrack.id}`
                    }
                    alt={currentTrack.title}
                  />
                </div>
                <div className="now-meta">
                  <strong>{currentTrack.title}</strong>
                  <span className="muted">{currentTrack.artist}</span>
                </div>
                <div className="sp-player-compact">
                  <Player
                    isPlaying={isPlaying}
                    onPlayPause={() =>
                      isPlaying
                        ? simulatePause()
                        : simulatePlay(currentTrack.id)
                    }
                    onPrev={handlePrev}
                    onNext={handleNext}
                    progress={progress}
                    duration={currentTrack.duration}
                    seekTo={seekTo}
                    volume={volume}
                    setVolume={setVolume}
                  />
                </div>
              </>
            ) : (
              <p className="muted">Nenhuma música selecionada</p>
            )}
          </div>

          <div className="favorites-card">
            <h4>Favoritas</h4>
            {favorites.length === 0 ? (
              <p className="muted">Nenhuma favorita</p>
            ) : (
              <ul className="fav-list">
                {favorites.map((fid) => {
                  const s = songs.find((x) => x.id === fid);
                  if (!s) return null;
                  return (
                    <li key={fid} className="fav-item">
                      <img
                        src={s.img || `https://picsum.photos/60?${s.id}`}
                        alt=""
                      />
                      <div>
                        <div>{s.title}</div>
                        <small className="muted">{s.artist}</small>
                      </div>
                      <button
                        className="tiny"
                        onClick={() => simulatePlay(s.id)}
                      >
                        Tocar
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
