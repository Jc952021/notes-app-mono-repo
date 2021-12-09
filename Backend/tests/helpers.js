const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')
const api = supertest(app)

const initialNotes = [
  {
    content: 'primera nota',
    important: true,
    date: new Date()
  },
  {
    content: 'segunda nota',
    important: true,
    date: new Date()
  }
]

const getAllContentdeNotas = async () => {
  const response = await api.get('/api')
  const contents = response.body.map(note => note.content)
  return {
    response,
    contents
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getAllContentdeNotas,
  getUsers
}
