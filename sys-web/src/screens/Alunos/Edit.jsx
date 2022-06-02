import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findAluno, updateAluno } from "~/actions/alunos";
import { listCursos } from "~/actions/cursos";

import { hasFormError, flatObjectToOptions, flatArrayToObject } from "~/utils";

const validationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  cursoId: Yup.string().required("Campo obrigatório"),
});

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [aluno, setAluno] = useState({
    name: "",
    email: "",
    cursoId: null,
  });
  const [cursos, setCursos] = useState([]);

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

  async function findListCursos() {
    setLoading(true);

    try {
      const data = await listCursos();
      setCursos(data);
    } catch (err) {
      //
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    findListCursos();
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
          options={flatObjectToOptions(flatArrayToObject(cursos, "id", "name"))}
          label="Curso Matriculado"
          value={formik.values.cursoId}
          onChange={formik.handleChange}
          error={hasFormError(formik, "cursoId")}
        />
        <button className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
