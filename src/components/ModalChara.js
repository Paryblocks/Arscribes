import { useState } from 'react';
import styles from './Modal.module.css'; 
import { Form } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import { useSheet } from '../hooks/useSheet';

const ModalChara = ({ isOpen, onClose, check, temp, pdf, pasta }) => {

  const [carregado, setCarregado] = useState(false)
  const [forma, setForma] = useState({})
  const { saveCharacter } = useSheet()

    const handleSave = async () => {
      if(check){
        const template = temp
        generate({ template, inputs: forma.getInputs() }).then((pdf) => {
          const save = new Blob([pdf.buffer], { type: 'application/pdf' })
          saveCharacter(pasta, save)
          setCarregado(false)
          onClose()
        })
      } else {
        console.log('normal')
      }
    }

    const carregarForm = async () => {
      setCarregado(true)
      const domContainer = document.getElementById('save')
      const template = temp
      const inputs = temp.sampledata
    
      const form = new Form({ domContainer, template, inputs }) 
      setForma(form)
    }

    const handleCLose = async () => {
      setCarregado(false)
      onClose()
    }

    return (
    isOpen && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          {check ? (
            <div className={styles.frame}>
              {!carregado && <button onClick={carregarForm}>Carregar ficha</button>}
              <div id='save'></div>   
            </div>
          ) : (
            <div className={styles.frame}>
                <iframe src={pdf}></iframe>    
            </div>
          )}
          <div className={styles.space}>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={handleCLose}>Fechar</button>
          </div>  
        </div>
      </div>
    )
  )
}

export default ModalChara;
