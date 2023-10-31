import { useState, useEffect, useRef } from 'react'
import { useSheet } from '../hooks/useSheet'
import { NavLink } from "react-router-dom"
import icon from '../images/FolderIcon.png'

import styles from './GaleriaFichas.module.css'

const GaleriaColec = () => { 
    const [folder, setFolder] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const galleryRef = useRef(null)
    const { getFolders, loading } = useSheet()

    useEffect(() => {
        const fetchPdfs = async () => {
            const listaPastas = await getFolders()
            setFolder(listaPastas || [])
        }

        fetchPdfs()
    }, [])

    const foldersPerPage = 4
    const startIndex = currentPage * foldersPerPage
    const endIndex = startIndex + foldersPerPage
    const currentFolder = folder.slice(startIndex, endIndex)

    const goToNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
        galleryRef.current.scrollTo(0, 0)
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
        galleryRef.current.scrollTo(0, 0)
    };

    return (
        <div>
            <div ref={galleryRef} className={styles.container}>
            {currentFolder.map((colec) => (
                  <NavLink to={`/collection/folder?id=${colec.id}`} key={colec.id}>
                    <div key={colec.id} className={styles.pdf}>
                        <span>{colec.nome}</span>
                        <imgs rc={icon} alt="Icone da pasta"/>
                    </div>
                </NavLink>
            ))}
            </div>
            <div className={styles.buttons}>
                {folder.length > 0 ? (
                    <>
                    <button
                        className={styles.butto}
                        onClick={goToPreviousPage}
                        disabled={currentPage === 0}
                    >
                        Anterior
                    </button>
                    <button
                        className={styles.butto}
                        onClick={goToNextPage}
                        disabled={endIndex >= folder.length || 0}
                    >
                        Próxima
                    </button>
                    </>
                ) : (
                    <p>Nenhuma pasta encontrada, crie uma nova ou tente recarregar a página!</p>
                )}
                </div>
        </div>
    )
}

export default GaleriaColec