import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ServiceProvider } from './contexts/ServiceContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ServiceProviderProfile from './pages/ServiceProviderProfile';
import SearchResults from './pages/SearchResults';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import pic from '../public/Untitled_logo_4_free-file.jpg';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ServiceProvider>
          <div className="realtive flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/provider/:id" element={<ServiceProviderProfile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <img src={pic} alt="ServiceMat." width={100} className=' left-[92vw]  rounded-full bottom-6 sticky'/>
            <Footer />
          </div>
        </ServiceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;