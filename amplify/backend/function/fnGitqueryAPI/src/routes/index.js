const { Router } = require('express');

/** @type {Router} */
const router = new Router();

router.get('/issues', (req, res) => {
  res.json({ ok: 'teste' });
});
