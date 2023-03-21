import React from 'react';
import ReactDOM from "react-dom/client";
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ExploreBooks } from './layouts/HomePage/ExploreBooks';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { CustomNavbar } from './layouts/NavbarAndFooter/CustomNavbar';
import { Signup } from './layouts/Auth/Signup';
import { Login } from './layouts/Auth/Login';
import { ForgotPassword } from './layouts/Auth/ForgotPassword';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './provider/AuthProvider';
import { UserAccount } from './layouts/Account/UserAccount';
import { Cart } from './layouts/ShoppingCart/Cart';
import { ProSidebarProvider } from "react-pro-sidebar";
import { AccountSidebar } from './layouts/Account/AccountSidebar';
import { ManageBooks } from './layouts/ManageBooks/ManageBooks';
import { Orders } from './layouts/Account/Orders';
import { RequireAuth } from './layouts/Auth/RequireAuth';
import { AddAddress } from './layouts/Address/AddAddress';
import { AddBook } from './layouts/ManageBooks/AddBook';
import { EditBook } from './layouts/ManageBooks/EditBook';


const App = () => {
  
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}
        <CustomNavbar />  
        <Routes>
            <Route path="/" element={<ExploreBooks />} />
            <Route path="/account" 
            element={(
              <RequireAuth>
              <UserAccount />
              </RequireAuth>
            )}/>
            <Route path="/account/orders" element={(
              <RequireAuth>
              <Orders />
              </RequireAuth>
            )} /> 
              <Route path="/account/manageBooks" element={(
              <RequireAuth>
              <ManageBooks />
              </RequireAuth>
            )} />
             <Route path="/account/manageBooks/add" element={(
              <RequireAuth>
              <AddBook />
              </RequireAuth>

            )} />
              <Route path="/account/manageBooks/edit/:id" element={(
                <RequireAuth>
                <EditBook />
                </RequireAuth>
              )} />
            
              <Route path="/cart" element={<Cart />} /> 


              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>

{/*         
          
        <Footer /> */}
    </>
  );
}

export default App;