import { Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import LoginLayout from "./layouts/LoginLayout";

import Auth from "./screens/Auth";
import Home from "./screens/Home";

/* CURSOS */
import CursosList from "./screens/Cursos/List";
import CursosAdd from "./screens/Cursos/Add";
import CursosEdit from "./screens/Cursos/Edit";

/* ALUNOS */
import AlunosList from "./screens/Alunos/List";
import AlunosAdd from "./screens/Alunos/Add";
import AlunosEdit from "./screens/Alunos/Edit";

function RequireLogin() {
  const location = useLocation();

  return <Navigate to="/login" state={{ from: location }} replace />;
}

function App() {
  const isLogged = false;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!!isLogged ? <AppLayout /> : <LoginLayout />}>
          <Route path="/login" element={<Auth />} />
          {!!isLogged ? (
            <Fragment>
              <Route index element={<Home />} />
              <Route path="cursos">
                <Route index element={<CursosList />} />
                <Route path="add" element={<CursosAdd />} />
                <Route path="edit/:id" element={<CursosEdit />} />
              </Route>
              <Route path="alunos">
                <Route index element={<AlunosList />} />
                <Route path="add" element={<AlunosAdd />} />
                <Route path="edit/:id" element={<AlunosEdit />} />
              </Route>
            </Fragment>
          ) : (
            <Route index element={<RequireLogin />} />
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
