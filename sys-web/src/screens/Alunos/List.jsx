import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listAlunos, destroyAluno } from "~/actions/alunos";

export default function List() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  async function fetchDestroyAluno(item) {
    if (window.confirm(`Você confirma a exclusão do aluno ${item.name}?`)) {
      setLoading(true);

      try {
        const data = await destroyAluno(item.id);
        if (!!data?.success) {
          setItems([]);
          fetchListAlunos();
        }
      } catch (err) {
        alert("Não foi possível excluir o aluno neste momento");
      } finally {
        setLoading(false);
      }
    }
  }

  async function fetchListAlunos() {
    setLoading(true);

    try {
      const data = await listAlunos();
      setItems(data);
    } catch (err) {
      alert("Não foi possível carregar a lista de alunos do sistema");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListAlunos();
  }, []);

  return (
    <LoadingHolder loading={!!loading}>
      <div className="table-responsive">
        <Link className="btn btn-primary float-end" to="/alunos/add" role="button">
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
          Adicionar Aluno
        </Link>
        <h2 className="h3 mb-4 fw-normal">Alunos cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Curso</th>
              <th className="text-center" style={{ width: 146 }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="text-center p-5">
                  Nenhum aluno cadastrado em nosso sistema!
                </td>
              </tr>
            )}
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </td>
                <td>{item.Curso.name}</td>
                <td className="text-center">
                  <Link className="btn btn-info btn-sm" to={`/alunos/edit/${item.id}`} role="button">
                    Editar
                  </Link>
                  <a
                    onClick={event => {
                      event.preventDefault();
                      fetchDestroyAluno(item);
                    }}
                    className="btn btn-danger btn-sm"
                    href="#delete-aluno"
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
