const { Router } = require('express');
const issuesController = require('../controllers/issuesController');

const router = Router();

router.get('/issues', issuesController.show);

module.exports = router;
