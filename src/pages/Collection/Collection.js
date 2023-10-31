import React, { useState, useEffect } from 'react';
import styles from "./Collection.module.css"
import Modal from "../../components/ModalColec";
import ModalConfirm from '../../components/ModalConfirm'
import { useAuthentication } from '../../hooks/useAuthentication';
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase';
import GaleriaColec from '../../components/GaleriaColec';

const Collection = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [confirmIsOpen, setConfirmIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const { getCollection, colecao } = useRetrieveDatabase()
  const { auth } = useAuthentication()

  const handleOpenModal = () => {
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  const handleChoice = (ficha) => {
    setSelectedOption(ficha)
    setModalIsOpen(false)
    setConfirmIsOpen(true)
  }

  const handleGoBack = () => {
    setConfirmIsOpen(false)
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
          <Modal isOpen={modalIsOpen} onClose={handleCloseModal} fichas={colecao} choice={handleChoice}/>
          <ModalConfirm isOpen={confirmIsOpen} goBack={handleGoBack} selectedOption={selectedOption}/>
        </div>
        <div className={styles.box}>
          <GaleriaColec></GaleriaColec>
        </div>
    </div>
  )
}

export default Collection