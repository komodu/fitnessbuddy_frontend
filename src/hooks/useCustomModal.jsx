import { useState } from "react";

export const useCustomModal = () => {
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

  return { openModal, closeModal, title, content, show };
};
