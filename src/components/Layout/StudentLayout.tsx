import { Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';

const StudentLayout = () => {
  const { user } = useAuth();
  const studentName = user?.name || 'Student';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        userType="student"
        userName={studentName}
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

export default StudentLayout; 