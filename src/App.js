//Styles
import './App.css';

//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

//context
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//Pages
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Collection from './pages/Collection/Collection';
import Home from './pages/Home/Home';
import Biblioteca from './pages/Biblioteca/Biblioteca';
import CriarFicha from './pages/CriarFicha/CriarFicha';
import Perfil from './pages/Perfil/Perfil';
import Editar from './pages/Perfil/Editar'
import Importar from './pages/CriarFicha/Importar'
import FichaAcervo from './pages/Biblioteca/FichaAcervo';

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
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/library" element={<Biblioteca/>}/>
            <Route path="/library/sheet" element={<FichaAcervo/>}/>
            <Route path="/collection" element={user ? <Collection/> : <Navigate to="/login"/>}/>
            <Route path="/create" element={user ? <CriarFicha/> : <Navigate to="/login"/>}/>
            <Route path="/create/import" element={user ? <Importar/> : <Navigate to="/login"/>}/>
            <Route path="/profile" element={user ? <Perfil/> : <Navigate to="/login"/>}/>
            <Route path="/profile/edit" element={user ? <Editar/> : <Navigate to="/login"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/collection"/>}/>
            <Route path="/register" element={!user ? <Cadastro/> : <Navigate to="/collection"/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
