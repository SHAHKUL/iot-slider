
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './compo/Home';
import Register from './compo/Register';
import Login from './compo/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/reg' element={<Register/>}/>
        <Route path='/log' element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
