import { Card, Button, Form } from "react-bootstrap";

export default function TabelaConsultas({ consultas, onEditar, onExcluir, onFiltrar }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      
      {}
      <Form.Control
        type="text"
        placeholder="Buscar por nome ou médico..."
        className="mb-3"
        onChange={(e) => onFiltrar(e.target.value)}
      />

      {}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
          minHeight: 0,
        }}
      >
        {consultas.length === 0 && <p>Nenhuma consulta encontrada.</p>}

        {consultas.map((c) => (
          <Card key={c.id} style={{ width: "100%" }}>
            <Card.Body className="d-flex flex-column justify-content-between h-100">
              
              {}
              <div>
                <Card.Title className="fw-bold">{c.nome}</Card.Title>

                <Card.Text>
                  <strong>Médico:</strong> {c.medico} <br />
                  <strong>Área:</strong> {c.area} <br />
                  <strong>Data:</strong> {c.data} <br />
                  <strong>Hora:</strong> {c.hora} <br />
                  <br />
                  <strong>CPF:</strong> {c.cpf} <br />
                  <strong>Telefone:</strong> {c.telefone} <br />
                  <strong>Email:</strong> {c.email} <br />
                  <strong>Endereço:</strong> {c.endereco}
                </Card.Text>
              </div>

              {}
              <div className="mt-3">
                <Button
                  variant="primary"
                  onClick={() => onEditar(c)}
                  className="me-2"
                >
                  Editar
                </Button>

                <Button
                  variant="danger"
                  onClick={() => onExcluir(c)}
                >
                  Excluir
                </Button>
              </div>

            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
