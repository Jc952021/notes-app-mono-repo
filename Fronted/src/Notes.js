import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'


import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

import {useNavigate} from "react-router-dom"
import useNotes from './hooks/useNotes'
import useUser from './hooks/useUser'

// import Table from "react-bootstrap/Table"
//mui
import { Table,TableBody,TableContainer, TableRow } from '@mui/material'

const Notes = () => {
  const {notes,addNote,toggleImportance} = useNotes()
  const {user,logout,login}=useUser()

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  

  const navigate = useNavigate();

  // useEffect(() => {
  //   noteService
  //     .getAll()
  //     .then(initialNotes => {
  //       setNotes(initialNotes)
  //     })
  // }, [])


  // iniciar sesion con el user
  // useEffect(() => { // el usefect funciona cuando se renderiza la pagina o se actualiza
  //   const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
  //   if (loggedUserJSON) { // si logged existe entonces que setee de nuevo el usuario
  //     const user = JSON.parse(loggedUserJSON) // se parsea es decir sin las comillas
  //     setUser(user) // se setea nuevamente el usuario
  //     noteService.setToken(user.token) // y mandamos tambien el token del usuario
  //   }
  // }, [])


  // funcion para deslogear
  const handleLogout = () => {
    // setUser(null) // el user sera ahora null
    // noteService.setToken(null) // para que el service tenga el token vacio, se le envia al user un null
    // window.localStorage.removeItem('loggedNoteAppUser') // remover el item del localsto

    logout()
  }


  // const addNote = (noteObject) => {
  //   // llega la prop que le pasamos desde noteForm

  //   // const {token} = user //se saca el token del objeto user act:ahora este ya tendra el token en el servicio ya que le enviamos desde handlelogin al momento de logear
  //   noteService
  //     .create(noteObject) // se envia el objeto nota y el token - ir al services-notes, act:antes se enviaba el token por aca pero ahora el service ya tiene el token
  //     .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //       // setNewNote('') se mudo al noteForm ya que esta ahi su state
  //     })
  // }


  const toggleImportanceOf = (id) => {
    // const note = notes.find(n => n.id === id)
    // const changedNote = { ...note, important: !note.important }

    // noteService
    //   .update(id, changedNote)
    //   .then(returnedNote => {
    //     setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    //   })
toggleImportance(id).catch(() => {
        setErrorMessage(
          `Note was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  // eliminado ahora usado en el noteForm
  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

    
  // handlesubmit
  const handleLogin = async (e) => {
    e.preventDefault()
    // se pone un try y catch para poner una notificacion si sale un error
    try {
      // const user = await loginService.login({ username, password })
      // console.log(user) // para ver el usuario que recibe
      // // guardarlo en el storage
      // window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user)) // el storage no puede recibir objetos pero si estando modo string- puedes verlo en chrome -aplication-localstorage
      // // enviar el token del user al servicio es decir cuando estas logeando inmediatamente mandas el token a la funcion de notesService para que lo usen ahi
      // noteService.setToken(user.token)
      // setUser(user) // seteamos lo que retorna el login

login({username,password})

      // limpiar los campos de us y pas
      setUsername('')
      setPassword('')
      //dirigirnos a la ruta notes
      navigate("/NOTES")
    } catch (e) {
      setErrorMessage('username o password erroneos') // con esto te saldra una notificacion
      // para que se elimine la notificacion se pone un settimeout
      setTimeout(() => {
        setErrorMessage(null) // despues de 5 seg que setee al seterrormaesage un null para que se elimine la notificacion
      }, 5000)
    }
  }
  // formulario para logear
  // const renderLoginform=()=>()

  // formulario para renderizar las notas
  // const renderCreateNoteForm=()=>()

//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       {
//   user
//     ? <NoteForm handleLogout={handleLogout} addNote={addNote} />
//     : <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
// }
//con react-bootsrap
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <Table striped>
//         <tbody>
//         {notesToShow.map((note, i) =>
//         <tr key={i}>
//           <Note
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         </tr>
//         )}
//         </tbody>
//       </Table>
//     </div>
//   )
return (
  <div>
    <h1>Notes</h1>
    <Notification message={errorMessage} />
    {
user
  ? <NoteForm handleLogout={handleLogout} addNote={addNote} />
  : <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
}

    <div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
    <TableContainer>
      <Table>
      <TableBody>
      <TableRow>
      {notesToShow.map((note, i) =>
      <tr key={i}>
        <Note
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
      </tr>
      )}
      </TableRow>
      </TableBody>
      </Table>
    </TableContainer>
  </div>
)
}
export default  Notes

//video prag
//queremos que cuando logeo me rediriga a la ruta de notas

//despues de hacer login usa el usenavigate de react-router-dom
//ir a app

//comentar el useefect donde traes las notas y el user, ejecutar sus hooks
//aca en addnote se usa el setNotes ,pasarlo como funcion al hook usenote
//traerlo aca dentro de un const al addnote
//tambien queremos reutilizar la funcion togle ya que tiene dentro el setNotes,pero tambien tiene el seterror.
//copiar todo lo de dentro pero solo hasta el catch y pegarlo en el useNotes ir ahi

//aca la funcion login y logout usan el setuser,llevarlos algunas partes apra el useUser - acaba el video

//video usefield ir a login form

//react-boo
//importar tabla y ponerlo como contenedor de tus notas-tbody
//al mapear ,cada nota envolverlo en un tr y este tendra el id-ir a note y que sea un div en vez de un li
//darle atributos a la tabla stripe,ir a note y como estamos esta en un tr,este debe mostrar tds ose columnas,ahi poner dos columnas
//ir a loginForm


//video mateui
//hacer lo mismo que el anterior ,comentar y actualizarlo con mui
//el tablerow y tablecell son como el tr y el td - ir a note para cambiar el td a tablecell-regresar a app