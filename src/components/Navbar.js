import { NavLink } from "react-router-dom"
import { useAuthentication } from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"
import styles from "./Navbar.module.css"

const Navbar = () => {
    const { user } = useAuthValue();
    const { logout, auth } = useAuthentication()

  return <nav className={styles.navbar}>
    <NavLink to="/" className={styles.logo}>
        <span>Arscribes</span>
    </NavLink>
    <ul className={styles.links_list  }>
        <li>
            <NavLink to="/library" className={({isActive}) => (isActive ? styles.active : '')}>Biblioteca</NavLink>
        </li>
        {!user && (
        <>
        <li>
            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Junte-se a nós</NavLink>
        </li>
        <li>
            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
        </li>
        </>
        )}
        {user &&(
        <>
        <li>
            <NavLink to="/collection" className={({isActive}) => (isActive ? styles.active : '')}>Suas Coleções</NavLink>
        </li>
        <li>
            <NavLink to="/create" className={({isActive}) => (isActive ? styles.active : '')}>Criar Modelo</NavLink>
        </li>
        <li>
            <button className={styles.button} onClick={logout}>Sair</button>
        </li>
        <li>
            <NavLink to="/profile"><img className={styles.image_cropper} src={auth.currentUser.photoURL} alt="Perfil"/></NavLink>
        </li>
        </>
        )}
    </ul>
  </nav>
}

export default Navbar