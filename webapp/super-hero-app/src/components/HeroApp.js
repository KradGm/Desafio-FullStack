import React, { useState, useEffect } from 'react';
import SuperHeroForm from './SuperHeroForm';
import HeroCard from './HeroCard';
import '../css/HeroApp.css';

const HeroApp = () => {
    const [heroes, setHeroes] = useState([]);
    const [superPowers, setSuperPowers] = useState([]);
    const API_URL = "http://localhost:5182/";
    useEffect(() => {
        const fetchHeroesAndSuperPowers = async () => {
            const responseHeroes = await fetch(`${API_URL}api/SuperHero`);
            const dataHeroes = await responseHeroes.json();
            setHeroes(dataHeroes);

            const responseSuperPowers = await fetch(`${API_URL}api/SuperHero/SuperPowers`);
            const dataSuperPowers = await responseSuperPowers.json();
            setSuperPowers(dataSuperPowers);
        };

        fetchHeroesAndSuperPowers();
    }, []);

    const addHero = (hero) => {
        setHeroes([...heroes, hero]);
    };

    const updateHero = async (updatedHero) => {
        try {
            const response = await fetch(`${API_URL}api/SuperHero/UpdateHero/${updatedHero.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedHero),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar herói.');
            }

            setHeroes((prevHeroes) =>
                prevHeroes.map((hero) => (hero.id === updatedHero.id ? updatedHero : hero))
            );
        } catch (error) {
            console.error('Erro ao atualizar herói:', error);
        }
    };
    const deleteHero = async (heroId) => {
        try {
            const response = await fetch(`${API_URL}api/SuperHero/${heroId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir herói.');
            }

            setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== heroId));
        } catch (error) {
            console.error('Erro ao excluir herói:', error);
        }
    };


    return (
        <div>
            <SuperHeroForm addHero={addHero} />
            <div className='all-hero-cards'>
                {heroes.map((hero, index) => (
                    <HeroCard
                        key={index}
                        hero={hero}
                        superPowers={superPowers}
                        onUpdate={updateHero}
                        onDelete={deleteHero}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroApp;