
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Login } from './components/auth/login'
import { Register } from './components/auth/register';
import { Home } from './components/home';
import { NotesHome } from './components/notes/notesHome';
import { Nav } from './components/navBar';
import { NewNote } from './components/notes/newNote';
import { HomePage } from './components/notes/home';
import { EditPage } from './components/notes/editPage';

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>

<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/' element={<HomePage/>}/>
<Route path='/nav' element={<Nav/>}/>
<Route path='/createNewNote' element={<NewNote/>}/> 
<Route path='/editPage' element={<EditPage/>}/> 


    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
