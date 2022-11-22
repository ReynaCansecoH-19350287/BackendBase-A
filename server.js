const express = require('express') 
const messagesRouter = require('./routes/messages')
const usuariosRouter = require('./routes/usuarios')
const mariobrosRouter = require('./routes/mariobros')
const cors = require("cors")

class Server{
    constructor(){
      this.app = express()
      this.paths = {
         messages:"/api/v1/messages",
         usuarios:"/api/v1/usuarios",
         mariobros:"/api/v1/mariobros"

        }
        this.middlewares()
        this.routes()
      
    }

routes(){
    
  //this.app.get('/', (req, res) => {
    //res.send('Hello World')
    //  }
    this.app.use(this.paths.messages, messagesRouter)
    this.app.use(this.paths.usuarios, usuariosRouter)
    this.app.use(this.paths.mariobros, mariobrosRouter)
}

middlewares() {
  this.app.use(cors()) //Permite solicitudes de origen cruzado//
  this.app.use(express.json()) //Habilita la lectura de contenido en formato JSON//
}

listen(){
    this.app.listen(process.env.PORT,() => { //Poner un this aqui xd//
    console.log("Servidor corriendo en el puerto", process.env.PORT)
})
}
}

module.exports = Server
