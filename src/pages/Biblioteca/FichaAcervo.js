import styles from './Biblioteca.module.css'
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase'

const FichaAcervo = () => {
  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h2>Descrição:</h2>
            <h2>Nome da ficha</h2>
        </div>
        <div className={styles.box}>
            <div className={styles.bio}>Descrição da ficha</div>
            <div>Imagem da ficha</div>
        </div>
        <div className={styles.box}>
            <button>Adicionar</button>
            <button>Download</button>
            <h3></h3>
        </div>
    </div>
  )
}

export default FichaAcervo