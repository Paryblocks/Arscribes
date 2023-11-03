import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSheet } from '../../hooks/useSheet';
import styles from './Collection.module.css'
import ModalChara from '../../components/ModalChara';
import GaleriaChara from '../../components/GaleriaChara';

const SheetFolder = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get('id');

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isCustom, setIsCustom] = useState(false)
  const { getContents, folder } = useSheet()

  function handleGetInfo(){
    return getContents(itemId)
  }

  const handleOpenModal = () => {
    if (folder.tipo) {
      setIsCustom(true)
      setModalIsOpen(true)
    } else {
      setIsCustom(false)
      setModalIsOpen(true)
    }
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
    
  }

  useEffect(() => {
    handleGetInfo()
  }, [])

  if(!folder) {
    return <div className={styles.load}>
      <p>Carregando...</p>
    </div>
  }

  return (
    <div className={styles.container}>
        <div className={styles.box}>
          <h1>{folder.nome}</h1>
        </div>
        <div className={styles.box}>
          <button className={styles.big} onClick={handleOpenModal}>Adicionar personagem</button>
        </div>
        <div className={styles.sas}>
          <GaleriaChara fichas={folder.personagensPasta}/>
          <ModalChara isOpen={modalIsOpen} onClose={handleCloseModal} check={isCustom} pdf={folder.sheetURL} temp={folder.template} pasta={itemId}/>
        </div>
    </div>
  )
}

export default SheetFolder