const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const DB_FILE = path.join(__dirname, 'consultas.json');


function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return content ? JSON.parse(content) : [];
  } catch (err) {
    console.error("Erro ao ler consultas.json:", err);
    return [];
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Erro ao escrever consultas.json:", err);
  }
}

app.post('/api/consultas', (req, res) => {
  const { nome, medico, data, status, descricao, cpf, endereco, email, telefone, area, hora } = req.body;
  if (!nome || !medico || !data || !status) {
    return res.status(400).json({ error: "Campos obrigatórios: nome, médico, data, status" });
  }

  let db = readDB();
  const nova = { 
    id: Date.now(), 
    nome, 
    medico, 
    data, 
    status, 
    descricao, 
    cpf, 
    endereco, 
    email, 
    telefone, 
    area, 
    hora 
  };
  db.push(nova);
  writeDB(db);

  res.status(201).json(nova);
});

app.get('/api/consultas', (req, res) => {
  let db = readDB();
  const { nome, medico } = req.query;
  if (nome) db = db.filter(c => c.nome.toLowerCase().includes(nome.toLowerCase()));
  if (medico) db = db.filter(c => c.medico.toLowerCase().includes(medico.toLowerCase()));
  res.json(db);
});

app.put('/api/consultas/:id', (req, res) => {
  let db = readDB();
  const id = parseInt(req.params.id);
  const idx = db.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Consulta não encontrada" });

  db[idx] = { ...db[idx], ...req.body };
  writeDB(db);
  res.json(db[idx]);
});

app.delete('/api/consultas/:id', (req, res) => {
  let db = readDB();
  const id = parseInt(req.params.id);
  db = db.filter(c => c.id !== id);
  writeDB(db);
  res.json({ message: "Consulta removida" });
});

app.listen(5000, () => console.log("API rodando na porta 5000"));
