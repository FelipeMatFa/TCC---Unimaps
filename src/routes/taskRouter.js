const { Router } = require('express');
const router = Router();

const { cadastrarUser } = require('../controller/taskController');

router.post('/usuario/cadastro', cadastrarUser);

module.exports = router;
