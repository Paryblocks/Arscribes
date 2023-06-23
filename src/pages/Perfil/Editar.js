import styles from './Editar.module.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Editar = () => {
  const [nome, setName] = useState("")
  const [sistemas, setSistemas] = useState([])
  const [foto, setFoto] = useState("")
  const [bio, setBio] = useState("") 
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { editUser, error: authError, loading, auth } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const updatedUser = {
      nome: nome,
      sistemas: sistemas.split(","),
      foto: foto,
      bio: bio,
    }

    await editUser(updatedUser)
    navigate('/profile')
  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.container}>
        <div className={styles.box}>
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nome:</h3>
                <input className={styles.input} type="text" name="nome" required placeholder='Nome do Usuário' onChange={(e) => setName(e.target.value)} value={auth.currentUser.displayName}/>
                <h3>Sistemas Favoritos:</h3>
                <input className={styles.input} type="text" name="sistemas" placeholder='Insira os nomes separado por vírgula' onChange={(e) => setSistemas(e.target.value)} value={sistemas}/>
                <h3>Foto de Perfil:</h3>
                <p>Certifique-se de escolher um arquivo de imagem válido!</p>
                <input type="file" name="foto" onChange={(e) => setFoto(e.target.value)} value={foto}/>
                <h2>Sobre:</h2>
                <textarea className={styles.bio} required placeholder='Um pouco sobre você..' onChange={(e) => setBio(e.target.value)} value={bio}></textarea>
                <br></br>
                <br></br>
                <br></br>
                {!loading && <button>Confirmar</button>}
                {loading && <button disabled>Aguarde...</button>}
                {error && <p>{error}</p>}
            </form>                  
        </div>
    </div>
  )
}

export default Editar