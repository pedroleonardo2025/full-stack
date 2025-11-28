const API_URL = "http://localhost:5000/api/consultas";

/* 🔵 Listar todas as consultas (com filtro opcional) */
const getAll = async (filtro = "") => {
  let url = API_URL;
  if (filtro) {
    url += `?nome=${encodeURIComponent(filtro)}`;
  }
  const res = await fetch(url);
  return res.json();
};

/* 🟢 Salvar nova consulta */
const save = async (consulta) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consulta),
  });
  return res.json();
};

/* 🟡 Atualizar consulta existente */
const update = async (id, novosDados) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novosDados),
  });
  return res.json();
};

/* 🔴 Remover consulta */
const remove = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export default { getAll, save, update, remove };
