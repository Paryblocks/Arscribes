import styles from './Perfil.module.css'
import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'

const Perfil = () => {
  const { auth } = useAuthentication() 
  
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>{auth.currentUser.displayName}</h1>
            <h2>Sobre:</h2>
            <div className={styles.bio}></div>
            <img className={styles.image_cropper} src={auth.currentUser.photoURL} alt="Perfil"/>
            <NavLink to="/profile/edit"><button className={styles.button}>Atualizar dados</button></NavLink>
            <br></br>
            <h3>Número de personagens criados: xxx</h3>  
            <h3>Sistemas Favoritos: xxx</h3>           
            <h3>Data de Registro: xxx</h3>
            <br></br>
            <h2>Criações de Nome do Usuário</h2>                   
        </div>
        <hr></hr>
    </div>
  )
}

export default Perfil