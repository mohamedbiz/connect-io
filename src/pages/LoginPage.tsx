
// This page is deprecated - use /auth instead
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
  return <Navigate to="/auth" replace />;
}
