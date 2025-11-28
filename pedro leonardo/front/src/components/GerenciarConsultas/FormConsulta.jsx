import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { maskCPF, maskPhone } from "../../utils/masks";
import { isEmailValid, isCPFValid } from "../../utils/validators";

function FormConsulta({ onSalvar, consultaEdit }) {
  const [dados, setDados] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    email: "",
    telefone: "",
    medico: "",
    area: "",
    data: "",
    hora: ""
  });

  useEffect(() => {
    if (consultaEdit) setDados(consultaEdit);
  }, [consultaEdit]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") value = maskCPF(value);
    if (name === "telefone") value = maskPhone(value);

    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCPFValid(dados.cpf)) {
      alert("CPF inválido!");
      return;
    }

    if (!isEmailValid(dados.email)) {
      alert("E-mail inválido!");
      return;
    }

    // Monta objeto no formato que o backend espera
    onSalvar({
      nome: dados.nome,
      medico: dados.medico,
      data: dados.data,
      status: "Agendada",
      descricao: `Área: ${dados.area} | Hora: ${dados.hora}`,
      cpf: dados.cpf,
      endereco: dados.endereco,
      email: dados.email,
      telefone: dados.telefone,
      area: dados.area,
      hora: dados.hora
    });

    // Reseta o formulário
    setDados({
      nome: "",
      cpf: "",
      endereco: "",
      email: "",
      telefone: "",
      medico: "",
      area: "",
      data: "",
      hora: ""
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 bg-white shadow rounded">

      <Form.Group className="mb-2">
        <Form.Label>Nome</Form.Label>
        <Form.Control name="nome" value={dados.nome || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>CPF</Form.Label>
        <Form.Control name="cpf" value={dados.cpf || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Endereço</Form.Label>
        <Form.Control name="endereco" value={dados.endereco || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" name="email" value={dados.email || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Telefone</Form.Label>
        <Form.Control name="telefone" value={dados.telefone || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Médico</Form.Label>
        <Form.Control name="medico" value={dados.medico || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Área da Consulta</Form.Label>
        <Form.Control name="area" value={dados.area || ""} onChange={handleChange} required />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Data da Consulta</Form.Label>
        <Form.Control
          type="date"
          name="data"
          value={dados.data || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Hora da Consulta</Form.Label>
        <Form.Control
          type="time"
          name="hora"
          value={dados.hora || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button type="submit" variant="primary">Salvar</Button>
    </Form>
  );
}

export default FormConsulta;
