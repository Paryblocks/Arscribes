import { Designer } from '@pdfme/ui'
import { BLANK_PDF } from '@pdfme/generator'
import { useEffect } from 'react'
import styles from "./EditablePdf.module.css"

const EditablePDFViewer = () => {

  useEffect(() => {
    const domContainer = document.getElementById('editor')

    const template = {
      "schemas": [],
      "basePdf": BLANK_PDF
    }

    const designer = new Designer({ domContainer, template })
  }, [])

  return (
    <div id='editor' className={styles.ajeitar}></div>
  )
}

export default EditablePDFViewer
