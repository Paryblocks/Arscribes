import styles from './Biblioteca.module.css'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useRetrieveDatabase } from '../../hooks/useRetrieveDatabase'
import { Document, Page, pdfjs } from 'react-pdf'
import { NavLink } from "react-router-dom"

const FichaAcervo = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const itemId = queryParams.get('id');

  const { getInfo, sheet } = useRetrieveDatabase()

  function handleGetInfo (){
    return getInfo(itemId)
  };

  useEffect(() => {
    handleGetInfo()
  }, [])
  
  if(!sheet) {
    return <div className={styles.load}>
      <p>Carregando...</p>
    </div>
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
        <div className={styles.box2}>
          <h3>Postado por: <NavLink to={`/profile?id=${sheet.Idcriador}`}>{sheet.NomeCriador}</NavLink></h3>
        </div>
        <div className={styles.bottom}>
            <button className={styles.butto}>Adicionar</button>
            <a href={sheet.sheetURL} download={`${sheet.nome}.pdf`} className={styles.download}>Download</a>
            <h3></h3>
        </div>
    </div>
  )
}

export default FichaAcervo