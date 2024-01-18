import React, { useState, useEffect } from 'react';
import SuperHeroForm from './SuperHeroForm';
import HeroCard from './HeroCard';
import '../css/HeroApp.css';

const HeroApp = () => {
    const [heroes, setHeroes] = useState([]);
    const [superPowers, setSuperPowers] = useState([]);

    useEffect(() => {
        const fetchHeroesAndSuperPowers = async () => {
            const responseHeroes = await fetch('http://localhost:5182/api/SuperHero');
            const dataHeroes = await responseHeroes.json();
            setHeroes(dataHeroes);

            const responseSuperPowers = await fetch('http://localhost:5182/api/SuperHero/SuperPowers');
            const dataSuperPowers = await responseSuperPowers.json();
            setSuperPowers(dataSuperPowers);
        };

        fetchHeroesAndSuperPowers();
    }, []);

    const addHero = (hero) => {
        setHeroes([...heroes, hero]);
    };

    return (

        <div >
            <SuperHeroForm addHero={addHero} />
            <div className='all-hero-cards'>
                {heroes.map((hero, index) => <HeroCard key={index} hero={hero} superPowers={superPowers} />)}
            </div>
        </div>
    );
};

export default HeroApp;