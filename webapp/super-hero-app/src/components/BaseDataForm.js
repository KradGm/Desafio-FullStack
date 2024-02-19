import React, { useState } from 'react';

const BaseDataForm = ({ onFormDataChange, errorMessages }) => {
  const [newHero, setNewHero] = useState({
    realName: '',
    heroName: '',
    birthDate: '',
    height: 0,
    weight: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHero((prevHero) => ({ ...prevHero, [name]: value }));
  };

  return (
    <div className='base-data-form'>
      <h2>Dados Básicos</h2>
      <form>
        <label>
          Nome Real:
          <input
            required={true}
            type="text"
            name="realName"
            value={newHero.realName}
            onChange={handleInputChange}
          />
          {errorMessages.nameError && <span className="error-message">{errorMessages.nameError}</span>}
        </label>
        <label>
          Nome de Herói:
          <input
            required={true}
            type="text"
            name="heroName"
            value={newHero.heroName}
            onChange={handleInputChange}
          />
          {errorMessages.heroNameError && <span className="error-message">{errorMessages.heroNameError}</span>}
        </label>
        <label>
          Data de Nascimento:
          <input
            type="text"
            name="birthDate"
            value={newHero.birthDate}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
          />
          {errorMessages.dateError && <span className="error-message">{errorMessages.dateError}</span>}
        </label>
        <label>
          Altura:
          <input
            required={true}
            type="text"
            name="height"
            value={newHero.height}
            onChange={handleInputChange}
          />
          {errorMessages.heightError && <span className="error-message">{errorMessages.heightError}</span>}
        </label>
        <label>
          Peso:
          <input
            required={true}
            type="text"
            name="weight"
            value={newHero.weight}
            onChange={handleInputChange}
          />
          {errorMessages.weightError && <span className="error-message">{errorMessages.weightError}</span>}
        </label>
      </form>
      <button type="button" onClick={() => onFormDataChange(newHero)}>
        Próximo
      </button>
    </div>
  );
};

export default BaseDataForm;