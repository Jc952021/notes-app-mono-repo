import React from 'react'
// import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
//mui
// import { Button, TableCell } from '@mui/material'
//styled
import {Button} from "./Button"


const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  // return (
  //   <>
  //     <td className='note'>
  //     <Link to={`/NOTES/${note.id}`}>
  //     {note.content}
  //     </Link>
  //     </td>
  //     <td>
  //     <Button onClick={toggleImportance}>{label}</Button>
  //     </td>
  //   </>
  // )

  //material ui
  // return (
  //   <>
  //     <TableCell className='note'>
  //     <Link to={`/NOTES/${note.id}`}>
  //     {note.content}
  //     </Link>
  //     </TableCell>
  //     <TableCell>
  //     <Button variant="contained" onClick={toggleImportance}>{label}</Button>
  //     </TableCell>
  //   </>
  // )

  //styled component
  return (
    <>
      <Link to={`/notas/${note.id}`}>
      {note.content} 
      </Link>
      <Button onClick={toggleImportance}>{label}</Button>
    </>
  )
}

export default Note

//comentar lo anterior y pegar el original
//traer el boton que ha creado con el styled
//crear un componente styledLink ir ahi