import { useState } from "react";
import { ModalContext } from "../Context";

// export const useModalContext = () => useContext(ModalContext);
const ModalProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [show, setShow] = useState(false);

  const openModal = (modalTitle, modalContent) => {
    setTitle(modalTitle);
    setContent(modalContent);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, title, content, show }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
