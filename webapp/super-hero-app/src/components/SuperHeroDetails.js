import React from 'react';

const SuperHeroDetails = ({ superHero }) => {
  return (
    <div>
      <h2>{superHero.name}</h2>
      {/* Adicione mais detalhes do herói aqui */}
    </div>
  );
};

export default SuperHeroDetails;