import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Login/Login'
import Register from './Register/Register';
import Tasks from './Tasks/Tasks';
function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route  path='/' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/tasks' element={<Tasks/>}/>
        </Routes>
          
    </BrowserRouter>
  )
}

export default App
