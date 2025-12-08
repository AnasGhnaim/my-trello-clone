import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { JSX } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.auth.user);

  if (!user) return <Navigate to="/" replace />;

  return children;
}
