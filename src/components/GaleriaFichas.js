import { useState, useEffect, useRef } from 'react'
import { useRetrieveDatabase } from '../hooks/useRetrieveDatabase'
import { useSheet } from '../hooks/useSheet'
import { NavLink } from "react-router-dom"
import ModalDelete from './ModalDelete'
import delicon from '../images/Deletebutton.png'

import styles from './GaleriaFichas.module.css'

const GaleriaFichas = ({fichas, confirm}) => { 
    const [pdfs, setPdfs] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)

    const { getSheets } = useRetrieveDatabase()
    const { deleteSheet } = useSheet()

    const handleOpenModal = () => {
        setModalIsOpen(true)
    }
    
      const handleCloseModal = () => {
        setModalIsOpen(false)
    }

    const handleDelete = async (data) => {
        const res = await deleteSheet(data)
        window.location.reload();
    }

    useEffect(() => {
        const fetchPdfs = async () => {
            if (fichas) {
                setPdfs(fichas)
              } else {
                const listaFichas = await getSheets()
                setPdfs(listaFichas || [fichas])
              }
        }

        fetchPdfs()
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
                <div key={pdf.id} className={styles.pdf}>
                  <NavLink to={`/library/sheet?id=${pdf.id}`} key={pdf.id}>
                    <span>{pdf.nome}</span>
                    <iframe src={pdf.sheetURL} className={styles.viewer}></iframe>    
                  </NavLink>
                  {confirm ? <div className={styles.ajustar}><button onClick={() => {handleOpenModal()}} className={styles.deletar}><img src={delicon} alt='Excluir' className={styles.deletari}/></button></div> : ''}
                  <ModalDelete isOpen={modalIsOpen} onClose={handleCloseModal} onDelete={() => {handleDelete(pdf)}}/>
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
                    <p>Nenhuma ficha encontrada, tente recarregar a página!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaFichas