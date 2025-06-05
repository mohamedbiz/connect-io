
// This page is deprecated - use /auth instead
import { Navigate } from 'react-router-dom';

export default function SignupPage() {
  return <Navigate to="/auth?register=true" replace />;
}
