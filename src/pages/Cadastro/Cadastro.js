import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Cadastro.module.css'
import { useState, useEffect } from 'react'

const Cadastro = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmSenha, setConfirmSenha] = useState("")
  const [error, setError] = useState("")

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const user = {
      nome,
      email,
      senha
    }

    if(senha !== confirmSenha){
      setError("As senhas precisam ser iguais!")
      return
    }

    const res = await createUser(user)

  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Cadastrar</h2>
        <hr></hr>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label>Nome:</label>
                <input className={styles.input} type="text" name="nome" required placeholder='Nome do Usuário' value={nome} onChange={(e) => setNome(e.target.value)}/>
            </div>
            <div>
                <label>Email:</label>
                <input className={styles.input} type="email" name="email" required placeholder='Email do Usuário' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Senha:</label>
                <input className={styles.input} type="password" name="senha" required placeholder='********' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </div>
            <div>
                <label>Confirmar Senha:</label>
                <input className={styles.input} type="password" name="confirmSenha" required placeholder='********' value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)}/>
            </div>
            <div className="alinhar">
              {!loading && <button className={styles.button}>Cadastrar</button>}
              {loading && <button disabled className={styles.button}>Aguarde...</button>}
            </div>
        </form>
        {error && <p>{error}</p>}
    </div>
  )
}

export default Cadastro