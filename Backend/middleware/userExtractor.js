const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // recuperar la cabecera autorization , aca creo que viene asi "Bearer (tu token)""
  const authorization = req.get('authorization')
  let token = '' // se va preparando el token
  // si autorization y si este le pasamos en mayuscula y empieza con bearer
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7) // como el authorization vien asi bearer 123123, solo necesitamos el token(que es el 1223)-si pones un substring lo comeznara desde esa posicion
  }
  let decodedToken = {}
  // ahora se decodifica el token con la clave secreta que guardamos en el env, este creo qu nos devuelve el payload
  // act: daba un error de jswtoken , se arregla con el try,catch
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (e) {}

  // si token o del id del payload no existen entonces se envia un status no autorizado
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token no valido' })
  }
  // destructurando el decoded para tener solo el id y renombrarlo con userId,con el id del usuario,ponerlo en el finbyid
  const { id: userId } = decodedToken
  req.userId = userId // como el req es un objeto se puede mutar ,agregandoleun nuevo atributo de userId donde sera igual al userId del decoded
  next() // este te envia a la siguiente ruta,creo que al async (req, res, next) de esa ruta
}

// pasar todo la autenticacion de post api/notes aca
// exportar una funcion anonima,agregar el req.userId-ir al index
