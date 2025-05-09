import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const AdminLayout = () => {
  const { user } = useAuth();
  const adminName = user?.name || 'Admin';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        userType="admin"
        userName={adminName}
      />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLayout; 