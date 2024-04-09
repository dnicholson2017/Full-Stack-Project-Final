import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateUser from './pages/CreateUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CreateUser/> }></Route>
      <Route path='/:username' element={<App/>}></Route>
    </Routes>
  </BrowserRouter>
)
