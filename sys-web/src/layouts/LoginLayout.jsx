import { Outlet } from "react-router-dom";

import "./LoginLayout.css";

export default function LoginLayout({ className = "", ...props }) {
  return (
    <div className={`login-layout ${className}`.trim()} {...props}>
      <Outlet />
    </div>
  );
}
