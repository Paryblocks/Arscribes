import { useState } from 'react'
import { useSheet } from '../hooks/useSheet'
import styles from './Modal.module.css' 

const Modal = ({ isOpen, selectedOption, goBack}) => {

  const [nome, setNome] = useState("")
  const { postCollection, loading } = useSheet()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ficha = {
      nome,
      sistema: selectedOption.sistema,
      template: selectedOption.template,
      tipo: selectedOption.tipo,
      sheetURL: selectedOption.sheetURL 
    }

    const res = await postCollection(ficha)
    goBack()
    window.location.reload();
  }

  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Confirmar coleção</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.ajeitar}>
                <label>Ficha selecionada: {selectedOption.nome}</label>
                <label>Nome da coleção: </label>
                <input type='text' name="nome" required placeholder='Seu universo?' value={nome} onChange={(e) => setNome(e.target.value)}/>
              </div>
              <div>
                {!loading && <button>Criar coleção</button>}
                {loading && <button disabled>Aguarde...</button>}
              </div>
            </form>
          <button onClick={goBack}>Voltar</button>
        </div>
      </div>
    )
  );
};

export default Modal;