import React, { useState } from 'react';
import '../css/HeroCard.css';
import { updateHero, deleteHero } from '../services/ApiService';

const formatBirthDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const HeroCard = ({ hero, superPowers, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHero, setEditedHero] = useState({ ...hero });
  const [showPowers, setShowPowers] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedHero({ ...hero });
  };

  const handleDeleteClick = async () => {
    try {
      await deleteHero('SuperHero', hero.id);
      setDeleteMessage('Herói deletado com sucesso.');
      onDelete(hero.id);
    } catch (error) {
      console.error('Erro ao excluir herói:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setDeleteMessage('');
  };

  const handleUpdateClick = async () => {
    setIsEditing(false);

    try {
      const data = await updateHero('SuperHero/UpdateHero', hero.id, editedHero);
      onUpdate(data);
    } catch (error) {
      console.error('Erro ao atualizar herói:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHero((prevHero) => ({ ...prevHero, [name]: value }));
  };

  const togglePowers = () => {
    setShowPowers((prevShowPowers) => !prevShowPowers);
  };

  return (
    <div className={`hero-card ${isEditing ? 'editing' : ''}`}>
      <header className='hero-name'>
        <h2>
          {isEditing ? (
            <input type="text" name="heroName" value={editedHero.heroName} onChange={handleInputChange} />
          ) : (
            `Nome do Herói: ${hero.heroName}`
          )}
        </h2>
      </header>
      <div className='mid-hero-info'>
        {isEditing ? (
          <>
            <p>
              Nome Real: <input type="text" name="realName" value={editedHero.realName} onChange={handleInputChange} />
            </p>
            <p>
              Data de Nascimento:{' '}
              <input type="date" name="birthDate" value={formatBirthDate(editedHero.birthDate)} onChange={handleInputChange} />
            </p>
            <p>
              Altura: <input type="number" name="height" value={editedHero.height} onChange={handleInputChange} />
            </p>
            <p>
              Peso: <input type="number" name="weight" value={editedHero.weight} onChange={handleInputChange} />
            </p>
          </>
        ) : (
          <>
            <p>Nome Real: {hero.realName}</p>
            <p>Data de Nascimento: {formatBirthDate(hero.birthDate)}</p>
            <p>Altura: {hero.height}</p>
            <p>Peso: {hero.weight}</p>
          </>
        )}
        <h3 onClick={togglePowers} style={{ cursor: 'pointer', color: '#007bff' }}>
          Poderes {showPowers ? '▼' : '▶'}
        </h3>
        {showPowers && (
          <div className='hero-super-powers'>
            {editedHero.heroSuperPowers.map((power, index) => {
              const correspondingPower = superPowers.find((superPower) => superPower.powerId === power.superPowerId);

              return (
                <div key={index} className='power-card'>
                  <p>
                    {correspondingPower ? correspondingPower.powerName : 'N/A'}
                    <br />
                    {correspondingPower ? correspondingPower.description : 'N/A'}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className='edit-buttons'>
        {deleteMessage && <p style={{ color: 'green' }}>{deleteMessage}</p>}
        {isEditing ? (
          <>
            <button onClick={handleUpdateClick}>Atualizar</button>
            <button onClick={handleCancelClick}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={handleEditClick}>Editar</button>
            <button className='delete-button' onClick={handleDeleteClick}>Excluir</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroCard;