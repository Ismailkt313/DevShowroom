import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import DashboardPage from './pages/DashboardPage';
import PublicProfilePage from './pages/PublicProfilePage';
import LandingPage from './pages/LandingPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicRoute } from './components/auth/AuthGuards';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes - Redirect to dashboard if already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthForm />} />
          </Route>
          
          {/* Protected Routes - Redirect to login if NOT authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          
          {/* Public Profile Route - Accessible to everyone */}
          <Route path="/profile/:id" element={<PublicProfilePage />} />

          {/* 404 Catch-All - Renders for any unmatched route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
