import React, { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Nav from './components/Nav/Nav';

const Layout = ({searchQuery, setSearchQuery}) => {

  return (

    <div className="App">

      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <Outlet/>


    </div>

  )
}

export default Layout
