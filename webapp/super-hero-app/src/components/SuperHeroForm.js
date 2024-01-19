import React, { useState, useEffect } from 'react';
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
  const API_URL = "http://localhost:5182/";
  const [dateError] = useState('');
  const [tempSuperPoderes, setTempSuperPoderes] = useState([]);
  const [superPower, setSuperPowers] = useState([]);
  const [nameError, setNameError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(null);


  useEffect(() => {
    fetch(`${API_URL}api/SuperHero/SuperPowers`)
      .then(response => response.json())
      .then(data => setSuperPowers(data))
      .catch(error => console.error('Erro ao obter superpoderes:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let transformedValue = value;

    if (name === 'birthDate') {
      if (value.length === 2 && value.indexOf('/') === -1) {
        transformedValue = value + '/';
      } else if (value.length === 5 && value.lastIndexOf('/') !== 4) {
        transformedValue = value.substring(0, 5) + '/' + value.substring(5);
      } else if (value.length > 10) {
        transformedValue = value.substring(0, 10);
      }
    } else if (name === 'height' || name === 'weight') {
      transformedValue = value.replace(',', '.');

      const parts = transformedValue.split('.');
      if (parts.length > 2) {
        transformedValue = `${parts[0]}.${parts.slice(1).join('')}`;
      }
    } else if (name === 'realName' || name === 'heroName') {
      setNameError(value.trim() === '' ? `Ambos os nomes são obrigatórios.` : '');
    }

    setNewHero((prevHero) => ({ ...prevHero, [name]: transformedValue }));
  };

  const handleSuperPowerChange = (e) => {
    const { value, checked } = e.target;
    setTempSuperPoderes((prevSuperPoderes) => {
      let newSuperPoderes = checked
        ? [...prevSuperPoderes, value]
        : prevSuperPoderes.filter((id) => id !== value);

      return newSuperPoderes;
    });

    setNewHero((prevHero) => ({ ...prevHero, heroSuperPowers: tempSuperPoderes }));
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
      if (newHero.realName.trim() === '') {
        setNameError('Nome é obrigatório.');
        return;
      }

      if (newHero.heroName.trim() === '') {
        setNameError('Nome de Herói é obrigatório.');
        return;
      }

      if (newHero.height.trim() === '') {
        setHeightError('Altura é obrigatória.');
        return;
      }

      if (newHero.weight.trim() === '') {
        setWeightError('Peso é obrigatório.');
        return;
      }

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
        setSubmitSuccess(false);
        throw new Error('Erro ao enviar dados ao backend.');
      }

      const data = await response.json();
      console.log(data);

      setSubmitSuccess(true);
      window.location.reload();
    } catch (error) {
      console.error(error);

      setSubmitSuccess(false);
    }
  };

  return (
    <div className='super-hero-form'>
      <h2>Super Hero Crud!!</h2>
      <form>
        <label>
          Nome Real:
          <input
            required={true}
            type="text"
            name="realName"
            value={newHero.realName}
            onChange={handleInputChange} />
          {nameError && <span className="error-message">{nameError}</span>}
        </label>
        <label>
          Nome de Herói:
          <input
            required={true}
            type="text"
            name="heroName"
            value={newHero.heroName}
            onChange={handleInputChange} />
          {nameError && <span className="error-message">{nameError}</span>}
        </label>
        <label>
          Data de Nascimento:
          <input
            type="text"
            name="birthDate"
            value={newHero.birthDate}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
            className={dateError ? 'error' : ''}
          />
          {dateError && <span className="error-message">{dateError}</span>}
        </label>
        <label>
          Altura:
          <input
            required={true}
            type="text"
            name="height"
            value={newHero.height}
            onChange={handleInputChange} />
          {heightError && <span className="error-message">{heightError}</span>}
        </label>
        <label>
          Peso:
          <input
            required={true}
            type="text"
            name="weight"
            value={newHero.weight}
            onChange={handleInputChange} />
          {weightError && <span className="error-message">{weightError}</span>}
        </label>
        <label>
          Superpoderes:
        </label>
        <div className='super-power-list'>

          {superPower.map((power) => (
            <div key={power.powerId}>
              <input
                type="checkbox"
                id={`power-${power.powerId}`}
                name="heroSuperPowers"
                value={power.powerId}
                onChange={handleSuperPowerChange}
              />
              <label htmlFor={`power-${power.powerId}`}>{power.powerName}</label>
            </div>
          ))}

        </div>
        {submitSuccess === true && <div className="success-message">Formulário enviado com sucesso!</div>}
        {submitSuccess === false && <div className="error-message">Erro ao enviar o formulário.</div>}
        <button type="button" onClick={handleFormSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default SuperHeroForm;
