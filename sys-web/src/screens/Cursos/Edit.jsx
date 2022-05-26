import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findCurso, updateCurso } from "~/actions/cursos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
});

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [curso, setCurso] = useState({
    name: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: curso,
    validationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const data = await updateCurso(id, values);
        if (!!data?.success) {
          navigate("/cursos", { replace: true });
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  async function fetchCurso(id) {
    setLoading(true);

    try {
      const data = await findCurso(id);
      setCurso(data);
    } catch (err) {
      alert("Não foi possível carregar os dados do curso do sistema");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCurso(id);
  }, [id]);

  return (
    <LoadingHolder loading={!!loading}>
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
        <button className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
