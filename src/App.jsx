import React, { useState, useRef, useEffect } from 'react';
import { Search, Play, Pause, SkipBack, SkipForward, Volume2, Heart, Music } from 'lucide-react';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom Styles Component
const CustomStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
    * {
      font-family: 'Poppins', sans-serif;
    }
    
    body {
      background: linear-gradient(135deg, #303e7cff 0%, #180030ff 100%);
      min-height: 100vh;
    }
    
    .navbar-custom {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      padding: 1rem 0;
    }
    
    .navbar-brand {
      font-weight: 700;
      font-size: 1.8rem;
      color: white !important;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .nav-link-custom {
      color: rgba(255,255,255,0.9) !important;
      font-weight: 500;
      margin: 0 15px;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .nav-link-custom:hover {
      color: white !important;
      transform: translateY(-2px);
    }
    
    .nav-link-custom::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background: white;
      transition: width 0.3s ease;
    }
    
    .nav-link-custom:hover::after {
      width: 100%;
    }
    
    .search-container {
      max-width: 700px;
      margin: 0 auto 3rem;
    }
    
    .search-input-wrapper {
      position: relative;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      border-radius: 50px;
      overflow: hidden;
    }
    
    .search-input {
      border: none;
      padding: 1.2rem 4rem 1.2rem 2rem;
      font-size: 1.1rem;
      border-radius: 50px;
      box-shadow: none !important;
      transition: all 0.3s ease;
    }
    
    .search-input:focus {
      transform: scale(1.02);
    }
    
    .search-btn {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102,126,234,0.4);
    }
    
    .search-btn:hover {
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(102,126,234,0.6);
    }
    
    .hero-section {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem 0;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(135deg, #dadde7ff 0%, #0a97e9ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      color: #cedbe7ff;
      font-weight: 400;
    }
    
    .song-card {
      border: none;
      border-radius: 20px;
      overflow: hidden;
      transition: all 0.4s ease;
      background: white;
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
      height: 100%;
    }
    
    .song-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    }
    
    .song-card.active {
      box-shadow: 0 0 0 4px #526ee9ff;
    }
    
    .song-image-wrapper {
      position: relative;
      overflow: hidden;
      height: 250px;
    }
    
    .song-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    .song-card:hover .song-image {
      transform: scale(1.1);
    }
    
    .play-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: pointer;
    }
    
    .song-card:hover .play-overlay {
      opacity: 1;
    }
    
    .play-btn-overlay {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }
    
    .play-btn-overlay:hover {
      transform: scale(1.2);
    }
    
    .song-card-body {
      padding: 1.5rem;
    }
    
    .song-title {
      font-weight: 600;
      font-size: 1.1rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .song-artist {
      color: #718096;
      font-size: 0.95rem;
      margin-bottom: 0.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .song-album {
      color: #a0aec0;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .song-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }
    
    .genre-badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.3rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .favorite-btn {
      background: none;
      border: none;
      color: #e53e3e;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .favorite-btn:hover {
      transform: scale(1.2);
    }
    
    .music-player {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
      padding: 1.5rem 0;
      box-shadow: 0 -4px 30px rgba(0,0,0,0.3);
      z-index: 1000;
    }
    
    .player-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .player-album-art {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }
    
    .player-details h6 {
      color: white;
      font-weight: 600;
      margin: 0;
      font-size: 1rem;
    }
    
    .player-details p {
      color: #a0aec0;
      margin: 0;
      font-size: 0.85rem;
    }
    
    .player-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
    }
    
    .control-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }
    
    .control-btn:hover {
      color: #667eea;
      transform: scale(1.1);
    }
    
    .play-pause-btn {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .play-pause-btn:hover {
      transform: scale(1.15);
      box-shadow: 0 0 20px rgba(102,126,234,0.6);
    }
    
    .volume-control {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: white;
    }
    
    .custom-range {
      -webkit-appearance: none;
      appearance: none;
      background: rgba(255,255,255,0.2);
      height: 6px;
      border-radius: 5px;
      outline: none;
    }
    
    .custom-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(102,126,234,0.5);
    }
    
    .custom-range::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      cursor: pointer;
      border: none;
    }
    
    .progress-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.8rem;
      color: white;
      font-size: 0.85rem;
    }
    
    .progress-bar-custom {
      flex: 1;
    }
    
    .lyrics-card {
      background: white;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    .lyrics-title {
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
    }
    
    .lyrics-content {
      max-height: 400px;
      overflow-y: auto;
      line-height: 1.8;
      color: #4a5568;
      font-size: 1rem;
      white-space: pre-wrap;
    }
    
    .lyrics-content::-webkit-scrollbar {
      width: 8px;
    }
    
    .lyrics-content::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    
    .lyrics-content::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
    }
    
    .spinner-border-custom {
      width: 4rem;
      height: 4rem;
      border-width: 0.4rem;
      border-color: #667eea;
      border-right-color: transparent;
    }
    
    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: #a9c2e7ff;
    }
    
    .no-results-icon {
      font-size: 4rem;
      opacity: 0.3;
      margin-bottom: 1rem;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }
      
      .player-controls {
        gap: 1rem;
      }
      
      .volume-control {
        display: none;
      }
    }
  `}</style>
);

// Navbar Component
const Navbar = () => {
  return (
    <>
      <CustomStyles />
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <a className="navbar-brand" href="#">
            <Music size={32} />
            MusicHub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#">Library</a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-custom" href="#">Favorites</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

// SearchBar Component
const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="form-control search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for songs, artists, albums..."
          disabled={isLoading}
        />
        <button onClick={handleSearch} className="search-btn" disabled={isLoading}>
          <Search size={22} color="white" />
        </button>
      </div>
    </div>
  );
};

// Loader Component
const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border spinner-border-custom" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

// SongList Component
const SongList = ({ songs, onSelectSong, currentSong, onToggleFavorite, favorites }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🎵</div>
        <h3>No songs found</h3>
        <p>Try searching for your favorite artist or song!</p>
      </div>
    );
  }

  return (
    <div className="row g-4 mb-5">
      {songs.map((song, index) => (
        <div key={index} className="col-12 col-sm-6 col-lg-4">
          <div className={`card song-card ${currentSong?.trackId === song.trackId ? 'active' : ''}`}>
            <div className="song-image-wrapper">
              <img
                src={song.artworkUrl100 || 'https://via.placeholder.com/300'}
                alt={song.trackName}
                className="song-image"
              />
              <div className="play-overlay" onClick={() => onSelectSong(song)}>
                <div className="play-btn-overlay">
                  <Play size={32} color="white" />
                </div>
              </div>
            </div>
            <div className="song-card-body">
              <h5 className="song-title">{song.trackName}</h5>
              <p className="song-artist">{song.artistName}</p>
              <p className="song-album">{song.collectionName}</p>
              <div className="song-footer">
                <span className="genre-badge">{song.primaryGenreName}</span>
                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(song);
                  }}
                >
                  <Heart
                    size={24}
                    fill={favorites.some(f => f.trackId === song.trackId) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// MusicPlayer Component
const MusicPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (song && audioRef.current) {
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [song]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    audioRef.current.volume = vol;
    setVolume(vol);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!song) {
    return (
      <div className="music-player">
        <div className="container">
          <p className="text-center text-white mb-0">Select a song to start playing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={song.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <div className="player-info">
              <img
                src={song.artworkUrl100}
                alt={song.trackName}
                className="player-album-art"
              />
              <div className="player-details">
                <h6>{song.trackName}</h6>
                <p>{song.artistName}</p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="player-controls">
              <button className="control-btn">
                <SkipBack size={24} />
              </button>
              <button onClick={togglePlay} className="control-btn play-pause-btn">
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button className="control-btn">
                <SkipForward size={24} />
              </button>
            </div>
            <div className="progress-container">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                className="form-range custom-range progress-bar-custom"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="volume-control justify-content-end">
              <Volume2 size={20} />
              <input
                type="range"
                className="form-range custom-range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: '100px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// LyricsDisplay Component
const LyricsDisplay = ({ song }) => {
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (song) {
      fetchLyrics();
    }
  }, [song]);

  const fetchLyrics = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(song.artistName)}/${encodeURIComponent(song.trackName)}`
      );
      const data = await response.json();
      setLyrics(data.lyrics || 'Lyrics not available for this song.');
    } catch (error) {
      setLyrics('Unable to fetch lyrics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!song) return null;

  return (
    <div className="lyrics-card">
      <h2 className="lyrics-title">Lyrics</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="lyrics-content">{lyrics}</div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showLyrics, setShowLyrics] = useState(false);

  const searchSongs = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=12`
      );
      const data = await response.json();
      setSongs(data.results || []);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setSongs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSong = (song) => {
    setCurrentSong(song);
    setShowLyrics(true);
  };

  const toggleFavorite = (song) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.trackId === song.trackId);
      if (exists) {
        return prev.filter(f => f.trackId !== song.trackId);
      } else {
        return [...prev, song];
      }
    });
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '150px' }}>
      <Navbar />
      
      <div className="container py-5">
        <div className="hero-section">
          <h1 className="hero-title">Discover Your Favorite Music</h1>
          <p className="hero-subtitle">Search and play millions of songs</p>
        </div>

        <SearchBar onSearch={searchSongs} isLoading={isLoading} />

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SongList
              songs={songs}
              onSelectSong={handleSelectSong}
              currentSong={currentSong}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
            
            {showLyrics && currentSong && (
              <LyricsDisplay song={currentSong} />
            )}
          </>
        )}
      </div>

      <MusicPlayer song={currentSong} />
    </div>
  );
};

export default App;