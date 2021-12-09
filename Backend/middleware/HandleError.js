const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (res, { message }) => // el 2 es el error.mesage destructurado
    res.status(409).send({ error: message }),

  JsonWebTokenError: (res) =>// esto se puede omitir o si escoges la 2 opcion donde lo resolvi entonces dejarlo
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpirerError: res =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: (res, error) => {
    console.error(error.name)
    res.status(500).end()
  }
}

module.exports = (error, request, response, next) => { // esta funcion lo exportaremos,recordar que si tiene un next de param o error,recibira lo que le envia el next
  const handler =
    ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError // aca se entra al objeto error_handle donde se necesitara unos de sus atributos de acuerdo al error.name que le enviamos desde el next, si no existe ninguno entrara al default

  handler(response, error) // este enviara de param. al res y al error,luego ejecutara esto exportandolo
}
// arreglando despues del token
// crear un objeto donde tendra varios atributos y cada uno de ellos sera una fucion anonima
// despues de crear - ir al login.js

// module.exports = (error, req, res, next) => { // en el 1 param puede recibir lo que le envia el next,pero debe estar el next de parametro si no ,no llegara lo que envias al next
//   // console.log(error.name) // en la terminal saldra una string CastError
//   console.log(error.name)
//   if (error.name === 'CastError') {
//     res.status(400).send({
//       error: 'la id usada esta mal'
//     }) // el 400 sig. bad request es decir lo que me paso esta mal
//   } else {
//     res.status(500).end() // el 500 es cuando nuestro servicio esta mal
//   }
// }
