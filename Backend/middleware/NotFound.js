module.exports = (req, res) => { // el use creo que tambien se pone al final de todos los app.algo ya que al  no encontrar una ruta va a este
  console.log(req.path) // la ruta que ha puesto el usuario
  res.status(404).end()
}
