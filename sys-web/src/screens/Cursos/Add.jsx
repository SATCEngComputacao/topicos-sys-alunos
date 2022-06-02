import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { createCurso } from "~/actions/cursos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
});

export default function Add() {
  const navigate = useNavigate();

  const fetchCreateCurso = useMutation(createCurso, {
    onSuccess: () => navigate("/cursos", { replace: true }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: values => {
      fetchCreateCurso.mutate(values);
    },
  });

  return (
    <LoadingHolder loading={!!fetchCreateCurso.isLoading}>
      {fetchCreateCurso.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível salvar este novo curso no momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchCreateCurso.reset()}></button>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Adicionando novo Curso</h2>
        <SysInput
          id="name"
          type="text"
          label="Informe o nome do curso"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={hasFormError(formik, "name")}
        />
        <button disabled={!!fetchCreateCurso.isLoading} className="btn btn-lg btn-primary mt-3" type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}
