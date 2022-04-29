import React, { useState } from 'react'
import Toglable from './Toglable'
import PropTypes from 'prop-types'
import {Form,Button} from "react-bootstrap"

const LoginForm = (props) => {
//   const [loginVisible, setLoginVisible] = useState(false)
  // // recordar que en los estilos en linea se manda un obj,con su nombre pero su valor debe ir entre ""
  //   const ocultarWhenVisible = {display:loginVisible?"none":""} //si loginvisible existe, es decir que esta en true,entonces se usa el estilo display none para ocultarlo
  //   const mostrarWhenVisible = {display:loginVisible?"":"none"}

  return (
    <>
    <Toglable buttonLabel='mostrar login'>

      <Form onSubmit={props.handleLogin}>
        <Form.Group id="username" className="mb-3">
          <Form.Control type='text' value={props.username} name='Username' placeholder='Username' onChange={(e) => { props.setUsername(e.target.value) }} />
        </Form.Group>
        <Form.Group id="password" className="mb-3">
          <Form.Control type='password' value={props.password} name='Password' placeholder='Password' onChange={(e) => { props.setPassword(e.target.value) }} />
        </Form.Group>
        <div>
          <Button id='form-login-button' type='submit'>Login</Button>
        </div>
      </Form>

    </Toglable>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired, // le ponemos que es una funcion y es requerida
  username: PropTypes.string // que sea un string pero que no sea requerido
}

export default LoginForm
// creamos un estado y un boton para mostrar y cancelar el formulario
// el prof en ves de crear un ternario,lo que creo fue estilos en linea condicionales-separar en divs lo que se va a mostrar segun la condicion
// y en los divs que tenga un style, se pondra las const que hemos creado
// crear un nuevo comp.toglable,donde este componente tendra  ahora el state de loginform y el div de los dos botones donde se setea-ir ahi

// importar el proptipes y al lginform agregarle un obj con props que queremos que sean requeridas
// no es necesario poner el displayname ya que este no tiene el forward
// si quieres poner un valor por defecto al butonlabel de toglable se puede igualar a uno por defect,pero el proptypes como era required saldra un error,quitar el required ya que tienes uno por defecto y asi se arregla-acaba el video

// videoo testing library
// instalar npm install --save-dev @testing-library/react y npm install --save-dev @testing-library/react @testing-library/jest-dom (hace mejoras al expect)
// crear en componentes un test.js del componente que se testeara,crear una de note.test.js ir ahi

//video usefield
//crear un custom hook
// const useField=(type)=>{
//   const [value, setValue] = useState("");
// const onChange = e=>setValue(e.target.value)

// return{
//   value,
//   onChange,
// type
// }
// }
//ejecutar el custom hook mandando su type
//crear un input de simulacion-uno para el username y el password-recordar que las dos contastantes dentro tendran dos estados apartes
// const funcion=()=>{
//   const username=useField("text")
//   const password=useField("password")
//ya que el 1 input la prop y su valor son iguales entonces se puede poner el mismo username
// return(
// <div>
{/* <input type={username.type} onChange={username.onChange} value={username.value} name="username"/> */}
{/* destructurar username,se pone dentro de llaves ya que es js y se supone que saldria value:value pero seguro al pasar a html se pone value=value */}
{/* <input {...username} name="username"/> 
<input {...password} name="password"/> 
</div>
)
} */}
//buscar en google use hooks , react hook form y formik para crear formularios -acaba el video

//video bootstrap react
//instalar npm i react-bootstrap y bootstrap 4.6.0, https://react-bootstrap.github.io/getting-started/introduction
//de esa pagina copiar el css.min y pegarlo en el index
//ir a app

//video react-bot
//traer el form y el buton para darle bootstrap,el form tiene subcomponentes como el group - ir a app