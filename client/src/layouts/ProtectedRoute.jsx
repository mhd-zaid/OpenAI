import { useNavigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const navigate = useNavigate();

  // CHECK AUTH
  if (!false) {
    navigate('/login');
    return;
  }
  return (
    <>
      <Outlet />
    </>
  );
};
