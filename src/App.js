//Styles
import './App.css';

//context
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//Pages
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Home from './pages/Home/Home'

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) =>{
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/cadastro" element={!user ? <Cadastro/> : <Navigate to="/"/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
