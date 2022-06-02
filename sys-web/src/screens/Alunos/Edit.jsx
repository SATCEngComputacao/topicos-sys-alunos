import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findAluno, updateAluno } from "~/actions/alunos";
import { listCursos } from "~/actions/cursos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cursoId: Yup.string().required("Campo obrigatório"),
});

export default function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const currentAluno = useQuery(`aluno-${id}`, () => findAluno(id));
  const fetchUpdateAluno = useMutation(formData => updateAluno(id, formData), {
    onSuccess: () => navigate("/alunos", { replace: true }),
  });

  const cursos = useQuery("cursos", listCursos);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      currentAluno.status === "success"
        ? currentAluno.data
        : {
            name: "",
            email: "",
            cursoId: "",
          },
    validationSchema,
    onSubmit: values => {
      fetchUpdateAluno.mutate(values);
    },
  });

  const isLoading = !!currentAluno.isLoading || !!fetchUpdateAluno.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Editando Aluno</h2>
        <SysInput
          id="name"
          type="text"
          label="Nome Completo do Aluno"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={hasFormError(formik, "name")}
        />
        <SysInput
          id="email"
          type="text"
          label="E-mail do Aluno"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={hasFormError(formik, "email")}
        />
        <SysInput
          id="cursoId"
          disabled={!cursos.data}
          options={cursos.status === "success" ? cursos.data : [{ value: "", label: "Carregando cursos..." }]}
          label="Curso Matriculado"
          value={formik.values.cursoId}
          onChange={formik.handleChange}
          error={hasFormError(formik, "cursoId")}
        />
        <button disabled={isLoading || !cursos.data} className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
