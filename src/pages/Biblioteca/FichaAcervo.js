import styles from './Biblioteca.module.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase'
import { Document, Page, pdfjs } from 'react-pdf'

const FichaAcervo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get('id');

  const { getInfo, sheet } = useRetrieveDatabase()

  useEffect(() => {
    getInfo(itemId)
  }, [])
  
  if(!sheet) {
    return <p>Carregando...</p>
  }

  return (
    <div className={styles.container}>
        <div className={styles.box2}>
            <h2>Descrição:</h2>
            <h2>{sheet.nome}</h2>
        </div>
        <div className={styles.box3}>
          <div className={styles.desc}>{sheet.descricao}</div>
          <div className={styles.pdf}>
            <Document file={sheet.sheetURL}>
              <Page pageNumber={1} width={800}/>
            </Document>
          </div>
        </div>
        <div className={styles.bottom}>
            <button className={styles.butto}>Adicionar</button>
            <button className={styles.butto}>Download</button>
            <h3></h3>
        </div>
    </div>
  )
}

export default FichaAcervo