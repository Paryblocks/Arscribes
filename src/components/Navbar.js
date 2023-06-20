import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return <nav className={styles.navbar}>
    <NavLink to="/" className={styles.logo}>
        <span>Arscribes</span>
    </NavLink>
    <ul className={styles.links_list  }>
        <li>
            <NavLink to="/library" className={({isActive}) => (isActive ? styles.active : '')}>Biblioteca</NavLink>
        </li>
        <li>
            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>Junte-se a nós</NavLink>
        </li>
        <li>
            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>Entrar</NavLink>
        </li>
    </ul>
  </nav>
}

export default Navbar