import React from 'react'
import { Navbar,Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import NoteDetalles from './components/NoteDetalles'
import useNotes from './hooks/useNotes';
import useUser from './hooks/useUser';

import Notes from './Notes'

// material ui
import Container from "@mui/material/Container"
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';

//styled
import {StyledLink} from "./components/StyledLink"

// import React, { useState, useEffect } from 'react'
// import Note from './components/Note'
// import Notification from './components/Notification'
// import noteService from './services/notes' // el note servie es un objeto con las cont de services
// import loginService from './services/login'
// import LoginForm from './components/LoginForm'
// import NoteForm from './components/NoteForm'

// const App = () => {
//   const [notes, setNotes] = useState([])

//   const [showAll, setShowAll] = useState(true)
//   const [errorMessage, setErrorMessage] = useState(null)

//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     noteService
//       .getAll()
//       .then(initialNotes => {
//         setNotes(initialNotes)
//       })
//   }, [])
//   // iniciar sesion con el user
//   useEffect(() => { // el usefect funciona cuando se renderiza la pagina o se actualiza
//     const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
//     if (loggedUserJSON) { // si logged existe entonces que setee de nuevo el usuario
//       const user = JSON.parse(loggedUserJSON) // se parsea es decir sin las comillas
//       setUser(user) // se setea nuevamente el usuario
//       noteService.setToken(user.token) // y mandamos tambien el token del usuario
//     }
//   }, [])
//   // funcion para deslogear
//   const handleLogout = () => {
//     setUser(null) // el user sera ahora null
//     noteService.setToken(null) // para que el service tenga el token vacio, se le envia al user un null
//     window.localStorage.removeItem('loggedNoteAppUser') // remover el item del localsto
//   }

//   const addNote = (noteObject) => {
//     // llega la prop que le pasamos desde noteForm

//     // const {token} = user //se saca el token del objeto user act:ahora este ya tendra el token en el servicio ya que le enviamos desde handlelogin al momento de logear
//     noteService
//       .create(noteObject) // se envia el objeto nota y el token - ir al services-notes, act:antes se enviaba el token por aca pero ahora el service ya tiene el token
//       .then(returnedNote => {
//         setNotes(notes.concat(returnedNote))
//         // setNewNote('') se mudo al noteForm ya que esta ahi su state
//       })
//   }

//   const toggleImportanceOf = (id) => {
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }

//     noteService
//       .update(id, changedNote)
//       .then(returnedNote => {
//         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//       })
//       .catch(() => {
//         setErrorMessage(
//           `Note '${note.content}' was already removed from server`
//         )
//         setTimeout(() => {
//           setErrorMessage(null)
//         }, 5000)
//       })
//   }

//   // eliminado ahora usado en el noteForm
//   // const handleNoteChange = (event) => {
//   //   setNewNote(event.target.value)
//   // }

//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   // handlesubmit
//   const handleLogin = async (e) => {
//     e.preventDefault()
//     // se pone un try y catch para poner una notificacion si sale un error
//     try {
//       const user = await loginService.login({ username, password })
//       console.log(user) // para ver el usuario que recibe
//       // guardarlo en el storage
//       window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user)) // el storage no puede recibir objetos pero si estando modo string- puedes verlo en chrome -aplication-localstorage
//       // enviar el token del user al servicio es decir cuando estas logeando inmediatamente mandas el token a la funcion de notesService para que lo usen ahi
//       noteService.setToken(user.token)
//       setUser(user) // seteamos lo que retorna el login
//       // limpiar los campos de us y pas
//       setUsername('')
//       setPassword('')
//     } catch (e) {
//       setErrorMessage('username o password erroneos') // con esto te saldra una notificacion
//       // para que se elimine la notificacion se pone un settimeout
//       setTimeout(() => {
//         setErrorMessage(null) // despues de 5 seg que setee al seterrormaesage un null para que se elimine la notificacion
//       }, 5000)
//     }
//   }
//   // formulario para logear
//   // const renderLoginform=()=>()

//   // formulario para renderizar las notas
//   // const renderCreateNoteForm=()=>()

//   return (
//     <div>
//       <h1>Notes</h1>
//       <Notification message={errorMessage} />
//       {
//   user
//     ? <NoteForm handleLogout={handleLogout} addNote={addNote} />
//     : <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
// }

//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all'}
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map((note, i) =>
//           <Note
//             key={i}
//             note={note}
//             toggleImportance={() => toggleImportanceOf(note.id)}
//           />
//         )}
//       </ul>
//     </div>
//   )
// }

// const Home = () => <h1>Home</h1>

// const Notes = () => <h1>Notes</h1>

// const Users = () => <h1>Users</h1>

// const App = () => {
//   const [page, setPage] = useState(() => {
//     const { pathname } = window.location
//     console.log(pathname) // este te trae /turuta pero solo necesitamos la ruta sin el /
//     const page = pathname.slice(1) // desde la posicion1 me trae el string
//     return page
//   })

//   const toPage = (page) => (e) => {
//     e.preventDefault()
//     window.history.pushState(null, '', `/${page}`)
//     setPage(page)
//   }

//   const getContent = () => {
//     if (page === 'home') {
//       return <Home />
//     } else if (page === 'notes') {
//       return <Notes />
//     } else if (page === 'users') {
//       return <Users />
//     }
//   }
//   return (
//     <div>
//       <header>
//         <a href='#' style={{ padding: '1rem', textDecoration: 'none' }} onClick={toPage('home')}>Home</a>
//         <a href='#' style={{ padding: '1rem', textDecoration: 'none' }} onClick={toPage('notes')}>Notes</a>
//         <a href='#' style={{ padding: '1rem', textDecoration: 'none' }} onClick={toPage('users')}>Users</a>
//       </header>
//       {getContent()}
//     </div>
//   )
// }

const App = () => {

const {notas}= useNotes()
const {user} = useUser()


//react-bootstrap
//   return (
//       <div className='container'>
//     <Router>
//       <Navbar bg="light" expand="lg">
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//       <Nav className="me-auto">
//         <Nav.Link>
    //   <Link to='/home' style={{ margin: '2rem' }}>HOME</Link>
    //   </Nav.Link>
    //   <Nav.Link>
    // <Link to='/notas' style={{ margin: '2rem' }}>NOTES</Link>
    //   </Nav.Link>
    //   <Nav.Link>
    // <Link to='/users' style={{ margin: '2rem' }}>USERS</Link>
    //   </Nav.Link>
    //   <Nav.Link>
    // {user? user.name:<Link to='/LOGIN' style={{ padding: '1rem' }} >LOGIN</Link>}
    //   </Nav.Link>
// </Nav>
//         </Navbar.Collapse>
//         </Navbar>
//       <Routes>
//         <Route path='/NOTES/:NoteId' element={<NoteDetalles notas={notas}/>}/>
//         <Route path='/HOME' />
//         <Route path='/NOTES' element={<Notes/>} />
//         <Route path='/USERS' />
//       </Routes>
//     </Router>
//     </div>
//   )

//material ui
// const LinkButon = (props)=><Button component={Link} color="inherit" {...props}/>

// return (
//   <Container>
//   <Router>
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="menu">
//       <header>
//         <Button color="inherit" component={Link} to="/home">
//          HOME
//         </Button>
// {/* segunda forma con una constante */}
//         <LinkButon to="/notas">
//           Notas
//           </LinkButon>
//         <LinkButon to="/users">
//         Users
//         </LinkButon>
       
//         <Button color="inherit">
//          {user? user.name:<LinkButon to='/LOGIN'>LOGIN</LinkButon>}
//          </Button>
//       </header>
//       </IconButton>
//       </Toolbar>
//     </AppBar>
//     <Routes>
//       <Route path="/notas/:Id" element={<NoteDetalles notas={notas}/>}/>
//       <Route path="/notas" element ={<Notes/>}/>
//       <Route path="/users"/>
//       <Route path="/home" />
//     </Routes>
//   </Router>
//     </Container>
// )

return (
  <Router>
    <header>
      <nav>
        <StyledLink variant="bold" to='/home' style={{ margin: '2rem' }}>HOME</StyledLink>
        <Link to='/notas' style={{ margin: '2rem' }}>NOTES</Link>
        <Link to='/users' style={{ margin: '2rem' }}>USERS</Link>
        
         {user? user.name:<Link to='/LOGIN' style={{ padding: '1rem' }} >LOGIN</Link>}
        
      </nav>
    </header>
    <Routes>
      <Route path="/notas/:Id" element={<NoteDetalles notas={notas}/>} />
      <Route path="/notas" element={<Notes/>}/>
      <Route path="/users" />
      <Route path="/home" />
    </Routes>
  </Router>
)
}

export default App

// video sesion
// regresando de crear el service en login-crear un state de user donde se almacenara lo que reciba despues de llamar al login
// al login enviarle como param un objeto donde tenga el username y el password,recordar si el name y el valor tiene el mismo nombre en un obj,se puede omitir el valor
// poner dentro de un try catch y agregarle una notificacion cuando sea catch - probar poniendo un usuario que exista,para eso ir al backend para ver con que username y password has  logeado en login_user_rest
// si es correcto te estaria enviando en user el objeto con el token
// al logear correctamente se supone que ahi recien debe aparecer el formulario de postear notas pero esta activo antes de logear
// es mala prac. pero entonces se crea dos constantes donde retornara cada uno sus formularios,en verdad se crea un componente para cada uno
// hacer un ternario si user existe se muestra para crear notas si no el de logear
// en la const addnote donde se añaden las notas  eliminar el data y el id porque de eso se encarga el backe-ir ahi para enviar el token

// para no estar enviando el token traer la const de services note donde se enviara el token-ir a la handlelogin y traer el de service-luego ir al servicenota

// ahora guardar el user en el storage ir a handlelogin
// despues de guardar el user,crear otro usefect para hacer un get al localstorage donde ahi se actualizara el token y el usuario
// crear tambien una funcion donde se deslogea-handlelogout-este se ejecutara en un boton dentro de rendernoteform-investigar some site cookie-acaba el video

// video prop children
// crear un componente para cada formulario-primero crear loginform -pasar ahi donde haces login-tambien pasar algunas props que se requieren ahi-en el loginform se puede recibir en props(recordar que el props es un objeto con todas las props que le he pasado)-ir a loginform

// para el segundo formulario crear un arch.Noteform,pasar ahi lo que esta dentro de la funcion rendercreate.. traer el noteform y pasarle las props que necesita
// hay algunos usestate que deben estar aqui ya que lo esta usando dos componentes o mas pero el setnewnote solo lo usa el noteform-pasar el usestate ahi,tambien eliminar la funcion handlenotechage ya que lo podemos usar tambien en el noteform
// en la funcion addnote,nos da error en el newnote y el setnewNote por que estan en el noteform-ir ahi

// video de crear tu propio router-dom
// crear algunos funciones componentes fuera del app y de acuerdo al state ejecutarlo en el dom
// crear un header y ponerle algunos estilos camelcase- crear otra funcion donde al hacer onclick en una a debe ejecutar la funcion toPage enviandola un string
// habia un problema ya que al enviar a la funcion toPage con el string tambien queremos recibir su evento del onclick,para eso a la funcion toPage debe recibir en su parametro el valor luego retornar otra funcion y ahi recibe el evento
// para que cambie la url depende de donde le demos click se usa un valor de windows que es history.pushstate donde su 1 param debe recibir una data que dirige a la sgte ruta,en esta caso null,la 2 es el title que tendra y el 3 param a la ruta que te diriges
// al actualizar la pagina con esa ruta se iba a la de home y seguia con la anterior ruta-par eso quitar el state por defecto y poner loque usa la ruta,en el usestate se puede hacer un callback para extraer la ruta con el location-acaba el video

// video react router dom
//crear un arch notes, y ahi pegar todo del app.js,excepto donde creas el router manual
// comentar todo lo del video anterior e instalar npm i react-router-dom en la raiz de fronted
//crear un header con los link, switch ya no sirve ,ahora se reemplazo por routes ,components tampoco, ahora es element y este debe recibir un componente
//tenia un error al traaer notes ya que no habia hecho bien la copia de app.js a notes.js -acaba el video

//rutas dinamicas
//1 ir a note para que se transforme en un link y que se redirija a la url /notes/aca ira el id de esa nota
//crear una ruta de path que tenga un comodin /notes/:NOTAID - esa nota id puede ser cuaalquier cosa donde se dirija el usuario-en el link anterior de note se dirigia ahi pero con su id de su nota,es decir esta ruta sera /NOTES/id de la nota que di click
//crear un nuevo archivo en components donde muestre los detalles de una nota al hacerle click y vincularlo al element de la nueva ruta - tambien necesitara todas las notas pero las notas estan en el componente notes
//asi que se traeran aca y se pasaran por props a notadetalles ir al arh notadetalles

//video prag
//hacer un useefect para ver si es usuario esta activo,si lo esta, en el link login mostrar el user.name si no que muestre el link de login normal-hacer un ternarioo ahi-tenia un problema que cuando logeaba el link no cambiaba rapido,tenia que actualizar para que cambie- y esta bien ya que en app el usefect funciona una vez cuando se renderiza
// pero si cambias de ruta y este tiene su propio useefect para ver el user, en esa ruta se ejecutara su usefect-pero si de ahi vas al app donde tiene todas las rutas ,su usefect no se ejecutara porque ya lo hizo-es decir que cada vez que cambio de ruta se ejecuta todo dentro de app,excepto el useefect porque se ejecuto antes -acaba el video

//video proteger las rutas
//proteger la rut de homw,se puede poner un home render={()=>{
  // return user? <redirect to ="/algo"/>  :<Home/>
//}}  // la ruta que me renderize-si user exste que me redireciona a una ruta si no al componente home
//tambien podria ser home element={user?<algo/>:</home>} - se puede mandar props a </algo> asi home element={user?()=><algo props={props}/>:</home>}-acaba el video

//video custom hook
// crear una funcion ,dentro tendra un usestate,con varias funciones que modifiquen el state

// const App = () => {
// //la funcion debe comenzar siempre con un use
//   const useCounter=()=>{
//     const [counter, setCounter] = useState(0);

//     const incrementar=()=> setCounter(counter+1)
//     const decrementar=()=> setCounter(counter-1)
//     const resetear=()=> setCounter(0)
// //se debe retornar en un obj las funciones y el state
// return{
// incrementar,
// decrementar,
// resetear,
// counter
// }

//   }
//   //aqui usar el customhook creado
//   const contadorA=useCounter()
//   //ya que lo retornamos en un obj,se puede destructurar para sacar sus props
//   const{incrementar,decrementar,resetear,counter}= contadorA
//   return (
//   <div>
// <h3>{counter}</h3>
// <button onClick={incrementar}>Incrementar</button>
// <button onClick={decrementar}>Decrementar</button>
// <button onClick={resetear}>Resetear</button>
//   </div>)
// };
//a pesar de tener dos constantes llamando al custom hok, esas constantes tiene un state diferente, es decir , a pesar de usar el mismo hook,su sate es diferente
// export default App;
//acaba el video

//video refactorizando componentes
//crear una carp hooks- crear un archivo custom hook para las notas useNotes 
//copiar el useefect  de app.js donde se trae las notas y llevarlo en usenotes-ir ahi

//crear otro hook para el user-crear arch useUser
//ejecutar aqui ambos hooks donde traeran sus states
//en el arch. notes tambien se ejecutaba el useefect para traer las notas -ir ahi

//video rectboot
//envolver  el router en un div clas container
//para importar puedes traerlo desde un {} de react-bootstrap o import algo from react-bootstap/aca lo que quires importar (este es mas recomendable)
//ir donde renderizas tus notas - notes.js

//añadir el comp navbar de react-bo, ver en su pagina para saber un poco mas - darle boostrap al boton de make important -acaba el video

//video material ui
//instalar npm install @mui/material @emotion/react @emotion/styled //tenia error creo que me pedia react 17
//y lo instale npm install react@17.0.0 react-dom@17.0.0
//ir al public - index y pegar <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/> 
//comentar todo el retorno de app y pegar lo que tenias antes para que lo mejores con el material ui
//ponerlo dentro de un container de mateui
//ir a notes.js

//en vez de nabvar ahora es appbar,toolbar-iconbuton donde ira el icono del boton-button que envuelva al link
//para no estar envolviendo cada link-el button puede aceptar componente y hacerse pasar por el
//tambien puedes crear una constante reutilizable donde retorna el boton con el componente link-acaba el video

//video styled components
//dar estilos a tus componentes
//instalar npm install styled-components
//comentar todo lo que retorna el app y pegar el original,es como lo hemos hecho antes
//en components crear un arch button ir ahi

//exportar el link estilado y pasarlo al link de home 
//puedes pasar props al estilado -pasale un prop variant bold-ir a slydel