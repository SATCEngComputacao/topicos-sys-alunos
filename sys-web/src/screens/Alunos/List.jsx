import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listAlunos, destroyAluno } from "~/actions/alunos";

export default function List() {
  const queryClient = useQueryClient();

  // alunos.isLoading = vai indicar um carregamento ta rolando ou nao
  // alunos.data = conter os dados do servidor após o carregamento (ou do cache)
  // alunos.status = success, error ou loading
  // alunos.error = mensagem de erro que veio do servidor
  const alunos = useQuery("alunos", listAlunos);

  const fetchDestroyAluno = useMutation(item => destroyAluno(item.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("alunos");
    },
  });

  const isLoading = !!alunos.isLoading || !!fetchDestroyAluno.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      {alunos.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de alunos do sistema neste momento
        </div>
      )}
      {fetchDestroyAluno.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este aluno neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyAluno.reset()}></button>
        </div>
      )}
      {fetchDestroyAluno.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Aluno excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyAluno.reset()}></button>
        </div>
      )}
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
          {!!alunos.data && (
            <tbody>
              {alunos.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-5">
                    Nenhum aluno cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {alunos.data.map(item => (
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
                        if (window.confirm(`Você confirma a exclusão do aluno ${item.name}?`)) {
                          fetchDestroyAluno.mutate(item);
                        }
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
          )}
        </table>
      </div>
    </LoadingHolder>
  );
}
