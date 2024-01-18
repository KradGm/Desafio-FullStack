import React from 'react';

const SuperHeroList = ({ superHeroes }) => {
  return (
    <ul>
      {superHeroes.map((hero) => (
        <li key={hero.id}>{hero.name}</li>
      ))}
    </ul>
  );
};

export default SuperHeroList;
