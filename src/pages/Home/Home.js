import styles from "./Home.module.css"

const Home = () => {
  return (
    <div className={styles.container}> 
        <div className={styles.box_column}>
          <h1>Bem vindo ao Arscribes</h1>
          <h3 className={styles.aproximar}>Junte-se a comunidade de criadores de RPG</h3>
        </div>
        <div className={styles.box}>
          <h2>O que é o Arscribes?</h2>
          <p>O Arscribes é uma plataforma dedicada a criar, armazenar e compartilhar fichas de RPGs diversos. Sinta-se livre para escolher qualquer fichas e gerar diversos personagens a partir delas, caso nenhuma pegue seu interesse, use nossa ferramenta para postar um novo formato ou até criar sua própria! Nosso objetivo é tornar mais acessivel o acesso aos diferentes tipos de RPGs além de permitir a criação de novos formatos.</p>
          
          <h2>O que há de novo?</h2>
          <p>Finalmente inaugurando a plataforma com a nova ferramenta de criação. Usuários registrados poderão postar modelos personalizados, vindo de uma base ou criando zero! Todas as fichas criadas dessa forma já serão compativeis com a criação de personagens em suas coleções. Então vamos lá criadores, mãos à obra!</p>
        </div>
    </div>
  )
}

export default Home