import { useEffect, useState } from 'react'
import { Form } from '@pdfme/ui'
import { useSheet } from '../../hooks/useSheet'

const CreateCharacter = (data) => {

    const { getContents, folder } = useSheet()

    useEffect(() => {
        const fetchFold = async () => {
            const listaPastas = await getContents(data)
        }

        fetchFold()

        const domContainer = document.getElementById('ficha')
    
        const template = data.template
        const input = template.sampledata ?? []
    
        const forma = new Form({ domContainer, template, inputs })
      }, [])

  return (
    <div>
        <div id='ficha'></div>
    </div>
  )
}

export default CreateCharacter