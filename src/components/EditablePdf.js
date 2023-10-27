import { Designer} from '@pdfme/ui'
import { BLANK_PDF, generate, checkTemplate } from '@pdfme/generator'
import { useEffect, useState } from 'react'
import styles from "./EditablePdf.module.css"
import ModalSave from './ModalSave'

const EditablePDFViewer = () => {

  const [modelo, setModelo] = useState({})
  const [ficha, setFicha] = useState({})
  const [templ, setTempl] = useState({})
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files[0]
    var reader = new FileReader()
    reader.onload = (e) => {
      const base64Data = e.target.result

      const template = {
        "schemas": [],
        "basePdf": base64Data,
      }
  
      modelo.updateTemplate(template)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    const template = modelo.getTemplate()
    const inputs = template.sampledata ?? []
    setTempl(template)
    generate({ template, inputs }).then((pdf) => {
      const save = new Blob([pdf.buffer], { type: 'application/pdf' })
      setFicha(save)

    })
    setModalIsOpen(true)
  }

  const handleCloseModal = () => {
    setModalIsOpen(false)
  }

  useEffect(() => {
    const domContainer = document.getElementById('editor')

    const template = {
      "schemas": [],
      "basePdf": BLANK_PDF
    }

    const modelor = new Designer({ domContainer, template })
    modelor.onChangeTemplate(function () {modelor.saveTemplate()})
    setModelo(modelor)
  }, [])

  return (
    <div className={styles.ajeitar}>
      <div id='editor'></div>
      <div className={styles.buttonBox}>
          <label className={styles.optionsLabel} htmlFor="actual-btn">Mudar PDF base</label>
          <input type="file" id="actual-btn" onChange={handleChange} accept='application/pdf' hidden/>
          <button className={styles.options} onClick={handleSave}>Salvar modelo</button>
          <ModalSave isOpen={modalIsOpen} onClose={handleCloseModal} file={ficha} templ={templ}/>
        </div>
    </div>
  )
}

export default EditablePDFViewer
