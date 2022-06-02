import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "~/env";
import { fetchLogin } from "~/actions/usuarios";

import LoadingHolder from "~/components/LoadingHolder";

const USUARIO_KEY = "@usuario";

const AuthContext = createContext();

function setAxiosDefaults(token = null) {
  axios.defaults.baseURL = API_URL;
  if (!!token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common.Authorization = null;
    delete axios.defaults.headers.common.Authorization;
  }
}

function restoreLoginFromStorage() {
  let storageUsuario = window.localStorage.getItem(USUARIO_KEY);
  if (!!storageUsuario) {
    storageUsuario = JSON.parse(storageUsuario);
    setAxiosDefaults(storageUsuario?.token);

    return storageUsuario;
  }

  return null;
}

function persistLoginInStorage(usuario) {
  window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

function AuthProvider(props) {
  const [isPreloadingLogin, setIsPreloadingLogin] = useState(true);
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
        setAxiosDefaults(sessionData.token);
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
    setAxiosDefaults(null);
    persistLoginInStorage(null);
  };

  useEffect(() => {
    if (!data) {
      const storageUsuario = restoreLoginFromStorage();
      if (!!storageUsuario && "token" in storageUsuario) {
        setData(storageUsuario);
      }
    }
    setIsPreloadingLogin(false);
  }, []);

  if (!!isPreloadingLogin) {
    return (
      <LoadingHolder loading={true}>
        <div style={{ width: "100%", height: "100%" }}></div>
      </LoadingHolder>
    );
  }

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
