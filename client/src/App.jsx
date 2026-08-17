import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import CitizenPortal from './pages/CitizenPortal';
import OfficerDashboard from './pages/OfficerDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import DigitalTwinPage from './pages/DigitalTwinPage';
import LoginPage from './pages/LoginPage';
import TrackComplaint from './pages/TrackComplaint';
import ComplaintPage from './pages/ComplaintPage';
import SmsComplaintPage from './pages/SmsComplaintPage';
import CallComplaintPage from './pages/CallComplaintPage';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function LoginGuard({ children }) {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to={user.role === 'officer' || user.role === 'admin' ? '/officer' : '/citizen'} replace />;
  }
  return children;
}

function OfficerRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'officer' && user.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

function CitizenRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'officer' || user.role === 'admin') return <Navigate to="/" replace />;
  return children;
}

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col justify-between">
              <div>
                <Navbar />
                <Routes>
                  <Route path="/login" element={<LoginGuard><LoginPage /></LoginGuard>} />
                  <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
                  <Route path="/citizen" element={<CitizenRoute><CitizenPortal /></CitizenRoute>} />
                  <Route path="/officer" element={<OfficerRoute><OfficerDashboard /></OfficerRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
                  <Route path="/digital-twin" element={<ProtectedRoute><DigitalTwinPage /></ProtectedRoute>} />
                  <Route path="/track" element={<ProtectedRoute><TrackComplaint /></ProtectedRoute>} />
                  <Route path="/complaint/:id" element={<ProtectedRoute><ComplaintPage /></ProtectedRoute>} />
                  <Route path="/sms-complaint" element={<ProtectedRoute><SmsComplaintPage /></ProtectedRoute>} />
                  <Route path="/call-complaint" element={<ProtectedRoute><CallComplaintPage /></ProtectedRoute>} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
