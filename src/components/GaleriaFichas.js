import { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { useRetrieveDatabase } from '../hooks/useRetrieveDatabase'
import { NavLink } from "react-router-dom"

import styles from './GaleriaFichas.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`

const GaleriaFichas = () => { 
    const [pdfs, setPdfs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)
    const { getSheets } = useRetrieveDatabase()

    useEffect(() => {
        const fetchPdfs = async () => {
        const listaFichas = await getSheets()
        setPdfs(listaFichas || [])
        };

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
                        <Document file={pdf.sheetURL}>
                            <Page pageNumber={1} width={200}/>
                        </Document>
                    </div>
                </NavLink>
            ))}
            </div>
            <div className={styles.buttons}>
                <button className={styles.butto} onClick={goToPreviousPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <button className={styles.butto} onClick={goToNextPage} disabled={endIndex >= pdfs.length || 0}>
                    Próxima
                </button>
            </div>
        </div>
    )
}

export default GaleriaFichas