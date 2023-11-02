import { useState } from 'react';
import styles from './Modal.module.css'; 
import { useAuthentication } from '../hooks/useAuthentication';

const ModalRecover = ({ isOpen, onClose }) => {

    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [enviado, setEnviado] = useState(false)
    const { recoverPassword, error } = useAuthentication()

  const handleRecover = async (e) => {
    e.preventDefault()
    const res = await recoverPassword(email)
    if(error){
        setText(error)
    } else {
        setEnviado(true)
    }
  }

  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Recuperação de senha</h2>
          <form className={styles.form} onSubmit={handleRecover}>
            <label>Digite seu email</label>
            <input type="email" name="email" required placeholder='usuario@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            {!enviado && <button>Confirmar</button>}
            {enviado && <button disabled >Enviado!</button>}
          </form>
          <p>{text}</p>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    )
  )
}

export default ModalRecover