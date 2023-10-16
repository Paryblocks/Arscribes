import styles from './CriarFicha.module.css'
import { PDFDocument, rgb } from 'pdf-lib'
import EditablePDF from '../../components/EditablePdf'
import { useEffect, useState } from 'react'

const CreatePdf = () => {

    const [ pdf, setPdf ] = useState([])

    const createBlankPDF = async () => {
        const pdfDoc = await PDFDocument.create()
        const page = pdfDoc.addPage([600, 400])
        const { width, height } = page.getSize()
        const helveticaFont = await pdfDoc.embedFont('Helvetica')

        const fontSize = 30
        const text = 'Comece a editar sua ficha agora!'
        const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize)
        const textX = (width - textWidth) / 2
        const textY = height - 100

        page.drawText(text, {
            x: textX,
            y: textY,
            size: fontSize,
            font: helveticaFont,
            color: rgb(0, 0, 0)
        })

        const pdfBytes = await pdfDoc.save()
        
        return pdfBytes
    }

    useEffect(() => {
        createBlankPDF().then((pdfBytes) => setPdf(pdfBytes))
        console.log(pdf)
      }, [])

  return (
    <div className={styles.container}>
        <EditablePDF pdfData={pdf}></EditablePDF>
    </div>
  )
}

export default CreatePdf