import React from 'react';
import styles from './ModalColec.module.css'; 

const Modal = ({ isOpen, onClose, fichas }) => {
  return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Suas Fichas</h2>
          {fichas.length > 0 ? (
            <ul>
              {fichas.map((ficha) => (
                <li key={ficha.id}>{ficha.nome}</li>
              ))}
            </ul>
          ) : (
            <p>Você ainda não tem nenhuma ficha. Adicione uma da biblioteca ou crie uma agora!</p>
          )}
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    )
  );
};

export default Modal;
