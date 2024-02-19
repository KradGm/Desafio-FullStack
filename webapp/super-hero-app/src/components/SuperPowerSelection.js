import React, { useState, useEffect } from 'react';
import { fetchHeroes } from '../services/ApiService';

const SuperPowerSelection = ({ superPowers, selectedPowers, onPowerSelectionChange }) => {
  const [availablePowers, setAvailablePowers] = useState([]);

  useEffect(() => {
    fetchHeroes('SuperHero/SuperPowers')
      .then(data => setAvailablePowers(data))
      .catch(error => console.error('Erro ao obter superpoderes:', error));
  }, []);

  useEffect(() => {
    console.log(availablePowers);
    if (superPowers) {
      const remainingPowers = superPowers.filter((power) => !selectedPowers.includes(power.powerId));
      setAvailablePowers(remainingPowers);
    }
  }, [superPowers, selectedPowers]);

  const handlePowerSelect = (powerId) => {
    onPowerSelectionChange(powerId, 'add');
  };

  const handlePowerDeselect = (powerId) => {
    onPowerSelectionChange(powerId, 'remove');
  };


  return (
    <div className='super-power-selection'>
      <h2>Selecione os Superpoderes</h2>
      <ul>
        {availablePowers.map((power) => (
          <li key={power.powerId}>
            <input
              type="checkbox"
              id={`power-${power.powerId}`}
              name="selectedPowers"
              value={power.powerId}
              checked={selectedPowers.includes(power.powerId)}
              onChange={(e) => (e.target.checked ? handlePowerSelect(power.powerId) : handlePowerDeselect(power.powerId))}
            />
            <label htmlFor={`power-${power.powerId}`}>{power.powerName}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperPowerSelection;