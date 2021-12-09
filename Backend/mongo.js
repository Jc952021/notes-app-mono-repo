const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// conexion a mongodb, este devuelve una promesa
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connected')
}).catch(err => {
  console.error(err)
})
// para ver en el node se pone node mongo.js
// para desconectar una conexion de mongo
process.on('uncaughtException', () => { // si quieres agregar un error - console.error(error)
  mongoose.disconnect()
})
// en el video como 2 param de mongose.conect le añadio un objeto con algunas cosas para que no salga deprecated,pero en mi caso no salio,lo añado por si acaso
// al ponerlos me salia error con el usefind y el usecreateindex,los demas no sale error,mejor probare sin añadir nada
// crear una const esquema(es como que tipo de doc. guardaremos en una coleccion)-osea el esquema de todas las notas(docs) que iran en la coleccion(model)
// crear otra const de modelo,destructuralo en mongose- de ese modelo crear una nueva nota y guardarlo con save() en la base de datos
// mongose siempre devuelve una promesa, al ser verdadero hay que cerrar la conexion-probar ahora con node mongo.js para ver lo que sale en la terminal-me salia como el video pero el id me salia con un newobject
// el model note tambien te permite ver que has añadido a la base de datos con find-,pero primero comenta cuando has creado la nueva nota y el save()
// otra forma de ver es entrar a mongodb en cluster-brwse collections(ahi veras las colecc. que has creado)-en mongodb borrar la bd ntes y cambiar de nombre en mongo.js por el nombre de bd que tenias antes
// crear una carpeta models-arch notes donde pondremos el esquema creado ,el modelo note de este arhivo mongo.js y los demas para tenerlo como referencia-luego exportarlo desde ahi
