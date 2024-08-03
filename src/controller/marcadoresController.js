const connection = require('../config/db');

async function marcarLugar(request, response){
    const params = Array(
        request.body.titulo,
        request.body.descricao,
        request.body.suaLatitude,
        request.body.suaLongitude,
        request.body.id
    );

    const query = "INSERT INTO marcadores(titulo,descricao,latitude,longitude,id_usuario) VALUES(?,?,?,?,?)";

    connection.query(query, params, (err, results) => {
        if(results){
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops! Não deu...",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

async function listarLugares(request, response){
    const id = request.query.id; // Obtendo o parâmetro id da query string
    const params = [id];
    
    const query = "SELECT * FROM marcadores where id_usuario = ?";

    connection.query(query, params, (err, results) => {
        if(results){
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops! Não deu...",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

module.exports = {
    marcarLugar,
    listarLugares
}
