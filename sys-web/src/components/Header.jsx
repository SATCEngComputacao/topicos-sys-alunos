import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "~/context/AuthContext";
import { useUsuario } from "~/context/UsuarioContext";

function UserMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuario } = useUsuario();

  return (
    <ul className="navbar-nav navbar-right">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#user-menu"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
          {` `}
          {usuario?.name}
        </a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
          <li>
            <a
              className="dropdown-item"
              href="#user-logout"
              onClick={event => {
                event.preventDefault();

                logout();
                navigate("/login", { replace: true });
              }}>
              Sair / Logout
            </a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

function Menu() {
  return (
    <div className="collapse navbar-collapse" id="navbarDefault">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#alunos-menu"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Alunos
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <Link to="/alunos" className="nav-link">
                Listar alunos
              </Link>
            </li>
            <li>
              <Link to="/alunos/add" className="nav-link">
                Cadastrar novo
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#alunos-menu"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Cursos
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li>
              <Link to="/cursos" className="nav-link">
                Listar cursos
              </Link>
            </li>
            <li>
              <Link to="/cursos/add" className="nav-link">
                Cadastrar novo
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <UserMenu />
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            SYS Alunos
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarDefault"
            aria-controls="navbarDefault"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Menu />
        </div>
      </nav>
    </header>
  );
}
