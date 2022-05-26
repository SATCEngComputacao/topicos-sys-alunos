import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const data = await createCurso(values);
        if (!!data?.id) {
          navigate("/cursos", { replace: true });
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <LoadingHolder loading={!!loading}>
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
        <button className="btn btn-lg btn-primary mt-3" type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}
