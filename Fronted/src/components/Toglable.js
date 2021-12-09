import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from "prop-types"
import i18n from "../i18n/index"

const Toglable = forwardRef(({children,buttonLabel},ref) => {
  const [visible, setVisible] = useState(false)
  // recordar que en los estilos en linea se manda un obj,con su nombre pero su valor debe ir entre ""
    const ocultarWhenVisible = {display:visible?"none":""} //si loginvisible existe, es decir que esta en true,entonces se usa el estilo display none para ocultarlo
    const mostrarWhenVisible = {display:visible?"":"none"}

   //funcion para setearvisible
   const togleVisibility = ()=>setVisible(!visible) 
   
   useImperativeHandle(
     ref,
     () => {
       return{
         togleVisibility
       }
     }
   )

  return (
    <div>

    <div style={ocultarWhenVisible}>
      <button onClick={()=>{setVisible(true)}}>{buttonLabel}</button>
    </div>

    <div style={mostrarWhenVisible}>
    {children}
    <button onClick={()=>{setVisible(false)}}>{i18n.TOGLABLE.CANCEL__BUTTON}</button>
    </div>

    </div>
  )
}
)
Toglable.displayName = "Toglable"

Toglable.propTypes = {
buttonLabel:PropTypes.string.isRequired // el buton label debe ser un string requerido
}

export default Toglable
//quitar la palabra login del loginvisible,destructurar el children en toglable,traer el div de mostrar login y el div donde se vera el children de toglable,,al hijo de este tambien le agregaremos el boton donde se setea elvisible(false)
// ahora al loginform que sera solamente el formulario de login,envolverlo con toglable para que ahora el hijo de toglable sea ese form-ahora toglable sera un componente reutilizable que si a cualquier componente que envuelvas con este toglable
// al dar click en mostrar login,saldra un div donde mostrara su children(el componente al que esta envolviendo el toglable) mas el boton de cancelar
// puedes mandar desde loginform una prop a toglable,donde ahi se recibira destructurado y se podra usar dentro de toglable-ir a app

//envolver la funcion anonima con el forwardRef,cuando tiene esto ,el toglable ya puede recibir la prop ref que le enviamos desde noteForm,pero este debe ir como segundo parametro aparte de sus propias props del toglable, este no esta dentro de un objeto por eso no se destructura
//crear una funcion donde se usara el setvisible(!visible),esto significa que seteara lo contraria al state de visible,osea sivisible es true seteara false
// usaremos un nuevo hook useimperative(este solo se puede usar si esta disponible el forwardref),si queremos usar la funcion toglevisivility  afuera de este componente toglable, se usara este hook
//como primer parametro se coloca donde se almacenara la funcion,en esta sera el ref,como segundo param, sera una funcion anonima donde retornaremos la funcion dentro de un obj al ref
//si quieres se puede reutilizar la funcion toglevisible en los onclick , que seria lo mismo-regresar al noteform

//importar el proptypes y arriba del export default poner el nombre de tu componente junto con una funcion que tendra propTypes(esto es informativo),sera igual a un objeto donde aca pondremos que valores seran requeridos
//al no enviar unbutonlabel del noteform saldra un error que es requerido el butonlabel,pero en la consola salia que se requeria un buttonlabel en forward,pero lo que queria era que saliera el toglable ya que ahi esta el error
//para eso se añade una prop al toglable que es displayname,esto fuerza a que salga el nombre que pongas al componente toglable-ir a login form para usar ahi tambien el proptypes