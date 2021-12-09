import React from 'react'
import Toglable from './Toglable'
import PropTypes from "prop-types"

const LoginForm = (props) => {

//   const [loginVisible, setLoginVisible] = useState(false)
// // recordar que en los estilos en linea se manda un obj,con su nombre pero su valor debe ir entre ""
//   const ocultarWhenVisible = {display:loginVisible?"none":""} //si loginvisible existe, es decir que esta en true,entonces se usa el estilo display none para ocultarlo
//   const mostrarWhenVisible = {display:loginVisible?"":"none"}
  
  return (
    //mandar una prop de prueba
    <Toglable buttonLabel="mostrar login"> 

    <form onSubmit={props.handleLogin}>
        <div>
        <input type="text" value={props.username} name="Username" placeholder="Username" onChange={(e)=>{props.setUsername(e.target.value)}}/>
        </div>
        <div>
        <input type="password" value={props.password} name="Password" placeholder="Password" onChange={(e)=>{props.setPassword(e.target.value)}}/>
        </div>
        <div>
        <button id="form-login-button" type="submit">Login</button>
        </div>
      </form>

      </Toglable>
  )
}

LoginForm.propTypes= {
handleLogin : PropTypes.func.isRequired, // le ponemos que es una funcion y es requerida
username: PropTypes.string //que sea un string pero que no sea requerido
};

export default LoginForm
//creamos un estado y un boton para mostrar y cancelar el formulario
// el prof en ves de crear un ternario,lo que creo fue estilos en linea condicionales-separar en divs lo que se va a mostrar segun la condicion
// y en los divs que tenga un style, se pondra las const que hemos creado 
//crear un nuevo comp.toglable,donde este componente tendra  ahora el state de loginform y el div de los dos botones donde se setea-ir ahi

//importar el proptipes y al lginform agregarle un obj con props que queremos que sean requeridas
//no es necesario poner el displayname ya que este no tiene el forward
// si quieres poner un valor por defecto al butonlabel de toglable se puede igualar a uno por defect,pero el proptypes como era required saldra un error,quitar el required ya que tienes uno por defecto y asi se arregla-acaba el video

//videoo testing library
//instalar npm install --save-dev @testing-library/react y npm install --save-dev @testing-library/react @testing-library/jest-dom (hace mejoras al expect)
//crear en componentes un test.js del componente que se testeara,crear una de note.test.js ir ahi

