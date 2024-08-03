const connection = require('../config/db');

async function marcarLugar(request, response){
    const params = Array(
        request.body.titulo,
        request.body.descricao,
        request.body.suaLatitude,
        request.body.suaLongitude
    );

    const query = "INSERT INTO marcadores(titulo,descricao,latitude,longitude) VALUES(?,?,?,?)";

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
    // const params = Array(
    //     request.body.id
    // )
    const query = "SELECT * FROM marcadores";

    connection.query(query, /* params, */ (err, results) => {
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