import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {useNavigate} from "react-router-dom"

const NoteDetalles = ({notas}) => {
const navigate = useNavigate()
const [user, setUser] = useState("initialState")
  const {NoteId} = useParams()

  const nota = notas.find(nota=>nota.id===NoteId)
const cambiarnota=(e)=>{
e.preventDefault()
setUser("")
navigate("/notes")
}
  return (
    !nota?"CARGANDO":
    <div>
      <h2>{nota.content}</h2>
      <p>{nota.user.name}</p>
      <p><strong>{nota.important?"Importante":"No Importante"}</strong></p>
      <button onClick={cambiarnota}>Ir a Home</button>
    </div>
  )
}

export default NoteDetalles

//usar el useparam de reactrouterdom,este traa el path osea la ruta pero si en la ruta hemos colocado un :algo,se podra acceder ahi
//teniendo el id ,se busca en todas las notas que le pasamos por props el id de noteid qque coincida con una nota
//se puso el cargando porque si vienes de hacer click en una nota,no te saldra el cargando porque cuando inicias un componente se ejecuta desde arriba hasta el return-y las notas ya estan cargadas
//pero si actualizas este componente ,se ejecuta de arriba para abajo pero al llegar al const nota ahi se llama al param notas,y este como es asincrono debe tardar- asi que el renderizado seguira para abajo
//ya que sigue trayendo las notas ,entonces la cont nota no existe y cuando se llega al !nota?cargando saldria este ya que la nota no existe todavia- ya cuando termina de traer las notas,este hace el usestate ejecutando todo el dom
//ahira cuando renderize este componente ya existira notas ,por ende la const nota y se mostraria el div con las propiedades de esa nota
//pero si no ponias el !nota?"CARGANDO": -entonces se ejecutaria al comienzo el div pero como la const nota no existe saldria error,para eso se pone despues de la nota del renderizado un ? - nota? que significa que si nota existiese que haga algo si no, que no haga nada-acaba el video

//video navegacion pragmatica 
//ir a notes.js