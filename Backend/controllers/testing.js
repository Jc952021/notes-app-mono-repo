const Note = require('../models/Note')
const User = require('../models/User')
const testingRouter = require('express').Router()

testingRouter.post('/reset', async (req, res) => {
  await Note.deleteMany({}) // deletemany elimina segun lo que le pasemos , en este caso es un objeto vacio que significa todos los objetos que tiene dentro
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = testingRouter

// se crea un nuevo controlador que elimina todas las notas y users de la base de datos
// importar este controllador a index.js-ir ahi
