import React, { useState } from 'react';
import '../css/SuperHeroForm.css';
const SuperHeroForm = ({ onSubmit, superPowers }) => {
  const [newHero, setNewHero] = useState({
    realName: '',
    heroName: '',
    birthDate: '',
    height: 0,
    weight: 0,
    heroSuperPowers: [],
  });
  const [dateError, setDateError] = useState('');
  const [tempSuperPoderes, setTempSuperPoderes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const isValidDate = dateRegex.test(value);

    if (name === 'birthDate' && !isValidDate) {
      setDateError('Formato inválido. Use dd/mm/yyyy');
    } else {
      setDateError('');
    }

    setNewHero((prevHero) => ({ ...prevHero, [name]: value }));
  };

  const handleSuperPowerChange = (e) => {
    const { value } = e.target;
    setTempSuperPoderes(value.split(','));
    setNewHero((prevHero) => ({ ...prevHero, heroSuperPowers: value.split(',') }));
  };

  const transformFormData = (formData, heroId) => {
    try {
      const birthDateParts = formData.birthDate.split('/');
      const formattedDate = `${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}`;

      const heroSuperPowers = tempSuperPoderes.map((powerId) => ({
        heroId: heroId,
        superPowerId: Number(powerId),
      }));

      return {
        realName: formData.realName,
        heroName: formData.heroName,
        birthDate: formattedDate,
        height: Number(formData.height),
        weight: Number(formData.weight),
        heroSuperPowers: heroSuperPowers.length > 0 ? heroSuperPowers : null,
      };
    } catch (error) {
      console.error('Erro ao transformar dados:', error);
      throw error;
    }
  };

  const handleFormSubmit = async () => {
    try {
      const transformedData = transformFormData(newHero);

      const response = await fetch('http://localhost:5182/api/SuperHero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });

      console.log(transformedData);

      if (!response.ok) {
        throw new Error('Erro ao enviar dados ao backend.');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='super-hero-form'>
      <h2>Super Hero Form</h2>
      <form>
        <label>
          Nome Real:
          <input type="text" name="realName" value={newHero.realName} onChange={handleInputChange} />
        </label>
        <label>
          Nome de Herói:
          <input type="text" name="heroName" value={newHero.heroName} onChange={handleInputChange} />
        </label>
        <label>
          Data de Nascimento:
          <input
            type="text"
            name="birthDate"
            value={newHero.birthDate}
            onChange={handleInputChange}
            className={dateError ? 'error' : ''}
          />
          {dateError && <span className="error-message">{dateError}</span>}
        </label>
        <label>
          Altura:
          <input type="text" name="height" value={newHero.height} onChange={handleInputChange} />
        </label>
        <label>
          Peso:
          <input type="text" name="weight" value={newHero.weight} onChange={handleInputChange} />
        </label>
        <label>
          Superpoderes (separados por vírgula):
          <input type="text" name="tempSuperPoderes" value={tempSuperPoderes.join(',')} onChange={handleSuperPowerChange} />
        </label>
        <button type="button" onClick={handleFormSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SuperHeroForm;