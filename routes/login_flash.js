const router = require('express').Router();

router.get('/', (req, res) => {
    res.send(req.flash('info'));
})

router.get('/create', (req, res) => {
    req.flash('info', 'Sesion flash info creada');
    res.redirect('/login_flash');
})

module.exports = router;