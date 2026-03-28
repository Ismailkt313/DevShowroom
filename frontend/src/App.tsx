import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import DashboardPage from './pages/DashboardPage';
import PublicProfilePage from './pages/PublicProfilePage';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/auth" element={<AuthForm />} />
          
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Public Profile Route */}
          <Route path="/profile/:id" element={<PublicProfilePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
