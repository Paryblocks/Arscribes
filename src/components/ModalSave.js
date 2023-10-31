import styles from './Modal.module.css'; 
import { useSheet } from '../hooks/useSheet'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const ModalSave = ({ isOpen, onClose, file, templ }) => {

    const [nome, setNome] = useState("")
    const [sistema, setSistema] = useState("")
    const [descricao, setDescricao] = useState("")
    const navigate = useNavigate()

    const { postSheet, loading } = useSheet();

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const ficha = {
          nome,
          sistema,
          descricao,
          file,
          templ,
          type: 'custom'
        }
    
        const res = await postSheet(ficha)
        navigate('/library')
      }

      useEffect(() => {
  
      }, [isOpen])


  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <form onSubmit={handleSubmit}>
                <h2>Preencha os dados do modelo</h2>
                <hr></hr>
                <div className={styles.label}>
                    <label className={styles.tit}>Nome:</label>
                    <input className={styles.input} type="text" name="nome" required placeholder='Nome do Modelo' value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div className={styles.label}>
                    <label className={styles.tit}>Sistema:</label>
                    <input className={styles.input} type="text" name="sistema" required placeholder='Nome do Sistema' value={sistema} onChange={(e) => setSistema(e.target.value)}/>
                </div>
                <div className={styles.label}>
                    <label className={styles.tit}>Descrição:</label>
                    <textarea className={styles.inputD} name="descricao" required placeholder='Uma breve descrição do modelo' value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                </div>
                <div className="alinhar">
                    {!loading && <button>Registrar modelo</button>}
                    {loading && <button disabled>Aguarde...</button>}
                </div>
            </form>
          <button onClick={onClose}>Voltar</button>
        </div>
      </div>
    )
  );
};

export default ModalSave;