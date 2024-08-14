import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import CreateEvent from './Events/Create';
import UpdateEvent from './Events/Update';
import DeleteEvent from './Events/Delete';
import ReadEvent from './Events/Read';
import ViewEvent from './Events/View';

import CreateAssociation from './Association/Create';
import ReadAssociation from './Association/Read';


import Home from './Pages/Home';
import Log from './Pages/Log';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Event/Create" element={<CreateEvent />} />
        <Route path="/Event/Update" element={<UpdateEvent />} />
        <Route path="/Event/Delete" element={<DeleteEvent />} />
        <Route path="/Event/Read" element={<ReadEvent />} />
        <Route path="/Event/View" element={<ViewEvent />} />

        <Route path="/Association/Create" element={<CreateAssociation />} />
        <Route path="/Association/Read" element={<ReadAssociation />} />

        <Route path="/Log" element={<Log />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
