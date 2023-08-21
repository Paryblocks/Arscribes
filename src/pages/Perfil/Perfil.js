import styles from './Perfil.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase'
import { useEffect } from 'react'
import { format } from 'date-fns'

const Perfil = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');

  const { auth } = useAuthentication() 
  const { retrieveUser, user } = useRetrieveDatabase()

  useEffect(() => {
    retrieveUser(userId)
  }, [])
  
  if(!user) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>{user.displayName}</h1>
            <h2>Sobre:</h2>
            <div className={styles.imageBox}>
              <div className={styles.bio}>{user.bio && (user.bio)}</div>
              <div className={styles.imageBox2}>
                <img className={styles.image_cropper} src={user.photoURL} alt="Perfil"/>
                {userId === auth.currentUser.uid ? <NavLink to="/profile/edit"><button className={styles.button}>Atualizar dados</button></NavLink> :  ''}
              </div>
            </div>
            <h3>Número de personagens criados: {user.personagensCriados ? user.personagensCriados.length : 0}</h3>  
            <h3>Sistemas Favoritos: {user.sistemas ? (user.sistemas.length > 1 ? user.sistemas.join(', ') : user.sistemas) : 'Não especificado'}</h3>           
            <h3>Data de Registro: {user.registro && format(new Date(user.registro), 'dd/MM/yyyy')}</h3>
            <br></br>
            <h2>Criações de {user.displayName}</h2>                   
        </div>
        <hr></hr>
    </div>
  )
}

export default Perfil