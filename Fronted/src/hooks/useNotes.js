import {useState,useEffect} from "react"
import  NotesServices from "../services/notes"

const useNotes = () => {
  const [notes, setNotes] = useState([])


  useEffect(() => {
    NotesServices.getAll().then(notas=>{
      setNotes(notas)
    })
    }, [])


    const addNote = (noteObject) => {
      NotesServices
        .create(noteObject) 
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          
        })
    }


    const toggleImportance=(id)=>{
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
    return NotesServices
        .update(id, changedNote)
        .then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
    }


    return{
      notes,
      addNote,
      toggleImportance
    }
};

export default useNotes;

//tambien se puede usar el usstate y el usefect,retornar las notas
//usar el useNotes en app.js-ir ahi

//retornar la funcion togleimportace pero ahi dentro solo retornar el then ya que afuera lo usaremos con el catch-regresar al notes.js