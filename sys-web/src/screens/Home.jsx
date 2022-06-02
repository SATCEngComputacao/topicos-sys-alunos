import { useUsuario } from "~/context/Usuario";

export default function Home() {
  const { usuario } = useUsuario();

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Olá {usuario?.name}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Seja bem-vindo o <strong>SYS Alunos</strong>, um sistema completo de gerencimento dos alunos de sua
          instituição.
        </p>
      </div>
    </div>
  );
}
