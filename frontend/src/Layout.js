import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const Layout = () => {

  return (

    <div className="App">

      <Nav />

      <Outlet />

      <Footer />

    </div>

  )
}

export default Layout
