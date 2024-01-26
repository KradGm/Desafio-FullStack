const API_URL = "http://localhost:5182/";

async function fetchHeroes(endpoint) {
  const response = await fetch(`${API_URL}api/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Erro ao obter dados da API (${endpoint}): ${response.statusText}`);
  }
  return response.json();
}

async function addHero(endpoint, data) {
  const response = await fetch(`${API_URL}api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao enviar dados para a API (${endpoint}): ${response.statusText}`);
  }

  return response.json();
}

async function updateHero(endpoint, id, data) {
  const response = await fetch(`${API_URL}api/${endpoint}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar dados na API (${endpoint}): ${response.statusText}`);
  }

  return response.json();
}

async function deleteHero(endpoint, id) {
  const response = await fetch(`${API_URL}api/${endpoint}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erro ao excluir dados na API (${endpoint}): ${response.statusText}`);
  }

  return true;
}

export { fetchHeroes, addHero, updateHero, deleteHero };