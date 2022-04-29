import {useState,useEffect} from "react"
import NotesServices from "../services/notes"
import LoginService from "../services/login"

const useUser = () => {
  const [user, setUser] = useState(null)

useEffect(() => { 
  const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
  if (loggedUserJSON) { 
    const user = JSON.parse(loggedUserJSON) 
    setUser(user) 
    NotesServices.setToken(user.token) 
  }
}, [])


const logout=()=>{
  setUser(null)
    NotesServices.setToken(null) 
    window.localStorage.removeItem('loggedNoteAppUser') 
}


const login=async({username,password})=>{
  const user = await LoginService.login({ username, password })
      console.log(user) 
     
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
     
      NotesServices.setToken(user.token)
      setUser(user)
}
return{
  user,
  logout,
  login
}


};

export default useUser;
