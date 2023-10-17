import styles from './CriarFicha.module.css'
import EditablePDF from '../../components/EditablePdf'

const CreatePdf = () => {
  return (
    <div className={styles.container2}>
        <EditablePDF></EditablePDF>
    </div>
  )
}

export default CreatePdf