import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/BaseLayout';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; 
import TopicsPage from './pages/TopicsPage'; 
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<TopicsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
