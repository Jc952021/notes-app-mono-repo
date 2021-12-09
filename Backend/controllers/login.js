const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const loginRouter = require('express').Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash) // en compare da true o false

  if (!(user && passwordCorrect)) { // si el user o el pasword no existen
    res.status(401).json({
      error: 'username o password invalidos'
    })
  }
  // si user y pass existen ,se crea el usuario para el token y el id del usuario,el name no es importante-creo que este es el payload
  const userforToken = {
    username: user.username,
    id: user._id
  }
  // se crea el token- el  sign sig firmar-- es decir firmamos el payload(que es el userfortoken ) con una contraseña y envimos el token en el res
  const token = jwt.sign(userforToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7 // seria 60sg * 60 seria una hora* 24 seria un dia * 7 que seria 7 dias
  })

  res.send({
    name: user.name,
    username: user.username,
    token
  })
})
module.exports = loginRouter
// crear un router
// del req.body destructurar el username y el password
// traer el modelo del user para buscar el username,se busca con el findone(este creo que te trae el doc. que coincida con el username:"username" que le pase)
// se crea una const passwordco donde si user no existe sera false sino el bcrypt compara el password sin hash con el password con hash del usuario encontrado con el findone
// si paswordcorect no existe entonces se manda un json-es bueno poner password o user invalidos para confundir al hacker XD,401 sig. no autorizado
// si existe entonces se hace un send con el name y el username de user
// pasar el loginrouter al index y crear un rest de postear un login_user,pero antes al prof. le daba error en el arch.mongoose.disconect-en proces.on se pone mongose.disconect quitando el conection
// crear un nuevo usuario y el login,pero este login debe coincidir con el pasword y username del nuevo usuario
// ahora instalar npm i jsonwebtoken-usar el require-crear el userf.. - token-res,etc
// crear un env para la contra de la firma-crear en env un SECRET y traerlo aca con proces.env
// ir al index

// regresando del handle,poner un tiempo de expiracion al token agregando otro param obj cuando se firma(sign)
// agregar al handleerror un nuevo atributo cuando expira el token tokenexpirererror
// despues de crear el atributo- crear un nuevo midleware userextractor ir ahi
