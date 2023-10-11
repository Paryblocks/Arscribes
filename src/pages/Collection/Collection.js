import React, { useState, useEffect } from 'react';
import styles from "./Collection.module.css"
import Modal from "../../components/ModalColec";
import { useAuthentication } from '../../hooks/useAuthentication';
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase';

const Collection = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { getCollection, colecao } = useRetrieveDatabase()
  const { auth } = useAuthentication()

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    getCollection(auth.currentUser.uid)
  }, [])

  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Coleção</h1>
        </div>
        <div className={styles.box}>
          <button className={styles.big} onClick={handleOpenModal}>Criar nova coleção</button>
          <Modal isOpen={modalIsOpen} onClose={handleCloseModal} fichas={colecao} />
        </div>
        <div className={styles.box}>
          
        </div>
    </div>
  )
}

export default Collection