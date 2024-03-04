import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';

const NavbarWrapper = () => {
  const location = useLocation();
  // Verifica se a rota atual começa com '/admin', se sim, não renderiza a Navbar
  const showNavbar = !location.pathname.startsWith('/admin');

  return showNavbar ? <Navbar /> : null;
};

export default NavbarWrapper;