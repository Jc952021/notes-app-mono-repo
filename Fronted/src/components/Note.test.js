import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent, prettyDOM } from '@testing-library/dom'
import Note from './Note'

test('renderizando el contenido', () => {
  const note = {
    content: 'algo',
    important: true
  }

  const component = render(<Note note={note} />)
  // console.log(component)
  component.getByText('algo')// es para ver si tiene este texto
  component.getByText('make not important')
  // expect(component.container).toHaveTextContent(note.content) //espero que el contenido de component tenga un contenido de texto de note.content
  // component.debug()
  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))
})

test('haciendo click al boton donde llama un evento', () => {
  const note = {
    content: 'algo',
    important: true
  }

  const mockHandler = jest.fn() // esto se hara pasar por una funcion

  const component = render(<Note note={note} toggleImportance={mockHandler} />) // se añade un nuevo parametro donde este sera una funcion anonima// act ahora sera el mock
  const button = component.getByText('make not important') // buscamos del componente un elemento que tenga el texto make not import

  fireEvent.click(button)
  expect(mockHandler).toHaveBeenCalledTimes(1) // espero que la funcion mock haya sido llamado una vez,sera una vez porque arriba se hizo el firevent una vez
})

// importar del testing de react el render ,del jest un extend,note
// hacer una simulacion que renderizar el comp. note,si ves ahi este recibe un obj prop note donde tiene ahi el important y el content
// crear una constante donde almacenara el render el comp,note con la prop note,probar primero con un log-iniciarlo en la consolacon un npm run test
// ir aca https://testing-library.com/docs/react-testing-library/cheatsheet para ver que podemos usar con  el test
// probar con el getBytext el content que hemos creado en el obj note y para el boton si has puesto true debe salir make not important
// se puede probar de otra forma-container es el html de component
// component debug te muestra lo que se esta renderizando
// tambien se puede buscar un elemento del componente , en este caso se buscara el li con querySElector,si se hace un console log del li aparecera muchos elementos,pero para que te aparezca el elemento li, se importa un testin pretydom
// hacer un nuevo test donde esta vez note tendra un segundo parametro , y este sera una funcion que ira en el onclick del boton
// se importa un fireevent ,esto hara un evento que para que haga un click se le añade este
// para saber si esta funcionando la funcion de togleimportance,se crea una cont mock,este se hara pasar por una funcion para ponerlo en el togleimportance
// al mock se colocara otros codigos-crear un nuevo arch test para toglabe-ir ahi
