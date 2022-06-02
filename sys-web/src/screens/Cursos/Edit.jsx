import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findCurso, updateCurso } from "~/actions/cursos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
});

export default function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const currentCurso = useQuery(`curso-${id}`, () => findCurso(id));
  const fetchUpdateCurso = useMutation(formData => updateCurso(id, formData), {
    onSuccess: () => navigate("/cursos", { replace: true }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      currentCurso.status === "success"
        ? currentCurso.data
        : {
            name: "",
          },
    validationSchema,
    onSubmit: values => {
      fetchUpdateCurso.mutate(values);
    },
  });

  const isLoading = !!currentCurso.isLoading || !!fetchUpdateCurso.isLoading;

  return (
    <LoadingHolder loading={isLoading}>
      {fetchUpdateCurso.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível salvar este novo curso no momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchUpdateCurso.reset()}></button>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Editando Curso</h2>
        <SysInput
          id="name"
          type="text"
          label="Nome do curso"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={hasFormError(formik, "name")}
        />
        <button disabled={isLoading} className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
