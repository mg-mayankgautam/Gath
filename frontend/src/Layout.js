import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const Layout = () => {

  const location = useLocation();

  return (

    <div className="App">

      {!location.pathname.startsWith('/admin/login') &&
        <Nav />
      }
      
      <Outlet />

      {!location.pathname.startsWith('/admin') &&
        <Footer />
      }
    </div>

  )
}

export default Layout
