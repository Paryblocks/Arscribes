import React, { useState } from 'react';
import styles from "./Collection.module.css"
import Modal from "../../components/Modal";

const Collection = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fichas, setFichas] = useState([]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Coleção</h1>
        </div>
        <div className={styles.box}>
          <button className={styles.big} onClick={handleOpenModal}>Criar nova coleção</button>
          <Modal isOpen={modalIsOpen} onClose={handleCloseModal} fichas={fichas} />
        </div>
        <div className={styles.box}>
          
        </div>
    </div>
  )
}

export default Collection