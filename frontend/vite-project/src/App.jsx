
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Login } from './components/auth/login'
import { Register } from './components/auth/register';
import { Home } from './components/home';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>

<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/' element={<Home/>}/>


    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
