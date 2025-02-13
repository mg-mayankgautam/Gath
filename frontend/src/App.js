import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Home from './components/Sample/Home/Home';
import { useState } from 'react';
import HomePage from './components/HomePage/HomePage';

function App() {

// commit5

const [searchQuery, setSearchQuery] = useState("");


  return (
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>} />

          {/* <Route path="ourstory" element={<OurStory />} /> */}

        </Route>

      </Routes>
  );
}

export default App;
