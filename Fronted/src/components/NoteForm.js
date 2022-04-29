import React, { useRef, useState } from 'react'
import Toglable from './Toglable'

const NoteForm = ({ handleLogout, addNote }) => {
  const [newNote, setNewNote] = useState('')

  const toglableRef = useRef()

  const handleChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleSubmit = (e) => {
  // aca se trae algunos codigos que habia en la funcion addNote
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: false
    }
    addNote(noteObject) // se envia el objeto a la funcion addNote que esta en el app,donde se ejecuta todo lo que tenia dentro el addNote,añadiendo una nueva nota
    // luego se usa el SetNewnote faltante
    setNewNote('')
    // despues de añadir la nota y limpiar el setnewnote se debe usar el ref, el current es el valor actual del toglableref,se accede a la funcion que estaba dentro de un objeto y lo ejecutamos
    toglableRef.current.togleVisibility() // al ejecutar esta funcion, ocultaria el formulario, acaba el video
  }

  return (
    <Toglable ref={toglableRef} buttonLabel='Mostrar creacion de notas'>
      <h3>Creando una nueva nota</h3>
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type='submit'>save</button>
      </form>
      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
    </Toglable>
  )
}

export default NoteForm
// ya que al activar el form se usa el addNote,pero a este no podemos enviar el parametro ObjNote que se necesita en esa funcion
// se crea otra funcion  handlesubmit para el form,asi el addnote se podra usar para enviar el parametro ahi dentro-envolver tambien con toglable al noteform-tenia un error al crear una nueva nota,se habia bugeado,solucion cree otro usuario y nuevas notas para ese usuario

// video useref - quiero que al guardar la nota con save osea el handlesubmit,se active el boton cancel de toglable,creamos una const toglaBLEREF  que sera igual al userRef(),se puede tener referencia de un elemento del dom,
// pero para tener la ref de uno de los elementos de un componente,a ese componente se debe agregarle un forwardRef-ir al toglable

// ya almacenado la funcion en el toglable ref hay que usarlo despues de enviar la nota con save-ir a handlesubmit

// video proptypes instalar npm prop-types,esto creo que sirve para que tu componente use props especificas,ya que queremos que al enviar al toglable un buttonlabel,este sea requerido-ir al comp toglable
