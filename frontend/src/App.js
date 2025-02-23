import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Sample/Home/Home';
import { useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import AdminLogin from './AdminPages/AdminLogin';
import AdminDashboard from './AdminPages/AdminDashboard';
import CategoryPage from './components/CategoryPage/CategoryPage';

function App() {

// commit5

const [searchQuery, setSearchQuery] = useState("");


  return (
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />

          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard/>} />

          <Route path="category/:id" element={<CategoryPage/>} />

        </Route>

      </Routes>
  );
}

export default App;
