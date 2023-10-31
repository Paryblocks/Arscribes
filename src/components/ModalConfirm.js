import { useState } from 'react';
import styles from './Modal.module.css'; 

const Modal = ({ isOpen, selectedOption, goBack }) => {

  const [nome, setNome] = useState("")
  const [id, setId] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ficha = {
      nome,
      id: selectedOption.id 
    }

    const res = await postSheet(ficha)
    navigate('/library')
  }

  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Confirmar coleção</h2>
            <form onSubmit={handleSubmit}>
              <label>Ficha selecionada: {selectedOption.nome}</label>
              <label>Nome da coleção: </label>
              <input type='text' name="nome" required placeholder='Nome do Modelo' value={nome} onChange={(e) => setNome(e.target.value)}/>
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