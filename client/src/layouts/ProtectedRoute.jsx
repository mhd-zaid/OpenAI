import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const navigate = useNavigate();

  // CHECK AUTH
  if (!false) {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    return <h1>Redirecting...</h1>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
