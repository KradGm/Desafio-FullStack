import React, { useState, useEffect } from 'react';
import { addHero, fetchHeroes } from '../services/ApiService';
import '../css/SuperHeroForm.css';
import BaseDataForm from './BaseDataForm';
import SuperPowerSelection from './SuperPowerSelection';

const SuperHeroForm = ({ onSubmit, superPowers }) => {
  const [formData, setFormData] = useState({
    baseData: {},
    selectedPowers: [],
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleBaseDataChange = (newBaseData) => {
    setFormData((prevData) => ({ ...prevData, baseData: newBaseData }));
  };

  const handlePowerSelectionChange = (powerId, action) => {
    const selectedPowers = [...formData.selectedPowers];
    if (action === 'add') {
      selectedPowers.push(powerId);
    } else {
      const index = selectedPowers.indexOf(powerId);
      selectedPowers.splice(index, 1);
    }
    setFormData((prevData) => ({ ...prevData, selectedPowers }));
  };

  const handleFormSubmit = async () => {
    const combinedData = {
      ...formData.baseData,
      heroSuperPowers: formData.selectedPowers.map((powerId) => ({
        superPowerId: powerId,
      })),
    };
    try {
      console.log(combinedData);
      await addHero('SuperHero', combinedData);
      onSubmit();
    } catch (error) {
      handleCommonError(error);
    }
  };

  const handleCommonError = (error) => {
    console.error('Error:', error);
    setErrorMessages({ ...errorMessages, generalError: error.message });
  };

  return (
    <div className='super-hero-form'>
      <h2>Super Hero Crud!!</h2>
      <BaseDataForm
        errorMessages={errorMessages}
        onFormDataChange={handleBaseDataChange}
      />
      <SuperPowerSelection
        superPowers={superPowers}
        selectedPowers={formData.selectedPowers}
        onPowerSelectionChange={handlePowerSelectionChange}
      />
      {errorMessages.generalError && (
        <span className="error-message">{errorMessages.generalError}</span>
      )}
      <button type="button" onClick={handleFormSubmit}>
        Enviar
      </button>
    </div>
  );
};

export default SuperHeroForm;