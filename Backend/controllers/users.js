const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const Users = require('../models/User')

// get
usersRouter.get('/', async (req, res) => {
  const users = await Users.find({}).populate('notes', {
    content: 1,
    important: 1
    // _id: 0 // si no quieres el id se pone 0, recordar que en la bd el id esta como _id
  })
  res.json(users)
})

// post
usersRouter.post('/', async (req, res) => {
  try {
    const { body } = req
    const { username, name, password } = body // de body que es un objeto,destructuro el username,etc

    // se crea como un cifrado-mientras mas alto es-mas se va a demorar en cargar
    const saltRounds = 10
    // hashear el password con bcrypt
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new Users({
      username, // se pone solo una vez ya que username es igual al del body
      name,
      passwordHash // el hash sera igual al password del body // act.  como se creo una constt paswrodhash, ahora se pone aca
    })
    // despues de haber creado un usuario en la coleccion User se procede a guardarlo y responderlo en un json
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    // console.error(error) // ver que nos devuelve-quitar el silent del pakjson-acaba el video tdd
    res.status(400).json(error)
  }
})

module.exports = usersRouter
// usar el expres router,traer el modelo de user
// el usersroouter seria como el app ,pero en la ruta si solo pones el / se refiere a que es relativo al que esta en el index, que es /api/user
// crear un nuevo usuario con new
// ejecutar el npm run dev y crear un arch rest para crear un usuario-recordar que le enviaremos un objeto con los valores destructurados del body -ir ahi a postear algo
// pag para ver donde esta tu info https://haveibeenpwned.com/
// para encriptar el password se instala npm i bcrypt- una vez hasheado el pasword- borrar el usuario de mongodb y postear otro usuario
// crear un nuevo test para usuario-ir ahi

// video relaciones de colec
// agregar un get
// crear un request get all user para ver-me salia error porque se conectaba al get del note que es /api-le agrege /api/notes-ir a index

// en users get agregar al find un populate("notes") - esto al momento de traer los usuarios te rellena con la informacion de la notas
// pero te traia todas las propiedades de las notes,pero como solo quieres algunos, se le agrega un segundo parametro donde tendra las props que quieres
// tambien hacer lo mismo cuando traigas las notas,en estas se debe ver su user,pero que solo traiga su username y su name de ese user,acaba el video
