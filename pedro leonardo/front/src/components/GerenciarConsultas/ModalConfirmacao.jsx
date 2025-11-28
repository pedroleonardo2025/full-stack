import { Modal, Button } from "react-bootstrap";

function ModalConfirmacao({ show, onHide, onConfirm, mensagem }) {
  const texto = mensagem || "Deseja realmente excluir este registro?";

  const handleConfirm = () => {
    onConfirm();  
    onHide();     
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Exclusão</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {texto}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Excluir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmacao;
