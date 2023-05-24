import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage } from './pages';
import { Layout } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<MainPage />}></Route>
        </Route>
      </Routes>
    </Router>
    
  </React.StrictMode>,
)
