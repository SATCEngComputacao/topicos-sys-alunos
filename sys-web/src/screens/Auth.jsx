import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAuth } from "../context/AuthContext";

import LoadingHolder from "../components/LoadingHolder";
import SysInput from "../components/SysInput";

import { hasFormError } from "../utils";

const validationSchema = Yup.object({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string().required("Campo obrigatório"),
});

export default function Auth() {
  let [loading, setLoading] = useState(false);
  let { login } = useAuth();

  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true);

      try {
        await login(values);
        navigate("/", { replace: true });
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <main className="form-signin">
      <LoadingHolder loading={!!loading}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <h1 className="h3 mb-3 fw-normal">SYS Aluno</h1>
          <SysInput
            id="email"
            type="email"
            label="Endereço de e-mail"
            placeholder="name@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={hasFormError(formik, "email")}
          />
          <SysInput
            id="password"
            type="password"
            label="Senha"
            placeholder="*******"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={hasFormError(formik, "password")}
          />
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Efetuar Login
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </form>
      </LoadingHolder>
    </main>
  );
}
