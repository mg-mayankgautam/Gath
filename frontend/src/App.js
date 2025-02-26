import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Sample/Home/Home';
import { useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import AdminLogin from './AdminPages/AdminLogin';
import AdminDashboard from './AdminPages/AdminDashboard';
import CategoryPage from './components/CategoryPage/CategoryPage';
import EmployeeDashboard from './AdminPages/EmployeeDashboard';
import RequireAuth from './components/RequireAuth';
import Dashboard from './AdminPages/Dashboard';
import Pricing from './components/Pricing/Pricing';

function App() {

// commit5

const [searchQuery, setSearchQuery] = useState("");


  return (
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />

          <Route path="admin" element={<AdminLogin />} />

          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard/>} />

          </Route>
          

          <Route path="category/:id" element={<CategoryPage/>} />
          <Route path="pricing" element={<Pricing/>} />

        </Route>

      </Routes>
  );
}

export default App;
