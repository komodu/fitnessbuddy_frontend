import { useContext } from "react";
import {
  ActiveLinkContext,
  AuthContext,
  ExercisesContext,
  ModalContext,
  UserDataContext,
} from "../../context/Context";

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (!context) {
    throw new Error("useActiveLink must be used within ActiveLinkProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context)
    throw new Error("useCurrentUser must be used within UserDataProvider");

  return context;
};

export const useExercises = () => {
  const context = useContext(ExercisesContext);
  if (!context)
    throw new Error("useExercises must be used within ExercisesProvider");
  return context;
};
