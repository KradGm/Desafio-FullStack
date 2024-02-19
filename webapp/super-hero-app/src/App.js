import React, { useState} from 'react';
import SuperHeroList from './components/SuperHeroList';
import HeroApp from './components/HeroApp'; 
import MarvelImg from './img/fundomarvel.jpg';
import './App.css';

const App = () => {
  const [superHeroes] = useState([]);

  return (
    <div className='app-container'>
      <img className='img-marvel' src={MarvelImg} alt="" />
      <div className='app-content'>
        <SuperHeroList superHeroes={superHeroes}/>
        <HeroApp/>
      </div>
    </div>
  );
};

export default App;