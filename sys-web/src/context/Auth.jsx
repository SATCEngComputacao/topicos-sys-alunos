import { useContext, createContext, useState, useEffect } from "react";

import { defaults } from "~/env";
import { fetchLogin } from "~/actions/usuarios";

const USUARIO_KEY = "@usuario";

const AuthContext = createContext();

function setToken(token = null) {
  if (!!token) {
    defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    defaults.headers.Authorization = null;
    delete defaults.headers.Authorization;
  }
}

function restoreLoginFromStorage() {
  let storageUsuario = window.localStorage.getItem(USUARIO_KEY);
  if (!!storageUsuario) {
    storageUsuario = JSON.parse(storageUsuario);
    setToken(storageUsuario?.token);

    return storageUsuario;
  }

  return null;
}

function persistLoginInStorage(usuario) {
  window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

function AuthProvider(props) {
  const [data, setData] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const loginData = await fetchLogin({ email, password });
      if (!!loginData && !!loginData.error) {
        throw new Error(loginData.error);
      }

      if (!!loginData && !!loginData.usuario && !!loginData.token) {
        const sessionData = { usuario: loginData.usuario, token: loginData.token };
        setData(sessionData);
        persistLoginInStorage(sessionData);
        return;
      }

      throw new Error(`Login inconsistente, tente novamente mais tarde.`);
    } catch (err) {
      logout();

      throw err;
    }
  };

  const logout = () => {
    setData(null);
    setToken(null);
    persistLoginInStorage(null);
  };

  useEffect(() => {
    if (!data) {
      const storageUsuario = restoreLoginFromStorage();
      if (!!storageUsuario && "token" in storageUsuario) {
        setData(storageUsuario);
      }
    }
  }, []);

  return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
