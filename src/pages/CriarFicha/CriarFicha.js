import styles from './CriarFicha.module.css'
import { NavLink } from 'react-router-dom'

const CriarFicha = () => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
          <NavLink className={styles.option} to={'/create/new'}>
            <h2>Criar modelo do zero</h2>
            <hr></hr>
            <p>Crie e edite campos do seu jeito</p>
          </NavLink>
          <NavLink className={styles.option} to={'/create/import'}>
            <h2>Importar ficha PDF pronta</h2>
            <hr></hr>
            <p>Importe uma ficha de PDF editavel já pronta</p>
          </NavLink>
        </div>
    </div>
  )
}

export default CriarFicha