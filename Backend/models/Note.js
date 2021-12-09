const mongoose = require('mongoose')
const { Schema, model } = mongoose

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean, // id no es necesario poque se crea automatic
  user: { // tendra un objetoid con referencia al model user
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})
// cambiando lo que me devuelve el schema
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id // aca se crear otra propiedad id pero que su valor sera el _id
    delete returnedObject._id // aca borrarmos el id y el __v porque no lo necesitamos
    delete returnedObject.__v
  }
})
const Note = model('Note', noteSchema) // de 1 param se pone en singular y la 1 mayus-el model lo convierte todo en minusculas y en plural(esto tiene algo qe ver con las colecciones que creamos en mongodb)-ademas note es como una coleccion

module.exports = Note
// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })
// const note = new Note({
//   content: 'Primera prueba',
//   date: new Date(),
//   important: true
// })

// note.save().then(result => {
//   console.log(result)
//   mongoose.connection.close()
// }).catch(err => {
//   console.log(err)
// })
