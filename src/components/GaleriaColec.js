import { useState, useEffect, useRef } from 'react'
import { useSheet } from '../hooks/useSheet'
import { NavLink } from "react-router-dom"

import styles from './GaleriaFichas.module.css'

const GaleriaColec = () => { 
    const [folder, setFolder] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)
    const { getFolders } = useSheet()

    useEffect(() => {
        const fetchPdfs = async () => {
            const listaPastas = await getFolders()
            setFolder(listaPastas)
        }

        fetchPdfs()
    }, [])

    const fichasPerPage = 4
    const startIndex = currentPage * fichasPerPage
    const endIndex = startIndex + fichasPerPage
    const currentPdfs = folder.slice(startIndex, endIndex)

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
                  <NavLink to={`/library/sheet?id=${pdf.id}`} key={pdf.id}>
                    <div key={pdf.id} className={styles.pdf}>
                        <span>{pdf.nome}</span>
                        <iframe src={pdf.sheetURL} className={styles.viewer}></iframe>
                    </div>
                </NavLink>
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
                    <p>Nenhuma pasta encontrada, crie uma nova ou tente recarregar a página!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaColec