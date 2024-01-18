import React, { useState, useEffect } from 'react';
import SuperHeroList from './components/SuperHeroList';
import SuperHeroDetails from './components/SuperHeroDetails';
import HeroApp from './components/HeroApp'; 
import MarvelImg from './img/fundomarvel.jpg';
import SuperHeroForm from './components/SuperHeroForm';
import './App.css';

const API_URL = "http://localhost:5182/";

const App = () => {
  const [superHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [superPowers, setSuperPowers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}api/SuperHero/SuperPowers`)
      .then(response => response.json())
      .then(data => setSuperPowers(data))
      .catch(error => console.error('Erro ao obter superpoderes:', error));
  }, []);

  return (
    <div className='app-container'>
      <img className='img-marvel' src={MarvelImg} alt="" />
      <div className='app-content'>
        <SuperHeroList superHeroes={superHeroes} onSelectHero={setSelectedHero} />
        {selectedHero && <SuperHeroDetails superHero={selectedHero} />}
        <div className='lista-superpowers'>
          <h2>Lista de Superpoderes</h2>
          <ul>
            {superPowers.map(superPower => (
              <li key={superPower.powerId}>
                ID do poder:{superPower.powerId} {superPower.powerName}
              </li>
            ))}
          </ul>
        </div>
        <HeroApp />
      </div>
    </div>
  );
};

export default App;