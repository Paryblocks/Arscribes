import styles from './Login.module.css'
import { NavLink } from 'react-router-dom'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useState, useEffect } from 'react'

const Login = () => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const user = {
      email,
      senha
    }

    const res = await login(user)

  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Log In</h2>
        <hr></hr>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div>
                <label>Email:</label>
                <input className={styles.input} type="email" name="email" required placeholder='usuario@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Senha:</label>
                <input className={styles.input} type="password" name="senha" required placeholder='********' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            </div>
            <div className={styles.alinhar}>
              <p className={styles.text}>Esqueceu sua senha?</p>
              {!loading && <button className={styles.button}>Entrar</button>}
              {loading && <button disabled className={styles.button}>Aguarde...</button>}
            </div>
        </form>
        {error && <p>{error}</p>}
        <hr></hr>
        <nav>
          <NavLink to="/register">
            <h3 className={styles.title}>Não tem uma conta?</h3>
          </NavLink>
        </nav>
    </div>
  )
}

export default Login