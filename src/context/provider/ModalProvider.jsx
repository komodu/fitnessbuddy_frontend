import { ModalContext } from "../Context";
import { useCustomModal } from "../../hooks/useCustomModal";

// export const useModalContext = () => useContext(ModalContext);
const ModalProvider = ({ children }) => {
  const modal = useCustomModal();

  return (
    <ModalContext.Provider value={modal}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
