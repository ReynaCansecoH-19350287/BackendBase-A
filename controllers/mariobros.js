const { request, response } = require("express");
const pool = require("../db/connection")
const modeloMarioBross = require("../models/mariobros");


const getUsers = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD
    
    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas
        const users = await conn.query(modeloMarioBross.quieryGetUsers, (error) => {throw new Error(error) })
        //Siempre validar que no se obtuvieron resultados
        if (!users) {
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({users})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const getUserByID = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.params

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas
        const [user] = await conn.query(modeloMarioBross.quieryGetUsersByeID, [id], (error) => {throw new Error(error) })
        //Siempre validar que no se obtuvieron resultados
        if (!user) {
            res.status(404).json({msg:`No se encontro registro con el id ${id}`})
            return
        }
        res.json({user})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const deleteUserByID = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {id} = req.query

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        //Esta es la consulta mas basica, se pueden hacer mas complejas en esta se actualizara el usuario
        const {affectedRows} = await conn.query(modeloMarioBross.quieryDeleteUsersByeID, [id], (error) => {throw new Error(error) })
        
        //Siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo eliminar el registro con el id ${id}`})
            return
        }
        res.json({msg: `El usuario con id ${id} se elimino correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

const addUser = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const{
        Personaje,
        Jugable,
        Enemigo,
        Activo
       
    } = req.body

    if (
        !Personaje||
        !Jugable||
        !Enemigo||
        !Activo
       
    ){
        res.status(400).json({msg:"Falta informacion del usuario"})
        return
    }
  
    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()
        
        //Tarea aqui que el usuario no se duplique
       const user = await conn.query(modeloMarioBross.quieryUsersExists,[Personaje])
       
        if(!user){
            res.status(403).json({msg: `El personaje ${Personaje} ya se encuentra registrado`})
            return
        }
            //Esta es la consulta mas basica, se pueden hacer mas complejas en esta se actualizara el usuario
        const {affectedRows} = await conn.query(modeloMarioBross.quieryAddUser, [
            Personaje,
            Jugable,
            Enemigo,
            Activo
        ], (error) => {throw new Error(error)})
        //'${Genero || ''}',
        //Siempre validar que no se obtuvieron resultados
       
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo agregar el registro del usuario ${Personaje}`})
            return
        }
        res.json({msg: `El usuario ${Personaje} se agrego correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
        conn.end()
        }
    }
}

const updateUserByUsuario = async (req = request, res = response) =>{
    //Estructura basica de cualquier endpoint al conectar en su BD este indica el numero estatico
    const {
        Personaje,
        Jugable,
        Enemigo

    } = req.body

    if (
        !Personaje||
        !Jugable||
        !Enemigo   
    ){
        res.status(400).json({msg:"Falta informacion del personaje"})
        return
    }

    let conn;
    //Control de exepciones
    try {
        conn = await pool.getConnection()

        //Tarea aqui que el usuario no se duplique
       const [user] = await conn.query(modeloMarioBross.quieryGetUsersInfo,[Personaje])

       if (!user){
        res.status(403).json({msg: `El usuario ${Personaje} no se encuentra registrado`})
       }
        //Esta es la consulta mas basica, se pueden hacer mas complejas EN ESTA SE ACTUALIZARA EL USUARIO
        //Arreglar esta
        const {affectedRows} = await conn.query(modeloMarioBross.quieryUpdateByeUsuario,[
            Personaje|| user.Personaje,
            Jugable|| user.Jugable,
            Enemigo|| user.Enemigo,
            Personaje,
            ]
            , (error) => {throw new Error(error) })
            //'${Genero || ''}',
        //Siempre validar que no se obtuvieron resultados
        if (affectedRows === 0) {
            res.status(404).json({msg:`No se pudo actualizar el registro del personaje ${Personaje}`})
            return
        }
        res.json({msg: `El personaje ${Personaje} se actualizo correctamente.`})
        //Lo del catch y final siempre sera lo mismo
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}

module.exports = {getUsers, getUserByID, deleteUserByID, addUser, updateUserByUsuario}