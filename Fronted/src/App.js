import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes' //el note servie es un objeto con las cont de services
import loginService from "./services/login"
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([]) 
  
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  //iniciar sesion con el user
  useEffect(()=>{ // el usefect funciona cuando se renderiza la pagina o se actualiza 
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser")
    if(loggedUserJSON){ //si logged existe entonces que setee de nuevo el usuario
      const user = JSON.parse(loggedUserJSON) //se parsea es decir sin las comillas
      setUser(user) // se setea nuevamente el usuario
      noteService.setToken(user.token) // y mandamos tambien el token del usuario
    }
  },[])
//funcion para deslogear
const handleLogout=()=>{
  setUser(null) // el user sera ahora null
  noteService.setToken(null) // para que el service tenga el token vacio, se le envia al user un null
  window.localStorage.removeItem("loggedNoteAppUser") // remover el item del localsto
}

  const addNote = (noteObject) => {
    //llega la prop que le pasamos desde noteForm
    
  //const {token} = user //se saca el token del objeto user act:ahora este ya tendra el token en el servicio ya que le enviamos desde handlelogin al momento de logear
    noteService
      .create(noteObject) //se envia el objeto nota y el token - ir al services-notes, act:antes se enviaba el token por aca pero ahora el service ya tiene el token
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        // setNewNote('') se mudo al noteForm ya que esta ahi su state
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
  
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  //eliminado ahora usado en el noteForm
  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

//handlesubmit
const handleLogin=async(e)=>{
  e.preventDefault()
  //se pone un try y catch para poner una notificacion si sale un error
  try{
    const user = await loginService.login({username,password})
    console.log(user) // para ver el usuario que recibe
    //guardarlo en el storage
    window.localStorage.setItem("loggedNoteAppUser",JSON.stringify(user)) // el storage no puede recibir objetos pero si estando modo string- puedes verlo en chrome -aplication-localstorage
    //enviar el token del user al servicio es decir cuando estas logeando inmediatamente mandas el token a la funcion de notesService para que lo usen ahi
    noteService.setToken(user.token)
    setUser(user) //seteamos lo que retorna el login
    //limpiar los campos de us y pas
    setUsername("")
    setPassword("")

  }catch(e){
    setErrorMessage("username o password erroneos") // con esto te saldra una notificacion
    //para que se elimine la notificacion se pone un settimeout
    setTimeout(()=>{
      setErrorMessage(null) // despues de 5 seg que setee al seterrormaesage un null para que se elimine la notificacion
    },5000)
  }
}
// formulario para logear
//const renderLoginform=()=>()

//formulario para renderizar las notas
// const renderCreateNoteForm=()=>()  

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
{
  user?<NoteForm handleLogout={handleLogout} addNote={addNote}/>:
  <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/>
}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>      
      <ul>
        {notesToShow.map((note, i) => 
          <Note
            key={i}
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App 

//video sesion
//regresando de crear el service en login-crear un state de user donde se almacenara lo que reciba despues de llamar al login
// al login enviarle como param un objeto donde tenga el username y el password,recordar si el name y el valor tiene el mismo nombre en un obj,se puede omitir el valor
//poner dentro de un try catch y agregarle una notificacion cuando sea catch - probar poniendo un usuario que exista,para eso ir al backend para ver con que username y password has  logeado en login_user_rest
//si es correcto te estaria enviando en user el objeto con el token
// al logear correctamente se supone que ahi recien debe aparecer el formulario de postear notas pero esta activo antes de logear
//es mala prac. pero entonces se crea dos constantes donde retornara cada uno sus formularios,en verdad se crea un componente para cada uno
//hacer un ternario si user existe se muestra para crear notas si no el de logear
//en la const addnote donde se añaden las notas  eliminar el data y el id porque de eso se encarga el backe-ir ahi para enviar el token

//para no estar enviando el token traer la const de services note donde se enviara el token-ir a la handlelogin y traer el de service-luego ir al servicenota

// ahora guardar el user en el storage ir a handlelogin 
//despues de guardar el user,crear otro usefect para hacer un get al localstorage donde ahi se actualizara el token y el usuario
//crear tambien una funcion donde se deslogea-handlelogout-este se ejecutara en un boton dentro de rendernoteform-investigar some site cookie-acaba el video

//video prop children
//crear un componente para cada formulario-primero crear loginform -pasar ahi donde haces login-tambien pasar algunas props que se requieren ahi-en el loginform se puede recibir en props(recordar que el props es un objeto con todas las props que le he pasado)-ir a loginform

// para el segundo formulario crear un arch.Noteform,pasar ahi lo que esta dentro de la funcion rendercreate.. traer el noteform y pasarle las props que necesita
// hay algunos usestate que deben estar aqui ya que lo esta usando dos componentes o mas pero el setnewnote solo lo usa el noteform-pasar el usestate ahi,tambien eliminar la funcion handlenotechage ya que lo podemos usar tambien en el noteform
//en la funcion addnote,nos da error en el newnote y el setnewNote por que estan en el noteform-ir ahi