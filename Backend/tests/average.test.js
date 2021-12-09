const { average } = require('../utils/for_testing')

// crear un grupo para los test,average recibe un array de numeros donde saca su promedio
describe.skip('average', () => {
  test('de un valor', () => {
    expect(average([1])).toBe(1)
  })

  test('de varios valores', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3)
  })

  test('de un valor vacio', () => {
    expect(average()).toBe(undefined) // saldra nam porque 0/0 no existe-configurar en esa funcion
  })
})
