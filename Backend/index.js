// const http=require("http")
// const app = http.createServer((req,res)=>{
//   res.writeHead(200,{"Content-type":"text/plain"})
//   res.end("hola xdd")
// })
require('dotenv').config()
require('./mongo') // se pone aqui para que ejecute la conexion a mongoose

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
// con express
const express = require('express')

const cors = require('cors')
const app = express()

const Note = require('./models/Note')
const User = require('./models/User')

const logger = require('./loggerMiddleware')
const NotFound = require('./middleware/NotFound')
const HandleError = require('./middleware/HandleError')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const userExtractor = require('./middleware/userExtractor')

// ahora app va a usar, soportar un objeto json para parsearlo y devolverlo al req.body
app.use(express.json())
app.use(cors())
// expres estatico
// app.use(express.static('images'))
// // en la ruta se pondra localhost3001/(aca el nombre de la imagen) pero si quieres poner la ruta de tu carpeta se pone el codigo de abajo
// app.use('/images', express.static('images')) // https://expressjs.com/es/starter/static-files.html
app.use(express.static('../Fronted/build'))

Sentry.init({
  dsn: 'https://773851969d604de0b9d8a1f8eef25197@o1036857.ingest.sentry.io/6004506',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
// app.use((req, res, next) => {
//   console.log(req.method)
//   next()// pasara al get hola de abajo
// })
app.use(logger) // traemos aca la funcion importada

// midlewares de sentry
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

// app.get('/', (req, res) => {
//   // el 1 param es la ruta
//   res.send('<h1>Hxd</h1>')
// })

app.get('/api/notes', async (req, res) => {
  // Note.find({}).then(notes => {
  //   res.json(notes) // aca responde un json
  // })
  // modo async
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  res.json(notes)
})

app.get('/api/notes/:id', (req, res, next) => {
  const id = req.params.id // aca venia el numero en un string y no en number por eso abajo en find no encontraba una coincidencia-se pude poner dentro de un Number// act. quitar ahora el number
  Note.findById(id).then(note => {
    // se puede añadir algo basico cuando sale un error
    if (note) {
      res.json(note)
    } else {
      res.status(404).end() // esto manda un status 404 que es error y termina con un end()
    }
  }).catch(err => {
    next(err) // se crea un nex para que vaya al midleware que es el app.use
  })
})

app.put('/api/notes/:id', userExtractor, (req, res, next) => {
  const note = req.body
  const id = req.params.id

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    res.json(result)
  }).catch(err => next(err))
  // ese result es la nota con ese id 6yy(que has puesto) y no lo que hemos actualizado,para que te devuelva el nuevo valor se pone un 3 parametro
})

// con delete.
app.delete('/api/notes/:id', userExtractor, async (req, res, next) => {
  // const id = req.params.id
  // Note.findByIdAndDelete(id).then(result => { // es recomendable usar el delete,si quieres hacer un res.json(result)-no devuelve nada
  //   res.status(204).end() // puedes ver aqui tipos de error https://http.cat/ en este caso ponemos el de no content
  // }).catch(err => {
  //   next(err)
  // })
  const id = req.params.id
  try {
    await Note.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.post('/api/notes', userExtractor, async (req, res, next) => {
  const { content, important = false } = req.body // aca llega lo que le envian en el post, act: ahora destructuro el content y el important por defecto sera false
  // console.log(note)
  // sacar el user id del request- importar el userextractor
  const { userId } = req // este userid lo agregamos en el userextraxtor
  // buscar el usuario con el userid
  const user = await User.findById(userId)
  // console.log(user)

  // aca hacer que el content de la nota que envie el usuario sea requerido
  if (!content) {
    // si note o note.content no existe, act: ahora sera si content no existe
    return res.status(400).json({
      // devuelvo(aca va el return para que acabe la funcion de aqui y no siga para abajo-tambien notar que no puso el else) un status 404(esto es cuando se crea mal un recurso )
      error: 'note.content is missing' // y se devuelve un objeto json
    })
  }
  // crear un id para enviar
  // const ids = notes.map((note) => note.id) // aca por cada nota que me devuelva su id
  // const maxId = Math.max(...ids) // aca me trae el maximo numero de todo lo que tenia dentro la const ids que es un arreglo
  // ahora para crear una nueva nota
  const newNote = new Note({
    content, // recordar que en note ya viene parseado lo que le envio el usuario
    important, // typeof note.important !== 'undefined' ? note.important : false, // typeof sig. tipo de es decir si el tipo de lo que le pase es diferente de undefined,significa que le pase un true o flase,entonces sera lo que envio si no por defecto false,eso quiere deicr que no envio ningun important,ya que el tipode es si no envias nada es undefined , act: ahora solo se pondra el important
    date: new Date(), // .toISOString() // esto devuelve una fecha en formato iso
    user: user._id
  })
  // newNote.save().then(savedNote => { // se guarda las notas con save,devuelve una promesa donde responderemos con esa misma nueva nota
  // res.json(savedNote)
  // }).catch(err => next(err))
  // notes = [...notes, newNote] // ahora para actualizar las notas sera una copia de todas las notas agregando la nueva nota
  // res.status(201).json(newNote) // se devuelve al usuario la nueva nota y el status 201 que sig. creado

  try { // try significa intenta esto
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id) // del usuario encontrado concatenarlo(creo que lo agrega) , el id de la nota guardada
    await user.save()

    res.status(201).json(savedNote)
  } catch (err) { // si no puede, que envie el next
    next(err)
  }
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') { // por alguna razon el node env esta en en process.env
  const testingRouter = require('./controllers/testing') // si se cumple entonces se trae el nuevo controlador
  app.use('/api/testing', testingRouter)
}

// usando un use-este es bueno usarlo cuando el usuario ponga una ruta inexistente y salga este error
app.use(NotFound)
// midleware de sentry
app.use(Sentry.Handlers.errorHandler())
// se crea un nuevo midleware si no encuentra el id de una nota
app.use(HandleError)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log('SERVER RUNNING')
})
module.exports = { app, server }
// ps1 iniciar con npm init -y
// crear un script en pk.json npm star node index.js
// ver los comandos con npm run
// instalar nodemon para no estar haciendo ctrl c para cerrar el proyecto y luego abrirlo,
// pero recommiendan instalar como modo desarrollador npm i nodemon -D.para usarlo en la consola apretar nodemon y tu archivo
// si queremos agregar un script a nodemon se pone "dev":"nodemon tu archivo"- ahora e usara npm run dev
// ps2 instalar npm i express- el ^ actualiza lo que instalaste cuando sale una nueva version pero si en un 0.0.8-solo actualizara el ultimo numero- para instalar uno sin el ^ se pone un -E al final de tu npm i algo -E
// version lens es una extension que te dice si una dependencia tiene una version actualizada
// crear un app pero con delete
// pero para usar el delete usar el postam o el insomnia,pero en visualcode se puede usar una extension rest client-crear una carpeta reques y un archivo.rest-ir ahi
// usar ahora el post-crear otro .rest de post donde enviaremos un objeto-pero este no la acepta ya que es un json-para que lo acepte y lo parsee se usa un comando de express
// al postear puedes probar borrando el important,te debera salir en false ya que lo configuramos asi arriba en el typeof
// al hacer los post ,ver en el get lo agregado
// ps3 usar npm i eslint -D- usar tambien en el com. ./node_modules/.bin/eslint --init - escoger la 3-lg escoger la 3 porque estamos usando el require-lgt el none -no-node(me escogio el browser)-answer questioj-javascr-espacios-uso el double-windows-no semicolons
// descargar la etendsion eslint-para que te muestro los errores en una misma linea descarga errorlens-ir a eslint y configurarlo en la ruedita
// aw añade al settings.jsoon "editor.codeActionsOnSave": {
//   "source.fixAll.eslint": true
// },
// crear un script en el pakjson- ./node_modules/.bin/eslint .(este es para el comando)  ese punto al final sign que es el archivo actual donde estoy o puedes poner el name de tu archivo
// en el archivo eslint cambiar en indent a 2

// en google buscar github standard(creo que es como una configuracion de eslint) - usar npm i standard -D-borrar el eslint del packjs y eliminar el carret de standart-borrar el arch. eslintrc y en el pack agregar un eslintconfig
// midleware es una funcion que intercepta lo que esta pasando a tu api. app.use recibe cualquier peticion(get,delete,put,etc),si no tiene path recibe todas las rutas-de param se le puede poner un next, esto es cuando no tienes nada que responder osea el res y pasa al siguiente app
// se crea otro arch. donde tendra una funcion para importar- como va a ser comonnjs tiene otro tipo de exportado y para importarlo aca tambien es otro tipo
// ps 4 clonar su repositorio git clone https://github.com/midudev/notes-app-full-stack-bootcamp.git pero para que salga el del video, en el bash se pone git checkout 99c8f7f8dc0d93fa60e1ef11b755c6b9e465d7e2  (este es un commit pasado)
// en services-notes.js del project clonado, ahi se configura la const baseurl con la ruta de tu api , en mi caso termina con/api
// al hacer un get a la api hay un problema de cors(creo que sig. que no se puede pasar algunos archivos entre servidores o nuestr api no permite que le hagan un request)- instalar npm i cors -E (el e es version exacta)-traerlo con require y que el app lo use- para ver mas de cors buscar cors express
// ps 5 crear un repositorio-hacer un git bash a la carpeta de tu api-añadir commit(no se porque)-git add .crear el archivo .-el prof se equivoco y añadio el node_modules-hacer un git checkout . -git reset . .gitignore-ahi añadir al node_modules-git checkout para comprobar-añadir el commit-usar el git branch _M main-añadir el gitremoteadd-luego el push
// ps 6 crear un archivo Procfile -poner ahi unos codigos:el 1 es que tipo de recurso quiere deployar,el 2 como inicia el proyecto
// instalar herocku cli(entar a su pagina -ahi te dira los pasos para logear)-en el index para que herocku tenga el puerto que quiera se pone process.env.PORT o el puerto que queramos
// crear la aplicacion de herocku - poner en la terminal bash de tu archivo heroku create-saldra un link de la app()es el 1 link)-ver en git remote lo que ha creado-ver tambien el fetch (git remote show heroku)
// hacer un nuevo git add. para añadir el procfile -commit-poner solo el git push ya que antes lo configuramos para qqe se vaya al origen del github
// ya añadidoal github poner el comando git push heroku main para añadirlo al heroku-- al final te saldra el link donde hizo el deploy-en notes puedes cambiar donde se hace el get a la nueva url de heroku en mi caso es https://whispering-brushlands-01617.herokuapp.com/api

// video aprende mongodb
// entrar en google a mongodb -crear el cluster-connect-escoger node-ultima version
// descargar robo 3t darle en create-en el url poner el codigo que te dio mongo-agregar un nombre(donde dice myfirst) a ese link y el password(lo puedes ver en la pag de mongo-databseacees-si quieres puedes cambiar el password)-click en from uri-haciendo esto recupera toda la informacion-save
// conectar-entrar a la carp. replica set y doble click en el servidor con icono p de primario-te saldra una terminal donde puedes poner show dbs donde te mostrara las bases de datos-usar la base de datos que has creado-teclear use (tu base de datos)(este es el nombre de tu base de datos que has puesto en el link al momwnto de crear-en mi caso era notes-mongo pero al darme cuenta ya estaba en esa base de datos-puedes verlo arriba an la barra de nav.)
// crear en el comando db.createCollection("nombre") - por regla el nombre debe ser en plural todo minusculas-click der. refresh-saldra la base de datos con la collection
// para insertar un tipo json a la collecion se pone db.(nombre de la coleccion).insert(aqui el objeto json)-si pones un nombre de coleccion sin haber creado antes,este lo crea automaticamente sin necesidad de createcolection-al añadir un obj json tampoco es necesario crear un id porque mongo te añade uno
// al poner solo el db.(tucolecion).find() este busca todas lo que has insertado en esa coleccion
// tambien puedes buscar de lo que has insertado un atributo especifico, db.(tucolecion).find({user:"@probador"}) , te devolvera el objeto en la que se encuentra este atributo
// si quieres actualizar un documento es db.(tucoleccion).update({user:"@xd"},{$set:{user:"@xd2"}})   , el 1 param. va  el atributo que quieres buscar, en el 2 para actualizar se pone el $set con el atributo actualizado, con el set los demas atributos quedan como estan pero se actualiza solo el atributo que has puesto
// en la pag. de mongo entrar en database acces y crear tu cuenta-en network poner que ntre todas las ips- (al momento de conectar la base de datos ya me habia pedido antes esto,se puede editar en el de ip para que entre todas las ips)

// video de mongoose //mi contra es pruebamongo2 pero por alguna razon en mongodb figura como pruebamongo
// instalar mongose al backend npm i mongoose(eliminar los carets)
// crear un arch.mongose donde tendra el require de mongose,copiar el string de mongo que te dio al connectar donde debes poner tu password y el cambiar el myfirstdate-ir ahi

// borrar la const notes de index,con modules solo se importan una vez-para ejecutar todo dentro de un archivo se pone require con el archivo sin el js-importar tambien el modelo note
// con el model importado hacer cambios a los app get,post,etc-para ver los cambios puedes verlos en el request(recordar antes tienes que iniciar en la api con npm run dev y estar al tanto de que numero es tu puerto)
// queremos mapear el note para borrar el id y el __V pero no se podra ya que vendra en un toJSON,para cambiarlo se debe hacer desde el schema-ir ahi
// ahora usaremos las variables de entorno- el port ya utilizaba eso(el process.env)-podemos enviar esa variable en la consola- PORT=3003 npm run dev(ahora el puerto tendra el port3003)
// cRear un archivo env donde estara la const puerto y la url de mongo, e importarlo con process.env.(nombre de la const donde esta guardado la info)-pero para que funcione se descarga npm i dotenv-luego traerlo como require en el index-nota poner el arch. env al gitignore
// actualizar el post-borrar algunas cosas y probarlo en el request
// con el get id actualizarlo,al buscar con find el id,mas rapido lo puedes hacer con findbyid y al const id quitarle el number porque ahora el mongose puede recibir un string
// al no encontrar una nota con el id que se diriga al mdleware app.use(recordar que cuando enviamos un err dentro de un next,este ira al app use que tenga los 4 parametros)
// pasar al delete y actualizarlo
// crear un put para actualizar la nota y un request-agregar luego el use de 404 para que cuando busques una ruta que no existe(local3001/csdfcsd) vaya al 404- los 404 es bueno ponerlos al final
// es buena practica crear una carp.midleware y pasar el lo que ibas a poner dentro del app.use e importarlo aca
// ir a sentry io (es una pagina que detecta errores)-crear un proyecto en express-copiar el sentry init y pegarlo aqui-importar el sentry con require,etc-instalarr npm install --save @sentry/node @sentry/tracing (al momento de crear un proyecto te dice los comando que poner)
// en la doc. hay 2 midleware que se pega antes de las rutas-hay otro que se pone despues de las rutas y antes de tu midleware(el notfound no es un midleware principal)
// cuando colocas una id mal, en la pag de sentry te llevara a ese error
// en mongo.js se crear un codigo para desconexion
// para ver archivos estaticos como imagenes,css,js,etc 1 se crea una carpeta imagen-pegar ahi la imagen-luego aqui se pone un codigo de express

// video test
// crear carp-test-arch-suma-test- crear ahi un console.assert(si el 1 parametro es false entonces imprimira el 2 parametro)(es como una prueba si quieres crealo)-se prueba en la consola con el node (tu archivo)
// crear otra carp-utils-arch-for_testing-crear dos funciones para testear-uno de palindrome donde recibe un string y otro de saber su numero medio pasandole un array
// instalar npm i jest -D
// en el pk.json crear una nueva configuracion para el jet,que sera su servidor de entorno donde ahi se haran los test
// jest por defecto busca los archivos que terminan en .test.js-crear un archivo-ir ahi
// salia un error de eslint al poner codigo de jest,ir a pkjson y agregar a eslintconfig un env(entorno) donde aceptara el eslint al jest (omitir esto si no utilizas eslint)
// para iniciar el jest-crear un script test y ejecutar ahi el jest --verbose(sg. que dara toda la informacion)
// crear un archivo average donde se testeara la funcion de average-ir ahi

// video testing backend
// en los script hay varios entornos-agregar entornos ahi-pero en windows no funciona los entornos-instalar npm i cross-env y agregar al comienzo el entorno cross-env
// hacer test desde otra base de datos-crear otra url en env pero con otro nombre de base de datos -debemos crear otra base de datos en mongodb-agregar archivos con roboto
// luego en el arch.mongo para que use la url correcta se extrae las url de .env para hacer un ternario(recordar que cuando haces un test,este debe ejecutar la url de la base de datos de test y no de la produccion)
// para probar los endpoints se instala npm i supertest -D
// crear un archivo test notes - ir ahi
// actualizando con async al get,post- regresar al notest.test
// -- actualizar el delete con async - en el video no le puso un catch pero a mi me salia error ,al colocarlo se fue el error-regresar al notes-test

// video crear usuarios
// crear un arch en models user.js-ir ahi
// crear controladores ,con estos controladores se puede usar los app fuera del index-crear carp. controller-arch users--tambien crear aqui un app que use al usersrouter(importarlo)- ir a users

// video tdd
// crear un nuevo test cuando creamos un nuevo usuario, y ese usuario ya esta en la base de datos-ir a user.test

// video relaciones entre colecciones
// ir a controler users
// actualizar el post de api-notas, destructurando lo que enviamos al post ,usar ese userid para buscar en el modelo de user,al usuario con el id que le hemos pasado al post,
//  y al momento de crear la nota con el new note,agregar una prop user-donde su valor sera el user id que hemos buscado con el findbyid,pero como solo queremos el id de ese user y este no esta en un toJson, se le agrega el _id o puedes hacer un user.toJSON().id
// como la nota ya tiene su usuario id por otro lado el usuario debe tener el id de esa nota creada,ponerlo despues de guardar esa nota
// ir a post note donde ahora agregaremos una userid con el id de un usuario valido(ver en mongodb)-me salia error al postear (el problema era del mongose validator-tenia que borrarlo),pero en el de practica me funcionaba normal(creo que en prueba lo instal e sin el --save y el el de prac le puse --save al instalar). act: probe el de prueba con el validato-uniqque y ahora si funciono
// act: al crear dos usuarios y crear otra nota para ese usuario me salia error,la sol. era borrar de nuevo el validator
// borrar de la base de datos de mongodb las notas y los users -luego postear un nuevo usuario y una nueva nota
// ir a users.js

// video json web tokens
// crear un controller login-ir ahi
// regre de login - traer el require de jsonwet- ir donde se api/notes-crear una const auth. -como el token se enviara desde una http autorization recibirla ahi con un get
// despues de poner todo el el post api/notes-ir al post_notes-rest
// ahora como enviamos el authorization con el bearer token ,y en el api/notes tenemos decodificado el token - act:esto ahora se fue al userEXtractor
// despues de todo la decodificacion abajo se busca el user con el id,pero como el id lo podemos sacar del decodificado,hay que destructurarlo,probar enviando una nota
/// / el prof queria borrar el try catch del decodedtoken poniendolo solo en un const,pero a el lo llevaba al next con el error, a mi no me enviaba nada
// lo arregle asi :
// let decodedToken = {}
//   jwt.verify(token, process.env.SECRET, (e, decoded) => {   decoded es la rpta decodificada
//     console.error({ e })
//     console.log('hola')
//     if (e) {     este podia ser null
//       next(e) // este next se dirige al handleerror
//     } else {
//       console.log(decoded)
//       decodedToken = decoded
//     }
// pero mejor lo deje con try y catch
// ir a handleerror.js
// importar el userextractor-este se agrega al costado de api/notes,donde se ejecutara de izquierda a derecha ademas esto sirve para almacenar el userid en el req
// agregar el userextractor al delete y el put - termina el video

// video sesion de usuario ir a la carpeta index de midunote

// viniendo de crear un controlador testing-añadirlo debajo de los otros controladores pero para que no tengan acceso facilmente a esto,se crea un if-ir al notespec.js
