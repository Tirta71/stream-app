import { createContext, useContext } from "react";

const AuthSessionContext = createContext(null);

function useAuthSession() {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error("useAuthSession harus digunakan di dalam AuthSessionProvider");
  }

  return context;
}

export { AuthSessionContext, useAuthSession };
