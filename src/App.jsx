import React, { useState } from 'react';
import './App.css';
import sorteoImage from './assets/images/sorteo.jpg';
import '@fontsource/roboto';

const Sorteo = () => {
  const [participantes, setParticipantes] = useState('');
  const [numeroGanadores, setNumeroGanadores] = useState(1);
  const [ganadores, setGanadores] = useState([]);
  const [mostrandoGanadores, setMostrandoGanadores] = useState(false);
  const [permitirDuplicados, setPermitirDuplicados] = useState(false);
  const [tiempoAnimacion, setTiempoAnimacion] = useState(2); // en segundos

  const handleInputChange = (e) => {
    setParticipantes(e.target.value);
  };

  const handleNumeroChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setNumeroGanadores(value || 1);
  };

  const realizarSorteo = () => {
    let listaParticipantes = participantes
      .split('\n')
      .map((nombre) => nombre.trim())
      .filter(Boolean);

    if (!permitirDuplicados) {
      listaParticipantes = [...new Set(listaParticipantes)];
    }

    if (listaParticipantes.length < numeroGanadores) {
      alert('El número de ganadores supera el número de participantes');
      return;
    }

    const ganadoresSeleccionados = [];
    const indicesSeleccionados = new Set();

    while (ganadoresSeleccionados.length < numeroGanadores) {
      const randomIndex = Math.floor(Math.random() * listaParticipantes.length);

      if (permitirDuplicados) {
        ganadoresSeleccionados.push(listaParticipantes[randomIndex]);
      } else {
        if (!indicesSeleccionados.has(randomIndex)) {
          indicesSeleccionados.add(randomIndex);
          ganadoresSeleccionados.push(listaParticipantes[randomIndex]);
        }
      }
    }

    setGanadores(ganadoresSeleccionados);
    setMostrandoGanadores(false);

    setTimeout(() => {
      setMostrandoGanadores(true);
    }, tiempoAnimacion * 1000);
  };

  const limpiarCampos = () => {
    setParticipantes('');
    setNumeroGanadores(1);
    setGanadores([]);
    setMostrandoGanadores(false);
    setPermitirdDuplicados(false);
    setTiempoAnimacion(2);
  };

  return (
    <div className="sorteo-container">
      <h2>Selecciona ganadores de sorteos en AppNickSorteo ¡GRATIS!</h2>

      <div className="form-group">
        <label>
          <span role="img" aria-label="participants">👥</span> Escribe los participantes del sorteo:
          <span className="info-icon" role="img" aria-label="info"> ℹ️</span>
        </label>
        <textarea
          rows="10"
          value={participantes}
          onChange={handleInputChange}
          placeholder="Bob\nAna\nAmelia..."
          className="input-participantes"
        />
      </div>

      <div className="form-group">
        <label>
          <span role="img" aria-label="winners">🏆</span> Selecciona el número de ganadores:
        </label>
        <input
          type="number"
          min="1"
          max="500"
          value={numeroGanadores}
          onChange={handleNumeroChange}
          className="input-ganadores"
        />
      </div>

      <div className="form-group form-group--duplicados">
        <label>
          <input
            type="checkbox"
            checked={permitirDuplicados}
            onChange={() => setPermitirDuplicados(!permitirDuplicados)}
          />
          Permitir nombres duplicados
        </label>
      </div>

      <div className="form-group">
        <label>
          ⏱️ Tiempo de animación para mostrar ganadores (s):
          <input
            type="number"
            min="1"
            max="20"
            value={tiempoAnimacion}
            onChange={(e) => setTiempoAnimacion(parseInt(e.target.value) || 2)}
            className="input-tiempo"
          />
        </label>
      </div>

      {mostrandoGanadores && ganadores.length > 0 && (
        <div className="image-container">
          <img src={sorteoImage} alt="Imagen del ganador" className="uploaded-image" />
          <div className="winner-text">
            {ganadores.map((nombre, index) => (
              <span key={index} className="winner-name">
                🎉 {index + 1}. {nombre} 🎉
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn-primary" onClick={realizarSorteo}>
        🏆 Realizar sorteo
      </button>

      <button className="btn btn-secondary" onClick={limpiarCampos}>
        🧹 Limpiar campos
      </button>
    </div>
  );
};

export default Sorteo;
