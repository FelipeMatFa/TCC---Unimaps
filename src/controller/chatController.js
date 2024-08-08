const connection = require('../config/db');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Inicialize o cliente com a chave da API
const genAI = new GoogleGenerativeAI("AIzaSyBaQUYs2RMgrYlM7-w_jwMUcIY3ipoRIa8");

async function criarPrompt(request, response) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = request.body.prompt;

        if (!prompt) {
            return response
                .status(400)
                .json({
                    success: false,
                    message: "Prompt não fornecido."
                });
        }

        const result = await model.generateContent(prompt);
        console.log(result)
        const response = await result.response;
        const text = response.text;
        console.log(text);

        const query = 'INSERT INTO prompts (content) VALUES (?)';

        connection.query(query, [text], (err, results) => {
            if (err) {
                return response
                    .status(400)
                    .json({
                        success: false,
                        message: "Ops! Não deu...",
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }

            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!",
                    data: results
                });
        });
    } catch (err) {
        console.error(err);
        response
            .status(500)
            .json({
                success: false,
                message: "Erro interno do servidor."
            });
    }
}

module.exports = {
    criarPrompt
};
