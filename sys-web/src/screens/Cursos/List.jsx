import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listCursos, destroyCurso } from "~/actions/cursos";

export default function List() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  async function fetchDestroyCurso(item) {
    if (window.confirm(`Você confirma a exclusão do curso ${item.name}?`)) {
      setLoading(true);

      try {
        const data = await destroyCurso(item.id);
        if (!!data?.success) {
          setItems([]);
          fetchListCursos();
        }
      } catch (err) {
        alert("Não foi possível excluir o curso neste momento");
      } finally {
        setLoading(false);
      }
    }
  }

  async function fetchListCursos() {
    setLoading(true);

    try {
      const data = await listCursos();
      setItems(data);
    } catch (err) {
      alert("Não foi possível carregar a lista de cursos do sistema");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListCursos();
  }, []);

  return (
    <LoadingHolder loading={!!loading}>
      <div className="table-responsive">
        <Link className="btn btn-primary float-end" to="/cursos/add" role="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>{" "}
          Adicionar Curso
        </Link>
        <h2 className="h3 mb-4 fw-normal">Cursos cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="text-center" style={{ width: 112 }}>
                Alunos
              </th>
              <th className="text-center" style={{ width: 146 }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={3} className="text-center p-5">
                  Nenhum curso cadastrado em nosso sistema!
                </td>
              </tr>
            )}
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">{item.alunosCount}</td>
                <td className="text-center">
                  <Link className="btn btn-info btn-sm" to={`/cursos/edit/${item.id}`} role="button">
                    Editar
                  </Link>
                  <a
                    onClick={event => {
                      event.preventDefault();
                      fetchDestroyCurso(item);
                    }}
                    className="btn btn-danger btn-sm"
                    href="#delete-curso"
                    role="button">
                    Excluir
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LoadingHolder>
  );
}
