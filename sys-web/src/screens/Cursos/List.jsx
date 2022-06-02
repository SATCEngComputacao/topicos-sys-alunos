import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import LoadingHolder from "~/components/LoadingHolder";

import { listCursos, destroyCurso } from "~/actions/cursos";

export default function List() {
  const cursos = useQuery("cursos", listCursos);
  const fetchDestroyCurso = useMutation(item => destroyCurso(item.id));

  return (
    <LoadingHolder loading={!!cursos.isLoading || !!fetchDestroyCurso.isLoading}>
      {cursos.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de cursos do sistema neste momento
        </div>
      )}
      {fetchDestroyCurso.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este curso neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyCurso.reset()}></button>
        </div>
      )}
      {fetchDestroyCurso.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Curso excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyCurso.reset()}></button>
        </div>
      )}
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
          {!!cursos.data && (
            <tbody>
              {cursos.data.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-5">
                    Nenhum curso cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {cursos.data.map(item => (
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
                        if (window.confirm(`Você confirma a exclusão do curso ${item.name}?`)) {
                          fetchDestroyCurso.mutate(item);
                        }
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
          )}
        </table>
      </div>
    </LoadingHolder>
  );
}
