import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "~/env";
import { fetchLogin } from "~/actions/usuarios";

import LoadingHolder from "~/components/LoadingHolder";

const USUARIO_KEY = "@usuario";

const AuthContext = createContext();

let _lastInterceptor = null;
function setAxiosInterceptorWithToken(token = null) {
  // caso já tivéssemos setado um interceptador antes do axios
  // a ideia é remover ele antes de adicionar a versão atualizada
  if (!!_lastInterceptor) {
    axios.interceptors.request.eject(_lastInterceptor);
    _lastInterceptor = null;
  }

  // ao adicionar um interceptor (com ou sem header de auth)
  // salvamos a referencia do mesmo para "ejetar" depois em uma
  // eventual mudança/atualização nos headers
  _lastInterceptor = axios.interceptors.request.use(config => {
    config.baseURL = API_URL;
    if (!!token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    } else {
      config.headers.common.Authorization = null;
      delete config.headers.common.Authorization;
    }
    return config;
  });
}

function restoreLoginFromStorage() {
  let storageUsuario = window.localStorage.getItem(USUARIO_KEY);
  if (!!storageUsuario) {
    storageUsuario = JSON.parse(storageUsuario);
    setAxiosInterceptorWithToken(storageUsuario?.token);

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
        setAxiosInterceptorWithToken(sessionData.token);
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
    setAxiosInterceptorWithToken(null);
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
