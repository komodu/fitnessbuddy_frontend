import { useState } from "react";
import { ModalContext } from "../Context";
import { useCustomModal } from "../../hooks/useCustomModal";

// export const useModalContext = () => useContext(ModalContext);
const ModalProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const [show, setShow] = useState(false);

  const { openModal, closeModal } = useCustomModal({
    setTitle,
    setContent,
    setShow,
  });

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, title, content, show }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
