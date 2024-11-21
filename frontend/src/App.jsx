import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from "./components/ErrorBoundary";
import { UserProvider } from "./context/UserContext";

import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div id='root'>
          <ErrorBoundary>
            <Header/>
          </ErrorBoundary>
          

          <main>

          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/register' element={<RegisterForm/>} />
            <Route path='/login' element={<LoginForm/>} />
            <Route path='/dashboard' element={<ProtectedRoute> <UserDashboard/> </ProtectedRoute>} />
          </Routes>

          </main>
          
          <Footer/>
        </div>
        
      </Router>
    </UserProvider>
  );
}

export default App;
