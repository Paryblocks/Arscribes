import { useState, useEffect, useRef } from 'react'

import styles from './GaleriaFichas.module.css'

const GaleriaChara = ({fichas}) => { 
    const [pdfs, setPdfs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)

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
                    <div className={styles.pdf}>
                        <iframe src={pdf} className={styles.viewer}></iframe>
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