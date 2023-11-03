import { useState } from 'react';
import styles from './Modal.module.css'; 
import { Form } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import { useSheet } from '../hooks/useSheet';

const ModalChara = ({ isOpen, onClose, check, temp, pdf, pasta }) => {

  const [carregado, setCarregado] = useState(false)
  const [file, setFile] = useState(null)
  const [forma, setForma] = useState({})
  const { saveCharacter } = useSheet()

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
}

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
        saveCharacter(pasta, file)
        onClose()
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
            <div className={styles.frameCustom}>
              {!carregado && <button onClick={carregarForm}>Carregar ficha</button>}
              <div className={styles.teste}>
                <div id='save'></div>   
              </div>
            </div>
          ) : (
            <div className={styles.frameDefault}>
              <h2>Registrar personagem</h2>
              <p>Por enquanto apenas fichas customizadas podem gerar personagens na plataforma!</p>
              <p>Mas você pode postar os personagens gerados por ela aqui!</p>
              <label>PDF do Personagem:</label>
              <input type="file" name="file" required onChange={handleFileChange} accept="application/pdf"/>
              <br></br>
              <a href={pdf} download><button>Baixar template da ficha</button></a>   
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
