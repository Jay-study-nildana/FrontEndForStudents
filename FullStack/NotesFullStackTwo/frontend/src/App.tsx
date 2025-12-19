// import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

//Notes related imports

import NotesHQ from './components/Notes/NotesHQ';

//Auth related imports

import LoginPage from './components/Auth/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import UserProfile from './components/Auth/UserProfile';
import Anonymous from './components/Auth/Anonymous';
import Authorized from './components/Auth/Authorized';
import AuthorizedWithAdmin from './components/Auth/AuthorizedWithAdmin';

//Test Roles Related imports

import PublicEndPoint from './components/TestRoles/PublicEndPoint';
import AuthOnlyEndPoint from './components/TestRoles/AuthOnlyEndPoint';
import AdminEndPoint from './components/TestRoles/AdminEndPoint';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <main className="flex-grow-1">
        <Container className="container py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/noteshq" element={<NotesHQ />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/anonymous" element={<Anonymous />} />
            <Route path="/authorized" element={<Authorized />} />
            <Route path="/authorized-admin" element={<AuthorizedWithAdmin />} />
            <Route path="/testroles/public" element={<PublicEndPoint />} />
            <Route path="/testroles/authonly" element={<AuthOnlyEndPoint />} />
            <Route path="/testroles/adminonly" element={<AdminEndPoint />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}