import { useState, useEffect, useRef } from 'react'
import { useRetrieveDatabase } from '../hooks/useRetrieveDatabase'
import { NavLink } from "react-router-dom"

import styles from './GaleriaFichas.module.css'

const GaleriaFichas = ({fichas}) => { 
    const [pdfs, setPdfs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)
    const { getSheets } = useRetrieveDatabase()

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
                  <NavLink to={`/library/sheet?id=${pdf.id}`} key={pdf.id}>
                    <div key={pdf.id} className={styles.pdf}>
                        <span>{pdf.nome}</span>
                       
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
                    <p>Nenhuma ficha encontrada, tente recarregar a página!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaFichas