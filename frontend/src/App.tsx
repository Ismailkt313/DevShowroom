import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import DashboardPage from './pages/DashboardPage';
import PublicProfilePage from './pages/PublicProfilePage';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/auth" element={<AuthForm />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Public Profile Route */}
        <Route path="/profile" element={<PublicProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
