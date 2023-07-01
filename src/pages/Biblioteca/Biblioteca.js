import styles from './Biblioteca.module.css'
import { useState, useEffect, useRef } from 'react'
import { Document, Page } from 'react-pdf'
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase'

const Biblioteca = () => {
  const [fichas, setFichas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const galleryRef = useRef(null)
  const fichasPerPage = 5;

  const { getSheets } = useRetrieveDatabase()

  useEffect(() => {
    const fetchFichas = async () => {
      const listaFichas = await getSheets();
      setFichas(listaFichas || []);
    };

    fetchFichas();
  }, []);

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
    galleryRef.current.scrollTo(0, 0);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
    galleryRef.current.scrollTo(0, 0);
  };

  const startIndex = currentPage * fichasPerPage;
  const endIndex = startIndex + fichasPerPage;
  const currentFichas = fichas?.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Biblioteca</h1>
            <div ref={galleryRef}>
              {currentFichas.map((ficha) => (
                <div key={ficha.id} className={styles.fichaItem}>
                <Document
                  file={ficha.sheetURL}
                  options={{ workerSrc: '/pdf.worker.min.js' }} 
                  onLoadSuccess={pdf => console.log(`Loaded a PDF of ${pdf.numPages} pages`)}
                  className={styles.pdfPreview}
                >
                  <Page pageNumber={1} width={200} />
                </Document>
                <span>{ficha.nome}</span>
              </div>
              ))}
            </div>
            <div>
              <button onClick={goToPreviousPage} disabled={currentPage === 0}>
                Anterior
              </button>
              <button onClick={goToNextPage} disabled={endIndex >= fichas?.length || 0}>
                Próxima
              </button>
            </div>
        </div>
    </div>
  )
}

export default Biblioteca