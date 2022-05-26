import { Fragment } from "react";
import { srid } from "../utils";

export default function SysInput({
  error = false,
  className = "",
  divClassName = "",
  labelClassName = "",
  label,
  id = null,
  type = "text",
  options = null,
  placeholder = null,
  children,
  ...props
}) {
  if (!id) {
    id = `input-${srid()}`;
  }

  const inputEl = !options ? (
    <input
      id={id}
      type={type}
      className={`form-control ${!!error ? "is-invalid" : ""} ${className}`}
      placeholder={placeholder}
      {...props}
    />
  ) : (
    <select id={id} className={`form-select ${!!error ? "is-invalid" : ""} ${className}`} {...props}>
      {!!placeholder ? <option>{placeholder}</option> : null}
      {options.map(option => (
        <option key={option.key || option.id || option.value} value={option.id || option.value}>
          {option.name || option.label}
        </option>
      ))}
    </select>
  );

  const labelEl = !!label ? (
    <label className={`form-label ${labelClassName}`} htmlFor={id}>
      {label}
    </label>
  ) : null;

  const errorEl = !!error ? <div className="invalid-feedback">{error}</div> : null;

  return (
    <div className={`mb-3 ${divClassName}`}>
      {labelEl}
      {inputEl}
      {errorEl}
      {children}
    </div>
  );
}
