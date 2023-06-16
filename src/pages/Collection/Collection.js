import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Collection.module.css"

const Collection = () => {
    const { logout } = useAuthentication()

  return (
    <div>
        <h1>Coleção</h1>
        <button onClick={logout}>Sair</button>
    </div>
  )
}

export default Collection