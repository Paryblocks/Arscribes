import styles from './Biblioteca.module.css'
import GaleriaFichas from '../../components/GaleriaFichas'

const Biblioteca = () => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Biblioteca</h1>
            <br></br>
            <GaleriaFichas></GaleriaFichas>
        </div>
    </div>
  )
}

export default Biblioteca