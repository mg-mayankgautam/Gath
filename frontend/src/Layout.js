import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const Layout = () => {

  const location = useLocation();

  // axios.defaults.withCredentials = true
  // const { auth } = useAuth();
  // const { setAuth } = useAuth();
  // const navigate = useNavigate();
  // const location = useLocation();

  // useEffect(() => {

  //   // console.log('auth hai ki nahi',auth)
  //   const checkauthentication = async () => {
  //     try {

  //       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/refresh`,);
  //       // console.log(response)
  //       const token = response.data.accessToken;
  //       // // Split the token and taken the second

  //       const base64Url = token?.split(".")[1];

  //       // // Replace "-" with "+"; "_" with "/"
  //       const base64 = base64Url?.replace("-", "+").replace("_", "/");

  //       const TokenDataWithoutToken = JSON.parse(window?.atob(base64));
  //       console.log('Response:', TokenDataWithoutToken);

  //       const Role = TokenDataWithoutToken.role

  //       const TokenData = { username: TokenDataWithoutToken.username, role: TokenDataWithoutToken.role, RawToken: token }

  //       try {
  //         if (Role) {
  //           console.log(Role, 'brkpnt 2')
  //           setAuth(TokenData);//isme role set nahi ho raha
  //           console.log(Role, 'brkpnt 3')
  //           // console.log(state.prev.pathname)
  //           // Extract the section parameter from the URL
  //           const params = new URLSearchParams(location.search);
  //           const section = params.get('section') || 'section1'; // Default to section1 if no section is provided

  //           // Navigate to the appropriate section
  //           navigate(`/admindashboard?section=${section}`);
  //         }
  //         else {
  //           console.log(Role, 'role not found')
  //         }
  //       } catch (e) {
  //         console.log('e', e);
  //       }

  //     } catch (e) { console.log(e) }
  //   }

  //   if (!auth.role) checkauthentication();
  // }, [])



  return (

    <div className="App">

      {!location.pathname.startsWith('/admin') &&
        <Nav />
      }

      <Outlet />

      {(!location.pathname.startsWith('/admin') && !location.pathname.startsWith('/dashboard')) &&
        <Footer />
      }
    </div>

  )
}

export default Layout
