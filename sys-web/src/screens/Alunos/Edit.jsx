import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findAluno, updateAluno } from "~/actions/alunos";

import { hasFormError } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
});

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [aluno, setAluno] = useState({
    name: "",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: aluno,
    validationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        const data = await updateAluno(id, values);
        if (!!data?.success) {
          navigate("/alunos", { replace: true });
        }
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  async function fetchAluno(id) {
    setLoading(true);

    try {
      const data = await findAluno(id);
      setAluno(data);
    } catch (err) {
      alert("Não foi possível carregar os dados do aluno do sistema");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAluno(id);
  }, [id]);

  return (
    <LoadingHolder loading={!!loading}>
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
        <button className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
