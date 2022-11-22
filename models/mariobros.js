const modeloMarioBross ={
quieryGetUsers: "SELECT * FROM MarioBros",

//Se sustituye cada elemento del arreglo por cada signo de interrogacion, y se acomodan en el orden respectivo
//Si se usa 2 veces se pasa las 2 veces
quieryGetUsersByeID: `SELECT * FROM MarioBros WHERE ID = ?`,
quieryDeleteUsersByeID: `UPDATE MarioBros SET Activo = 'N' WHERE ID = ?`,
quieryUsersExists: `SELECT Personaje FROM MarioBros WHERE Personaje = ?`,
quieryAddUser:`INSERT INTO MarioBros (
    Personaje,
    Jugable,
    Enemigo,
    Activo
    ) VALUES (
    ?,
    ?,
    ?,
    ?
    )`,

quieryGetUsersInfo: `
SELECT Personaje, Jugable, Enemigo
FROM MarioBros
WHERE Personaje = ?`,

quieryUpdateByeUsuario: `
UPDATE MarioBros SET 
Personaje = ?,
Jugable = ?,
Enemigo =?
WHERE Personaje = ?
`
}

module.exports = modeloMarioBross