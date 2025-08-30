import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { Login } from './components/Login';
import { JobPortal } from './components/JobPortal';
import { EmployerDashboard } from './components/EmployerDashboard';
import { InterviewHub } from './components/InterviewHub';
import { StudyLibrary } from './components/StudyLibrary';
import { Profile } from './components/Profile';
import { Chatbot } from './components/Chatbot';
import { Referrals } from './components/Referrals';
import { Footer } from './components/Footer';

export type UserRole = 'candidate' | 'employer';
export type Page = 'home' | 'jobs' | 'employer' | 'interviews' | 'study' | 'profile' | 'referrals' | 'login';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userRole, setUserRole] = useState<UserRole>('candidate');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      setCurrentPage('login');
    }
  };

  const renderPage = () => {
    if (!isLoggedIn && currentPage !== 'login') {
      return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
    }

    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'jobs':
        return <JobPortal userRole={userRole} />;
      case 'employer':
        return <EmployerDashboard />;
      case 'interviews':
        return <InterviewHub />;
      case 'study':
        return <StudyLibrary />;
      case 'profile':
        return <Profile userRole={userRole} />;
      case 'referrals':
        return <Referrals />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {isLoggedIn && currentPage !== 'login' && (
          <Header 
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            userRole={userRole}
            isLoggedIn={isLoggedIn}
            onLogin={handleLogout}
            onRoleChange={setUserRole}
          />
        )}
        <main className={isLoggedIn && currentPage !== 'login' ? "pt-16" : ""}>
          {renderPage()}
        </main>
        {isLoggedIn && currentPage !== 'login' && (
          <>
            <Footer />
            <Chatbot />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}