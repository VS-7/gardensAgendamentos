
import { Navigate, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin'; // Ajuste o caminho conforme necessário

const PrivateAdminRoute = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <div>Carregando...</div>; // Ou qualquer indicação de carregamento que você preferir
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateAdminRoute;
