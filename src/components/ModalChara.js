import React from 'react';
import styles from './Modal.module.css'; 

const ModalChara = ({ isOpen, onClose, check, template, pdf }) => {

    const handleSave = async () => {
      if(check){
        console.log('custom')
      } else {
        console.log('normal')
      }
    }    

    return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {check ? (
            <p>Custom</p>
          ) : (
            <div className={styles.frame}>
                <iframe src={pdf} id='save'></iframe>    
            </div>
          )}
          <div className={styles.space}>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={onClose}>Fechar</button>
          </div>  
        </div>
      </div>
    )
  )
}

export default ModalChara;
