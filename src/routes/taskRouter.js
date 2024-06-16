const { Router } = require('express');
const router = Router();

const { cadastrarUser } = require('../controller/taskController');

router.post('/cadastro', cadastrarUser);

module.exports = router;
