const connection = require('../config/db');

async function marcarLugar(request, response){
    const params = Array(
        request.body.titulo,
        request.body.descricao,
        request.body.localizacao
    );

    const query = "INSERT INTO marcadores(titulo,descricao,localizacao) VALUES(?,?,?)";

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

// async function listarLugares(request, response) {    
//     const email = request.body.email;
//     const query = "SELECT email, senha, nome FROM usuario WHERE email = ?";
  
//     connection.query(query, email, (err, results) => {    
//       if(results) {
//         const password = request.body.senha;
//         const passwordQuery = results[0].senha;
  
//         if (password === passwordQuery) {
//           response
//             .status(200)
//             .json({
//               success: true,
//               message: "Sucesso!",
//               data: results
//             })
//         } else {
//           response
//             .status(400)
//             .json({
//               success: false,
//               message: "Sem Sucesso!",
//               data: err
//             })
//         }
//       }
//     })
// }  

module.exports = {
    marcarLugar
    // listarLugares
}