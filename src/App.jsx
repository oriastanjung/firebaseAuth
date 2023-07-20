import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from "./pages/Register"

function App() {

  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
