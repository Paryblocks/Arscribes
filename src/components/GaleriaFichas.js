import { useState, useEffect, useRef } from 'react'
import { Document, Page } from 'react-pdf'
import { useRetrieveDatabase } from '../hooks/useRetrieveDatabase'

import { styles } from './GaleriaFichas.module.css'

const GaleriaFichas = () => {
    const [pdfs, setPdfs] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const galleryRef = useRef(null)
    const { getSheets } = useRetrieveDatabase()

    useEffect(() => {
        const fetchPdfs = async () => {
        const listaFichas = await getSheets();
        setPdfs(listaFichas || []);
        };

        fetchPdfs();
    }, []);

    const fichasPerPage = 5;
    const startIndex = currentPage * fichasPerPage;
    const endIndex = startIndex + fichasPerPage;
    const currentPdfs = pdfs.slice(startIndex, endIndex);

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        galleryRef.current.scrollTo(0, 0);
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        galleryRef.current.scrollTo(0, 0);
    };

    return (
        <div>
            <div ref={galleryRef}>
            {currentPdfs.map((pdf) => (
                <div key={pdf.id}>
                    <Document file={pdf.sheetURL}>
                        <Page pageNumber={1} />
                    </Document>
                    <span>{pdf.nome}</span>
                </div>
            ))}
            </div>
            <div>
                <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                    Anterior
                </button>
                <button onClick={goToNextPage} disabled={endIndex >= pdfs.length || 0}>
                    Próxima
                </button>
            </div>
        </div>
    )
}

export default GaleriaFichas