import axios from 'axios'
const baseUrl = '/api/login'

const login = async (objUser) => {
  const peticion = await axios.post(baseUrl, objUser)
  return peticion.data
}

export default { login }

// crear un servicio donde se recibe un objeto con el username y el password, y se postea al api/login
// se exportara un objeto donde tendra todos los servicios y al momento de recibir la importacion,ahi se pone el nombre que quieres poner al objeto ya que lo estamos exportando como default y el .login - ir a app
