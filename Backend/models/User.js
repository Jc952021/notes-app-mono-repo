const mongoose = require('mongoose')
const { Schema, model } = mongoose
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({

  username: {
    type: String,
    unique: true // le decimos que sea unico
  },
  name: String,
  passwordHash: String,
  notes: [{
    type: Schema.Types.ObjectId, // las notas tendran un arreglo de objetos donde iran dentro un objetid
    ref: 'Note' // que tome de referencia el modelo de Note
  }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash // borrar el password
  }
})

userSchema.plugin(uniqueValidator) // se le agrega esta tambien al schema

const User = model('User', userSchema)

module.exports = User

// ir a nota para que tambien tenga una referencia a user y agregarle tambien un user
// regresar a index

// tdd
// validar el campo username para que sea unico,importar
// ir al controller users para poner un try y un catch
