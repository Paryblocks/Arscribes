import './Form.css'

const Login = () => {
  return (
    <div className='container'>
        <h2 className='title'>Log In</h2>
        <hr></hr>
        <form>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder='Email da Conta'/>
            </div>
            <div>
                <label htmlFor="senha">Senha:</label>
                <input type="password" name="senha" placeholder='********'/>
            </div>
            <div className="alinhar">
              <p className="text">Esqueceu sua senha?</p>
              <input className="button1" type='submit' value='Entrar'/>
            </div>
        </form>
        <hr></hr>
        <div className="alinhar">
          <h3 className='title text'>Não tem uma conta?</h3>
          <button className="button2">Cadastrar</button>
        </div>
    </div>
  )
}

export default Login