var express = require('express');
var router = express.Router();

const Films = require('../connection/models/filmsModel');


router.get('/listado', (req, res) => {
  Films.fetchAll( (error, films) => {
    res.render('film-list.hbs', {
      title: 'Listado de películas',
      layout: 'layout-sakila.hbs',
      films: films
    })
  });
});

router.get('/insertar', (req, res) => {
  const FILM = {
    title: 'Es una prueba',
    language_id: 1
  }

  Films.insert(FILM, (error, insertId) => {
    // console.log(JSON.stringify(insertId))

    if(insertId) {
      return res.send('Se ha añadido la película número ' + insertId);
    }

    res.status(500).send('Error guardando la película');
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/inicio', (req, res, next) => {
  res.render('vista.hbs',
  {
    title: '1º Vista',
    page: 'Página variable',
    layout: 'template.hbs'
  });
});

router.get('/pruebas', (req, res, next) => {
  res.render('prueba.hbs', 
  {
    usuarios: [
      {id: 1, name: 'xavi'},
      {id: 2, name: 'pepe'},
      {id: 3, name: 'ivan'}
    ],
    administrador: {
      nombre: 'Ivan',
      apellidos: 'Ruiz'
    },
    appName: 'Prueba',
    layout: 'template'
  });
});


module.exports = router;
