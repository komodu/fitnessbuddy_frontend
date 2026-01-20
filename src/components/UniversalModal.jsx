import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";
function UniversalModal() {
  const { closeModal, title, content, show } = useContext(ModalContext);
  // const [show, setShow] = useState(false);

  // // Functions to handle modal open/close
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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
