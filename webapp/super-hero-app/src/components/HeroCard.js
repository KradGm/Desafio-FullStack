import React, { useState } from 'react';
import '../css/HeroCard.css';

const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

const HeroCard = ({ hero, superPowers, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedHero, setEditedHero] = useState({ ...hero });
    const [showPowers, setShowPowers] = useState(false);
    const API_URL = "http://localhost:5182/";

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedHero({ ...hero });
    };
    const handleDeleteClick = () => {
        onDelete(hero.id);
    };
    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleUpdateClick = () => {
        setIsEditing(false);

        fetch(`${API_URL}api/SuperHero/UpdateHero/${hero.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedHero),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                onUpdate(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
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