import styles from './CriarFicha.module.css'
import EditablePDF from '../../components/EditablePdf'

const CreatePdf = () => {
  return (
    <div className={styles.container}>
        <EditablePDF></EditablePDF>
    </div>
  )
}

export default CreatePdf