import { useState, useEffect, useRef } from 'react'
import { useSheet } from '../hooks/useSheet'
import ModalDelete from './ModalDelete'
import delicon from '../images/Deletebutton.png'

import styles from './GaleriaFichas.module.css'

const GaleriaChara = ({fichas, pasta}) => { 
    const [pdfs, setPdfs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [infoModal, setInfoModal] = useState("")

    const { deleteChara } = useSheet()
    const galleryRef = useRef(null)

    const handleOpenModal = (info) => {
        setInfoModal(info)
        setModalIsOpen(true)
    }
    
    const handleCloseModal = () => {
        setModalIsOpen(false)
    }

    const handleDelete = async () => {
        const res = await deleteChara(pasta, infoModal)
        window.location.reload();
    }

    useEffect(() => {
        setPdfs(fichas)
    }, [])

    const fichasPerPage = 4
    const startIndex = currentPage * fichasPerPage
    const endIndex = startIndex + fichasPerPage
    const currentPdfs = pdfs.slice(startIndex, endIndex)

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
            {currentPdfs.map((pdf) => (
                    <div className={styles.kok}>
                        <iframe src={pdf} className={styles.viewer}></iframe>
                        <div className={styles.menu}>
                            <a href={pdf} download={`${pdf}.pdf`} className={styles.download}>Visualizar</a>
                            <button onClick={() => {handleOpenModal(pdf)}} className={styles.deletar}><img src={delicon} alt='Excluir' className={styles.deletari}/></button>
                            <ModalDelete isOpen={modalIsOpen} onClose={handleCloseModal} onDelete={() => {handleDelete()}}/>
                        </div>
                        <br></br>
                    </div>
            ))}
            </div>
            <div className={styles.buttons}>
                {pdfs.length > 0 ? (
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
                        disabled={endIndex >= pdfs.length || 0}
                    >
                        Próxima
                    </button>
                    </>
                ) : (
                    <p>Nenhum personagem encontrado, tente criar um novo!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaChara