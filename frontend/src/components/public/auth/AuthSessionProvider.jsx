import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  getAuthErrorMessage,
  logout as logoutRequest,
} from "../../../services/authApi.js";
import { AuthSessionContext } from "../../../hooks/public/useAuthSession.js";

function AuthSessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const refreshSession = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const authData = await getCurrentUser();

      setUser(authData.user ?? authData ?? null);
      setStatus("authenticated");

      return authData.user ?? authData ?? null;
    } catch (sessionError) {
      setUser(null);
      setStatus("unauthenticated");
      setError(getAuthErrorMessage(sessionError));

      return null;
    }
  }, []);

  const completeLogin = useCallback((authData) => {
    const nextUser = authData?.user ?? authData ?? null;

    setUser(nextUser);
    setStatus(nextUser ? "authenticated" : "unauthenticated");
    setError("");
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setStatus("unauthenticated");
    setError("");

    await logoutRequest().catch(() => null);
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      refreshSession();
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      completeLogin,
      error,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      logout,
      refreshSession,
      status,
      user,
    }),
    [completeLogin, error, logout, refreshSession, status, user],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}

export default AuthSessionProvider;
