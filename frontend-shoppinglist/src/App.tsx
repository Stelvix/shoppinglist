import Landing from './landing-page'
import { Login, Signup } from './Auth'
import Dashboard from './Dashboard/Dashboard'
import DashboardLayout from './Dashboard/DashboardLayout'
import TypedecoursesForm from './Dashboard/TypedecoursesForm'
import ListDetail from './Dashboard/ListDetail'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
    </BrowserRouter>
  )
}

export default App
