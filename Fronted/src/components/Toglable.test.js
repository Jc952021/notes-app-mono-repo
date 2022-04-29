import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/dom'
import Toglable from './Toglable'
import i18n from '../i18n/index'

describe('<Toglable/>', () => {
  const buttonLabel = 'mostrar'
  let component

  beforeEach(() => {
    component = render(
      <Toglable buttonLabel={buttonLabel}>
        <div>Test Div Content</div>
      </Toglable>
    )
  })

  test('renderizando si tiene un children', () => {
    component.getByText('Test Div Content')
  })

  test('renderizando si tiene un children pero este no debe ser visible', () => { // recordar que en el div del hijo esta con display none
    const el = component.getByText('Test Div Content') // la const el seria el div que tiene el texto test div ..
    expect(el.parentNode).toHaveStyle('display:none') // espero que el padre de la const el,tenga un estilo display none
  })

  test('despues de hacer click que se muestre el hijo', () => {
    const button = component.getByText(buttonLabel) // buscar al elemento que tenga el texto de butonlabel osea mostrar,ya que este boton es el encargado de que se muestre el hijo
    const el = component.getByText('Test Div Content')

    fireEvent.click(button) // hacer el evento de hacer click al boton

    expect(el.parentNode).not.toHaveStyle('display:none') // esperoque el padre del hijo al dar click este ya no tenga el estilo display none osea que se va a mostrar
  })

  test('despues de hacer click en cancel, que se oculte el hijo', () => {
  // este es lo mismo que el anterior,donde se mostrara el hijo
    const button = component.getByText(buttonLabel)
    const el = component.getByText('Test Div Content')

    fireEvent.click(button)
    expect(el.parentNode).not.toHaveStyle('display:none')
    // aca se debe hacer click al cancel y que se oculte el hijo
    const buttonCancel = component.getByText(i18n.TOGLABLE.CANCEL__BUTTON) // obtener el boton donde tiene el texto cancel para ocultar el hijo,recordar que el i18n,tog.ca es el predeterminado si acaso el usuario lo traduce en el comp.togable
    fireEvent.click(buttonCancel) // hacer click al boton de cancelar
    expect(el.parentNode).toHaveStyle('display:none') // espero que el padre del hijo al dar click en cancelar se oculte osea que tenga el estilo display none
  })
})

// crear un describe,este almacenara todos los test,crear un component vacio donde este tendra su nuevo valor en el beforeeach,recordar que este siempre se ejecuta antes de hacer un test y tambien para no estar renderizando a cada rato dentro de los tests
// hacer un test para ver si tiene un texto
// hacer otro test para ver si el elemento que su padre tenga un estilo display none-recordar que en togable los hijos tiene un padre con display none osea estan ocultos
// hacer otro test que cuando se haga click al boton del label, el hijo que se muestre
// otro test para ver si funciona cuando hago click al boton cancel para ocultar el children,pero si el usuario lo habia traducido saldria su nombre de cancel a cancelar,malogrando el test,
// para eso se crea un carp i18n arch index donde almacenara un texto predeterminado a pesar de que el usuario lo haya traducido mantendra este nombre,crear codigo en el i18n index y pasarlo en el boton de cancelar de togable
// pasarlo tambien el texto predeterminado aca en el nuevo test
// para ver cuando hemos cubierto de test en los componentes se pone npm test -- --coverage
// para ver mas detallado en la terminal escribe ls - cd coverage - ls - cd lcov-report - como no me funcionaba el open le di ctrl + click esntre a su index uy lo abri ahi - termina el video

// video cypres
// instalar npm install cypress -D , crear un nuevo script ,cypres:open-ejecutar npm run cypress:open-te debe crear una carpeta cypress-tambien te saldra un programa(escoger chrome y ejecutar los test para ver)
// crear otro script en el pkjson de la api, donde npm start ejecutara desde el entorno env de test es decir ejecutara la base de datos unico para el test(tenia un error al iniciar pero le añadi el cross-env y funciono)
// en la carp,cypres/integration-borrar las carp que tiene dentro,crear un arch.crear un arch note_app.spec.js-ir ahi
