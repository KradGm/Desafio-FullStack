import React from 'react';
import '../css/HeroCard.css';
const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };
const HeroCard = ({ hero, superPowers }) => (
  
<div className='hero-card'>
    <header className='hero-name'>
        <h2>Nome do Heroi: {hero.heroName}</h2>
    </header>
    <div className='mid-hero-info'>
        <p>Nome Real: {hero.realName}</p>
        <p>Data de Nascimento: {formatBirthDate(hero.birthDate)}</p>
        <p>Altura: {hero.height}</p>
        <p>Peso: {hero.weight}</p>
        <h3>Poderes:</h3>
    </div>
    <div className='hero-super-powers'>
        {

            hero.heroSuperPowers.map((power, index) => {
                const correspondingPower = superPowers.find((superPower) => superPower.powerId === power.superPowerId);

                return (
                    <div key={index} className='power-card'>
                        <p>
                            {correspondingPower ? correspondingPower.powerName : 'N/A'}
                            <br/>
                            {correspondingPower ? correspondingPower.description : 'N/A'}
                        </p>
                    </div>
                );
            })}
    </div>
</div>
);

export default HeroCard;