const express = require("express");
const router = express.Router();

const { marcarLugar } = require('../controller/marcadoresController.js');

router.post('/marcarLugar', marcarLugar);

module.exports = router;