import styles from './Editar.module.css'
import userImage from "../../images/Placeholder.png"
import { NavLink } from 'react-router-dom'

const Editar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Editar Perfil</h1>
            <form>
                <h3>Nome:</h3>
                <input className={styles.input} type="text" name="nome" placeholder='Nome do Usuário'/>
                <h3>Sistemas Favoritos:</h3>
                <input className={styles.input} type="text" name="sistemas" placeholder='Dungeons & Dragons, Call of Cthulhum, etc..'/>
                <h3>Foto de Perfil:</h3>
                <img className={styles.image_cropper} src={userImage} alt="Perfil"/>
                <h2>Sobre:</h2>
                <textarea className={styles.bio}></textarea>
                <br></br>
                <br></br>
                <br></br>
                <NavLink to="/profile/edit"><button>Confirmar</button></NavLink>
            </form>                  
        </div>
    </div>
  )
}

export default Editar