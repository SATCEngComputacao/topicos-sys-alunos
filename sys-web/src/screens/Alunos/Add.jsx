import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { createAluno } from "~/actions/alunos";
import { listCursos } from "~/actions/cursos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cursoId: Yup.string().required("Campo obrigatório"),
});

export default function Add() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const fetchCreateAluno = useMutation(createAluno, {
    onSuccess: () => {
      queryClient.invalidateQueries("alunos");
      navigate("/alunos", { replace: true });
    },
  });

  const cursos = useQuery("cursos", listCursos);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      cursoId: "",
    },
    validationSchema,
    onSubmit: values => {
      fetchCreateAluno.mutate(values);
    },
  });

  return (
    <LoadingHolder loading={!!fetchCreateAluno.isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Adicionando novo Aluno</h2>
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
        <button
          disabled={!!fetchCreateAluno.isLoading || !cursos.data}
          className="btn btn-lg btn-primary mt-3"
          type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}
