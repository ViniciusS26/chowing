import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Login from './Login/Login'
import Register from './Register/Register';
import Tasks from './Tasks/Tasks';
import Header from './Header/Header';

function App() {


  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route  path='/' element={<Login/>}/>
          <Route  path='/register' element={<Register/>}/>
          <Route  path='/tasks' element={<Tasks/>}/>
        </Routes>
          
    </BrowserRouter>
  )
}

export default App
