import React from 'react';
import { Wallet, TrendingUp, Shield } from 'lucide-react';
import VisionMission from './components/VisionMission';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './contexts/AuthContext';
import SignUp from './components/Auth/SignUp';
import UserDashboard from './components/Dashboard/UserDashboard';

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const AppContent = () => {
    const { user } = useAuth();
    return user ? <UserDashboard /> : <SignUp />;
  };
  
  function App() {
    return (
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 z-10">
            <h1 className="text-3xl md:text-4xl font-light mb-2">SecureFlow</h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Your new favorite <br />
              <span className="text-red-500">Secure transactions</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-lg">
              Store, send, receive, and trade cryptocurrencies with advanced fraud detection powered by machine learning and secured by blockchain technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full flex items-center">
                Sign Up
              </Link>
              <Link to="/login" className="border border-white hover:bg-white/10 text-white px-6 py-3 rounded-full flex items-center transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <VisionMission />

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 SecureFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;