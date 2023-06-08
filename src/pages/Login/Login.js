import styles from './Login.module.css'
import { NavLink } from 'react-router-dom'

const Login = () => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Log In</h2>
        <hr></hr>
        <form className={styles.form}>
            <div>
                <label htmlFor="ident">Email:</label>
                <input className={styles.input} type="email" name="email" placeholder='usuario@email.com'/>
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input className={styles.input} type="password" name="senha" placeholder='********'/>
            </div>
            <div className={styles.alinhar}>
              <p className={styles.text}>Esqueceu sua senha?</p>
              <input className={styles.button} type='submit' value='Entrar'/>
            </div>
        </form>
        <hr></hr>
        <div className="alinhar">
          <nav>
            <NavLink to="/cadastro">
              <h3 className={styles.title}>Não tem uma conta?</h3>
            </NavLink>
          </nav>
        </div>
    </div>
  )
}

export default Login