const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of midudev', () => { // el 1 param creo que seria como un mensaje
  const result = palindrome('midudev')
  expect(result).toBe('vedudim') // sera espero que result sea vedudim
})

test.skip('palindrome de un string vacio', () => {
  const result = palindrome('')
  expect(result).toBe('') // saldra pass
})

test.skip('palindrome de un undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined() // saldra error ya que no estamos enviando nada al palindrome-configurar el palindrome para que acepte un undefined,act-ahora que devuelve un undefined se cambia el tobe por tobeundefined(este espera un undefined)
})
