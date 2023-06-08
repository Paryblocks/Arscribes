import styles from './Cadastro.module.css'

const Cadastro = () => {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Cadastrar</h2>
        <hr></hr>
        <form className={styles.form}>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input className={styles.input} type="text" name="nome" placeholder='nomedeusuario'/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input className={styles.input} type="email" name="email" placeholder='usuario@email.com'/>
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input className={styles.input} type="password" name="senha" placeholder='********'/>
            </div>
            <div>
                <label htmlFor="csenha">Confirmar Senha:</label>
                <input className={styles.input} type="password" name="csenha" placeholder='********'/>
            </div>
            <div className="alinhar">
              <input className={styles.button} type='submit' value='Cadastrar'/>
            </div>
        </form>
    </div>
  )
}

export default Cadastro