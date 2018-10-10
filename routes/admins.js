var router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json(req.session.username || 'La session no se ha creado');
});

router.get('/create', (req, res ) => {
    req.session.username = 'iruiz';
    res.redirect('/admins');
});


router.get('/remove', (req, res ) => {
    req.session.username = null;
    res.redirect('/admins');
});


router.get('/destroy', (req, res ) => {
    req.session.destroy();
    res.redirect('/admins');
});

module.exports = router;