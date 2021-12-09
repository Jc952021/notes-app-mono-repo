const mongoose = require('mongoose')
const { server } = require('../index')

const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, getUsers } = require('../tests/helpers')

describe.only('creando un nuevo usuario', () => {
  beforeEach(async () => { // antes de los test, se elimina todo dentro del modelo(colecion) user, y se crea un nuevo usuario
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10) // crear un passwordhash para agregar y crear al nuevo usuario

    const user = new User({ username: 'prueba', passwordHash }) // algunos atributos se omiten porque no son requeridos
    await user.save() // luego se guarda el usuario
  })
  // crear el test
  test('espera crear un nuevo usuario', async () => {
    // const usersDB = await User.find({}) // primero traer todos los users de la base de datos para compararlo despues con su length
    // const usersAtStart = usersDB.map(user => user.toJSON()) // cada usuario  le agrega un json- creo que con el json a cada user le agrega algo dentro , act. traer delhelper
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'prueba1',
      user: 'probador',
      password: 'contra'
    }
    // traer la api de supertest para postear
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/) // esperamos que nos responda que tiene un header de tipo json
    // despues de haber esperado la respuesta,lo volvemos a llamar para ver si se cumplio //act.lo traemos del helper
    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1) // espero que su longitud sea igual a la longitud inicial del usersatstart mas 1

    const usernames = usersAtEnd.map(u => u.username) // por cada usuario dentro de la coleccion users que me traiga un nuevo arreglo pero con solo el username de cada usuario
    expect(usernames).toContain(newUser.username)// espero que en el arreglo de usernames tenga el primer username que agrege
  })

  test('creacion fallida con estatus y mensaje erroneas al crear un usuario con username ya existente', async () => {
    const usersAtStart = await getUsers() // 1 se trae los usuarios
    const newUser = { // se crea un nuevo usuario pero con el username igual al que esta en el beforeeach
      username: 'prueba',
      user: 'tdd',
      password: 'contratdd'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400) // espero un 400 osea que me de un error
      .expect('Content-type', /application\/json/)

    expect(result.body.errors.username.message).toContain('`username` to be unique') // espero que resultado.bod.er tenga ese texto,tocontain puede ver que item esta dentro de un array o ver si existe en un string una subcadena en una cadena, como es en este caso

    const usersAtEnd = await getUsers() // se vuelve a llamar a los usuarios
    expect(usersAtEnd).toHaveLength(usersAtStart.length) // espero que la longitud de los usuarios finales sea la misma longitud de los usuarios iniciales ,ya que al tener el mismo username y el error no debe añadirse ese newuser
  })

  afterAll(() => {
    mongoose.connection.close()
    server.close()
  })
})

// crear un describe,crear dentro un before-recordar que el before se ejecuta antes de los test
// despues de hacer los cambios al test,ejecutar el npm run test-pero para que ejecute este test,agregar al describe.only. en el pajson.tambien poner al test este archivo user
// salia que el port ya estaba siendo usado por el mongoose-ir al pakjson para agregar un nuevo puerto(recordar que el purto se pone antes del jest)-agregar el after para cerrar la conexion-traer tambien el mongose y el server-probar un 204 para ver si hay error
// ir al user.js para poner un status 201(que sig creado) despues de guardar con el save
// como el se ejecuta un par de veces el user find y el mapeo,llevarlos al arch.helper y trarerlo luego

// tdd
// crear un nuevo test
// al hacer el test daba error de haber creado y no un error de 404,para eso se nesecita validar datos unicos
// instalar npm i mongoose-unique-validator (https://www.npmjs.com/package/mongoose-unique-validator)- ir al model de user
