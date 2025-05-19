import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Footer from './Footer';

const StudentLayout = () => {
  const { user } = useAuth();
  const studentName = user?.name || 'Student';

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      
      <div className="flex-1 md:pl-64">
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default StudentLayout; 