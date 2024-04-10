import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateUser from './pages/CreateUser.jsx'
import CreatePost from './pages/CreatePost.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/sign-up' element={<CreateUser/> }></Route>
      <Route path='/:username' element={<CreatePost/> }></Route>
    </Routes>
  </BrowserRouter>
)
