export const useCustomModal = ({ setTitle, setContent, setShow }) => {
  const openModal = (modalTitle, modalContent) => {
    setTitle(modalTitle);
    setContent(modalContent);
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  return { openModal, closeModal };
};
