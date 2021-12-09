const mongoose = require('mongoose')

const { server } = require('../index') // en index exportar el app donde lleva el express, act. pasamos el app al helper

// modelo de la nota
const Note = require('../models/Note')
const { initialNotes, api, getAllContentdeNotas } = require('./helpers')

beforeEach(async () => { // beforeeach sig. antes de cada  test
  await Note.deleteMany({}) // del modelo(coleccion) nota borramos todas las notas que tenia dentro
  // se creara nuevas notas .
  // const note1 = new Note(initialNotes[0])
  // await note1.save()

  // const note2 = new Note(initialNotes[1])
  // await note2.save()
  // act: se puede crear de dos formas ya que si agrego una nueva nota al initialnotes y antes habia creado dos nuevas notas con el new Note,y al agregar la nueva nota, en los test se especificaba el lenght del initialnotes,pero como antes se creo solo dos notas habra un error
  // paralelo(creo que significa que se ejecuta todo a la vez lo de adentro de promise.all)
  // const notasObjects = initialNotes.map(note => new Note(note))  por cada nota del initial que cree una nueva nota en el modelo
  // const promises = notasObjects.map(note => note.save())  se mapea otra vez para que por cada nota despues de haber hecho el new se ponga el save
  // await Promise.all(promises) al tener un array promises asincrono por el save, el promise.all espera que se termine todo lo asincrono dentro del array promises

  // secuencial
  for (const nota of initialNotes) { // por cada nota
    const notaObject = new Note(nota) // se agrega una nueva nota en el model note
    await notaObject.save() // despues de crearlo se guarda con el save
  }
})
describe('get a las notas', () => {
  test('y que las notas retornen en json', async () => {
    await api
      .get('/api')
      .expect(200)
      .expect('Content-Type', /application\/json/) // este es un regex- el \ siginifica delimitador es decir el / sera normal- lo que buscamos es application/json - notar que el / cerraria el regex pero para volverlo un caracter normal se pone el \
  })
  test('para ver si hay dos notas', async () => { // aca si funciono el asincrono
    const response = await api.get('/api')
    expect(response.body).toHaveLength(initialNotes.length) // espero que el body tenga de longituda 2.act: cambiarlo por el initial.leng ya que se puede borrar una nota de el initial
  })

  test('y espero que la primera nota sea primera nota', async () => {
    const { contents } = await getAllContentdeNotas() // en helper retornamos en un objeto el contents y el response- recordar que se  pone el await ya que  esa funcion es asincrona
    expect(contents).toContain('primera nota') // espero que en el body en su posicion 0.content sea "mi primera nota", act. se mapeara y se pondra el tocontain(este buscara en el arreglo que lo estamos buscando)
  })
})

// post
describe('post a las notas', () => {
  test('donde se añade una nota', async () => {
    // creo que esto es una simulacion de que como lo estuvieramos enviando un post
    const newNote = {
      content: 'nueva nota',
      important: true
    }
    await api
      .post('/api')
      .send(newNote) // send es como si loestuvieramos enviando la nueva nota (es exclusivo de supertest)
      .expect(200)
      .expect('Content-type', /application\/json/) // esperamos que nos devuelva en un apl/json
    // ahora para ver las notas despues de haber hecho post
    const { contents, response } = await getAllContentdeNotas() // aca traer ambas ya que estamos usando ttambien el response
    expect(response.body).toHaveLength(initialNotes.length + 1) // espero que el body tenga una longotud de mis notas iniciales + 1 . recordar que despues de los test añadimos un par de notas con el beforeeach
    expect(contents).toContain(newNote.content) // espero que en el mapeo de las notas para sus contents contengan el content de la nueva nota que postee
  })
  // post sin content
  test('donde se añade una nota sin content', async () => {
    const newNote = {
      important: false
    }
    await api
      .post('/api')
      .send(newNote)
      .expect(400) // recordar que cuando añadimos una nota sin content,segun el api que creamos debe devolver un 400,quitamos tambien al apl/json

    const response = await api.get('/api')

    expect(response.body).toHaveLength(initialNotes.length) // esperamos que tenga la longitud de las notas iniciales ya que no se enviara la nueva nota
  })
})

// test de un delete
test('eliminando la primera nota', async () => {
  const { response } = await getAllContentdeNotas() // traemos el response para saber el id de una nota
  const noteDelete = response.body[0] // del response necesitamos su body(aca esta el arreglo de notas-recordar que antes del test borramos las notas originales y lo reemplazamos con dos notas), de esa nota entramos a la 1 posicion,y ahi sacaremos el id de la primera nota para su eliminacion

  await api.delete(`/api/${noteDelete.id}`).expect(204) // despues de eliminar una nota espero la respuesta 204(no content)

  const { response: segundoResponse, contents } = await getAllContentdeNotas() // aca se llama otra vez para ver si se ha eliminado la nota pero como al response ya lo habiamos llamado antes,ahora sale un error.se soluciona renombrandolo
  expect(segundoResponse.body).toHaveLength(initialNotes.length - 1) // despues de llarmar a las notas espero que la longitud de su body sea como de la notainicial descontando -1 ya que lo eliminamos anteriormente
  expect(contents).not.toContain(noteDelete.content) // espero que el arreglo de contenidos de las notas no contengan el content de la nota que iba a eliminar
})

test('ver si hay falla al pasar una id que no existe', async () => {
  await api.delete('/api/2343').expect(400) // expero que de un 400 que sig. bad request

  const { response } = await getAllContentdeNotas()
  expect(response.body).toHaveLength(initialNotes.length) // espero que contenga las notasiniciales ya que no se elimino nada
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
// ver la doc de supertest,hacer un test de la api
// crear un get y al estar llamando una api se supone que es asincrono
// en la consola saldra unos console log al hacer el test-para quitarlo agregar al script de test en el pk.jso el --silent
// en la consola te recomiendan poner el --detectOpenHandles al pkjson test- al hacr esto me salia 3 handle error-uno del get -otro del app.listen-otro de mongoose.connect
// para arreglar el 1 se crea un const server en el index donde estara el app.listen y se exportara al notest.test
// despues de hacer los test se creara un hook beforeall(all es si quieres que se ejecute una vez para todos los test y each se ejecuta antes de cada test,este es mejor si el test hace un cambio al beforeoriginal) donde este se ejecutara despues de hacer el test - ahi se cerrara el server puerto app listen despues de todos los test
// traer el mongose y cerrar la conexion
// se me borro el error de mongose.conect al añdir como segundo parametro al mongose.connect el {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
// }  al borrar esos dos que me daban error anteriormente(usefind,usecreated) -me seguia saliendo en el test el mongoose error
// para no estar ejecutando el npm run test se crea otro script - test:watch- //el segundo -- se refiere al valor test creado anteriormente o lo de mas adentro de npm run test
// para que no aparezca en el console el average y el palindrome ,en sus archivos se agrega un skip
// en el video tenia una nueva base de datos que estaba en el env-crearlo en el mongodb -agregar las notas con robo3t-problema: al crear una nueva base de datos en robo3t no se agregaba-tuve que agregar desde mongo db con createbase y en robo3t(recien figuraba la base de datos) ahi recien agregar las notas con db.(nombre de tu coleccnnion,en mi caso notes_test).insert(agregar aqui tu objeto)
// crear un nuevo test para ver cuantas notas hay en el get con el toHaveLength
// habia un problema cuando borramos las notas manualmente desde la base de datos el tohavelength salia el error-para que no ocurra se crea el beforeeach-
// se crea un par de notas y dentro del before llamamos al model note para crear nuevas notas -
// el beforeeach sig. por cada nota se ejecuta ese before es decir si en un test se modifica el app con un post,este beforeeach se ejecuta antes de ejecutar otro test,ya que puede ocurrir un error al hacer otro test con la base de datos modificada por el post del test anterior
// crear otro test para ver si es cierto el tobe de la primera nota- act: crear un arreglo con los contenidos de cada objetonota y ver si esta ahi el contenido que busco
// pero si no sabemos en que posicion esta esa nota, se mapea el body donde devolvera un arreglo de los contents de cada nota,y con el tocontain buscamos la nota que queremos saber
// si quieres hacer un test de solo un archivo,se agrega ese arch. al script luego npm run test- pero si  de ese archivo quieres buscar un test en especifico se pone npm run test -- -t "(el mensaje de tu test)"
// crear un test para el post-tambien crear otro  cuando no enviemos un content
// crear un arch. helper en la carp. test -ahi poner algunas const de este archivo notes para limpiarlo un poco
// como estamos utilizando mucho el response y el mapeo de ese response se pasa tambien al helper y este lo devuelve en una funcion
// ir al index y ahi el app.get como esta devolviendo una promesa con then,pasarlo ahora con async y await
/// crear un nuevo test cuando vamos a eliminar una nota-crear otro cuando le pasemos una id que no exista y haya un error
// ir al index para actualizar el delete con async y await
// arreglar el beforeeach
// poner al afterall ,esto va despues de todoslos test,donde una vez finalizado se ejecuta tofdo lo que esta dentro,en este caso se cierra la conexion de mongose y se cierra el servidor
// todo lo que tenia que ver con get - agruparlo con describe -  quitar tambien el verbose y poner el silent en packjson
