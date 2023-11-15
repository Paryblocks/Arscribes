import { useState, useEffect, useRef } from 'react'
import { useSheet } from '../hooks/useSheet'
import { NavLink } from "react-router-dom"
import ModalDelete from './ModalDelete'
import icon from '../images/FolderIcon.png'
import delicon from '../images/Deletebutton.png'

import styles from './GaleriaFichas.module.css'

const GaleriaColec = () => { 
    const [folds, setFolds] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [infoModal, setInfoModal] = useState("")

    const { getFolders, deleteFolder } = useSheet()
    const galleryRef = useRef(null)

    const handleOpenModal = (info) => {
        setInfoModal(info)
        setModalIsOpen(true)
    }
    
    const handleCloseModal = () => {
        setModalIsOpen(false)
    }

    const handleDelete = async () => {
        const res = await deleteFolder(infoModal)
        window.location.reload();
    }

    useEffect(() => {
        const fetchFold = async () => {
            const listaPastas = await getFolders()
            setFolds(listaPastas || [])
        }

        fetchFold()
    }, [])

    const foldersPerPage = 4
    const startIndex = currentPage * foldersPerPage
    const endIndex = startIndex + foldersPerPage
    const currentFolder = folds.slice(startIndex, endIndex)

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
        galleryRef.current.scrollTo(0, 0)
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
        galleryRef.current.scrollTo(0, 0)
    };

    return (
        <div>
            <div ref={galleryRef} className={styles.container}>
            {currentFolder.map((fold) => (
                <div className={styles.teste}>
                  <NavLink to={`/collection/folder?id=${fold.id}`} key={fold.id}>
                    <div key={fold.id} className={styles.folder}>
                        <span>{fold.nome}</span>
                        <img src={icon} alt="Icone da pasta" className={styles.imager}/>
                    </div>
                  </NavLink>
                  <button onClick={() => {handleOpenModal(fold)}} className={styles.deletar}><img src={delicon} alt='Excluir' className={styles.deletari}/></button>
                  <ModalDelete isOpen={modalIsOpen} onClose={handleCloseModal} onDelete={() => {handleDelete()}}/>
                </div>
            ))}
            </div>
            <div className={styles.buttons}>
                {folds.length > 0 ? (
                    <>
                    <button
                        className={styles.butto}
                        onClick={goToPreviousPage}
                        disabled={currentPage === 0}
                    >
                        Anterior
                    </button>
                    <button
                        className={styles.butto}
                        onClick={goToNextPage}
                        disabled={endIndex >= folds.length || 0}
                    >
                        Próxima
                    </button>
                    </>
                ) : (
                    <p>Nenhuma pasta encontrada, crie uma nova ou tente recarregar a página!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaColec