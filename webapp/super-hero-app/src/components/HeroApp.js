import React, { useState, useEffect } from 'react';
import SuperHeroForm from './SuperHeroForm';
import HeroCard from './HeroCard';
import { fetchHeroes, addHero, updateHero, deleteHero } from '../services/ApiService';
import '../css/HeroApp.css';

const HeroApp = () => {
  const [heroes, setHeroes] = useState([]);
  const [superPowers, setSuperPowers] = useState([]);

  useEffect(() => {
    const fetchHeroesAndSuperPowers = async () => {
      try {
        const [dataHeroes, dataSuperPowers] = await Promise.all([
          fetchHeroes('SuperHero'),
          fetchHeroes('SuperHero/SuperPowers'),
        ]);

        setHeroes(dataHeroes);
        setSuperPowers(dataSuperPowers);
      } catch (error) {
        console.error('Erro ao obter dados:', error);
      }
    };

    fetchHeroesAndSuperPowers();
  }, []);

  const addHeroToCards = async (hero) => {
    try {
      const data = await addHero('SuperHero', hero);
      setHeroes((prevHeroes) => [...prevHeroes, data]);
    } catch (error) {
      console.error('Erro ao adicionar herói:', error);
    }
  };

  const updateHeroInfo = async (updatedHero) => {
    try {
      const data = await updateHero('SuperHero/UpdateHero', updatedHero.id, updatedHero);
      setHeroes((prevHeroes) =>
        prevHeroes.map((hero) => (hero.id === updatedHero.id ? data : hero))
      );
    } catch (error) {
      console.error('Erro ao atualizar herói:', error);
    }
  };

  const deleteHeroInfo = async (heroId) => {
    try {
      await deleteHero('SuperHero', heroId);
      setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== heroId));
    } catch (error) {
      console.error('Erro ao excluir herói:', error);
    }
  };

  return (
    <div>
      <SuperHeroForm addHero={addHeroToCards} />
      <div className='all-hero-cards'>
        {heroes.map((hero, index) => (
          <HeroCard
            key={index}
            hero={hero}
            superPowers={superPowers}
            onUpdate={updateHeroInfo}
            onDelete={deleteHeroInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroApp;