import styles from './Modal.module.css'; 

const ModalDelete = ({ isOpen, onClose, onDelete}) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Tem certeza que deseja excluir esse item?</h2>
          <div className={styles.space}>
            <button onClick={onDelete}>Sim</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  )
}

export default ModalDelete;