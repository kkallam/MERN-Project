import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CreateUser } from './components/CreateUser';
import { UpdateUser } from './components/UpdateUser';
import { DeleteUser } from './components/DeleteUser';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

reportWebVitals();
