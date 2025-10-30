import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OAuthSuccess from './pages/OAuthSuccess';
import GeneratePlaylist from './pages/GeneratePlaylist';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
        <Route path='/reset-password' element={<ResetPassword />}></Route>
        <Route path='/oauth-success' element={<OAuthSuccess />}></Route>
        <Route path='/generate-playlist' element={<GeneratePlaylist />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
