import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';
import { useState } from 'react';
import Login from './components/Login';
import Dictaphone from './components/Dictaphone';

function App() {
  const [login,setLogin]=useState(false)
  return (
    <div >
      {!login?<><SignUp login={setLogin}></SignUp></>:<Login></Login>}
   {/* <LandingPage></LandingPage> */}
    </div>
  );
}

export default App;
