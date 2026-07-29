import Landing from './landing-page'
import { Login, Signup } from './Auth'
import Dashboard from './Dashboard/Dashboard'
import DashboardLayout from './Dashboard/DashboardLayout'
import TypedecoursesForm from './Dashboard/TypedecoursesForm'
import ListDetail from './Dashboard/ListDetail'
import MentionsLegales from './legal/MentionsLegales'
import Confidentialite from './legal/Confidentialite'
import Contact from './legal/Contact'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Analytics} from '@vercel/analytics/react'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-type-course" element={<TypedecoursesForm />} />
          <Route path="listes/:id" element={<ListDetail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        theme="colored" 
      />

      <Analytics/>
    </BrowserRouter>
  )
}

export default App
