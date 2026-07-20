import { useState } from 'react'
import NasaImage from './components/NasaImage'
import ImageList from './components/ImageList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import PrivateRoute from "./components/PrivateRoute";
import Weather from "./components/Weather"


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <NasaImage />
          </PrivateRoute>
          } />
        <Route path="/images" element={
          <PrivateRoute>
            <ImageList />
          </PrivateRoute>
          } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
