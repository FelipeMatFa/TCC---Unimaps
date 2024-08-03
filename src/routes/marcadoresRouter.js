const express = require("express");
const router = express.Router();

const { marcarLugar, listarLugares } = require('../controller/marcadoresController.js');

router.post('/marcarLugar', marcarLugar);
router.get('/listarLugares', listarLugares);

module.exports = router;