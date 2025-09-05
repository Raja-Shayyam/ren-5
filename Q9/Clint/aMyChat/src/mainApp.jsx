import { useState } from "react"
import { Login } from "../componenets/Login"
import App from "./App"


export const MainApp = () => {
  const [id_name, setid_Name] = useState('')
  return (
    <>
      {id_name ? <App id_name={id_name} /> : <Login user={setid_Name} />}
    </>
  )
}
