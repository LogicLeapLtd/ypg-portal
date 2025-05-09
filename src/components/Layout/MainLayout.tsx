import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const userName = user?.name || 'User';
  // Default to admin if no role is specified - this should be adjusted based on your authentication logic
  const userType = user?.role === 'student' ? 'student' : 'admin';
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
      <Navbar userType={userType} userName={userName} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout; 