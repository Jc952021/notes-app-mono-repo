const palindrome = (string) => {
  if (typeof string === 'undefined') return // seria si el tipo de string es undefined que retorne un undefined
  return string.split('').reverse().join('')
}

const average = array => {
  // if (array.length === 0) return 0 // si su longitud es 0 que retorne 0
  if (typeof array === 'undefined') {
    return
  } else if (array.length === 0) {
    return 0
  }
  let sum = 0
  array.forEach(num => { sum += num }) // recordar que al foreach no se le retorna nada
  return sum / array.length
}

module.exports = {
  palindrome,
  average
}
