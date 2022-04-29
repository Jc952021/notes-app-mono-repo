import styled from "styled-components"
import {Link} from "react-router-dom"
import Temas from "../Temas"

export const StyledLink=styled(Link)`
color:${Temas.primary};
padding-bottom:5px;
border-bottom:1px solid green;
font-weight:${props=>props.variant ==="bold"?"bold":"regular"};
text-decoration:none;
&:hover{
  color:red;
}
`


//hacer lo mismo como el buton pero el problema era que solo podiamos estilar comp html,pero queremos estilar el link de react-rout-dom
//traer el link de react-dom y al stlyed ejecutar ese Link
//puede recibir un hover con el & asi como sass
//ir a app

//se recibe props en una funcion anonima y ya que estamos en un `` se recibe el js en un ${}
//crear en src un arch. temas donde exportaremos y crearemos un objeto con propiedades y valores de un color
//importarlo aqui y ponerlo en color - acaba el video

