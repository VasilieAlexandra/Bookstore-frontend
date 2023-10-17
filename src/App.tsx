import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ExploreBooks } from './layouts/HomePage/ExploreBooks';
import { CustomNavbar } from './layouts/NavbarAndFooter/CustomNavbar';
import { Signup } from './layouts/Auth/Signup';
import { Login } from './layouts/Auth/Login';
import { ForgotPassword } from './layouts/Auth/ForgotPassword';
import { UserAccount } from './layouts/Account/UserAccount';
import { Cart } from './layouts/ShoppingCart/Cart';
import { ManageBooks } from './layouts/ManageBooks/ManageBooks';
import { Orders } from './layouts/Orders/Orders';
import { RequireAuth } from './layouts/Auth/RequireAuth';
import { AddBook } from './layouts/ManageBooks/AddBook';
import { EditBook } from './layouts/ManageBooks/EditBook';
import { FilteredBooks } from './layouts/SearchBooks/FilteredBooks';
import { CategoryBooks } from './layouts/SearchBooks/CategoryBooks';
import { FilterMenu } from './layouts/SearchBooks/FiltersMenu';


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
          )} />
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


        <Route path="/books/search/:sequence" element={<FilteredBooks />} />
        <Route path="/books/search/" element={<FilteredBooks />} />
        <Route path="/books/category/:id" element={<CategoryBooks />} />
        <Route path="/books/category/" element={<CategoryBooks />} />
        <Route path="/books" element={<FilterMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      {/* <Footer /> */}
    </>
  );
}

export default App;