import { useSheet } from '../../hooks/useSheet'
import styles from './CriarFicha.module.css'
import { useState, useEffect } from 'react'

const Importar = () => {
    const [nome, setNome] = useState("")
    const [sistema, setSistema] = useState("")
    const [descricao, setDescricao] = useState("")
    const [file, setFile] = useState("")

    const { postSheet, loading } = useSheet();

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setFile(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const ficha = {
          nome,
          sistema,
          descricao,
          file
        }
    
        const res = await postSheet(ficha)
    
      }

  return (
    <div className={styles.container}>
        <div className={styles.getInfo}>
            <form onSubmit={handleSubmit}>
                <h2>Preencha os dados do modelo</h2>
                <hr></hr>
                <div className={styles.label}>
                    <label className={styles.tit}>Nome:</label>
                    <input className={styles.input} type="text" name="nome" required placeholder='Nome do Modelo' value={nome} onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div className={styles.label}>
                    <label className={styles.tit}>Sistema:</label>
                    <input className={styles.input} type="text" name="sistema" required placeholder='Nome do Sistema' value={sistema} onChange={(e) => setSistema(e.target.value)}/>
                </div>
                <div className={styles.label}>
                    <label className={styles.tit}>Descrição:</label>
                    <textarea className={styles.inputD} name="descricao" required placeholder='Uma breve descrição do modelo' value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                </div>
                <div className={styles.label}>
                    <label>PDF da Ficha:</label>
                    <input className={styles.inpuF} type="file" name="file" required value={file} onChange={handleFileChange} accept="application/pdf"/>
                </div>
                <div className="alinhar">
                    {!loading && <button>Registrar modelo</button>}
                    {loading && <button disabled>Aguarde...</button>}
                </div>
            </form>
        </div>
    </div>
  )
}

export default Importar