import { Modal, Button } from "react-bootstrap";
import { useModal } from "../hooks/accessor/ContextAccessors";
function UniversalModal() {
  const { closeModal, title, content, show } = useModal();
  if (!show) return null;

  return (
    <>
      {/* Modal */}
      <Modal show={show} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UniversalModal;
