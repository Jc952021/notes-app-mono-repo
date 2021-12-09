import axios from 'axios'
// const baseUrl = 'https://whispering-brushlands-01617.herokuapp.com/api'
const baseUrl = '/api/notes'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  // const nonExisting = {
  //   id: 10000,
  //   content: 'This note is not saved to server',
  //   date: '2019-05-30T17:30:31.098Z',
  //   important: true,
  // }
  // return request.then(response => response.data.concat(nonExisting)) //acaa le añade una nueva nota cuando se hace un get
  return request.then(response => response.data)
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }

// recibimos el token donde ira en el headers authorization junto con el bearer,si quieres puedes crear la config aparte o ponerlo defrente al post
// ahora probar logeando un usuario y crear una nota
// en este servicio para no estar enviando a cada rato el token por el parametro,se crea una const con su funcion donde se exportara al app-ir ahi

// ya que tenemos el token,modificar el headers con el token y agregar al update tambien otro config-probar si quieres
// ir al app
