import React from 'react';
import ReactDOM from "react-dom/client";
import { Route, Routes} from 'react-router-dom';
import './App.css';
import { ExploreBooks } from './layouts/HomePage/ExploreBooks';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { CustomNavbar } from './layouts/NavbarAndFooter/CustomNavbar';
import { Signup } from './layouts/Auth/Signup';
import { Login } from './layouts/Auth/Login';
import { ForgotPassword } from './layouts/Auth/ForgotPassword';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <div className="" >
      <CustomNavbar />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Routes>
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path="/" element={<ExploreBooks />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default App;