var express = require('express');
var router = express.Router();
const paginate = require('express-paginate');

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

router.get('/pagination', (req, res) => {
  const page = (req.query.page || 1) - 1;
  const limit = req.query.limit || 20;
 
  const offset = req.skip || page * limit;
 
  Films.paginate(offset, limit, (error, result) => {
    if(error) return res.status(500).send(error);
    else {
      
      const currentPage = (offset === 0) ? 1 : (offset/limit) + 1;
      const totalCount = result.count[0].total;
      const pageCount = Math.ceil(totalCount/limit); 
      const pagination = paginate.getArrayPages(req)(limit, pageCount, currentPage);

      
      // res.send({page, limit, offset, result, currentPage, totalCount, pageCount, pagination})
      res.render('pagination', {
        films: result.rows,
        currentPage,
        links: pagination,
        hasNext: paginate.hasNextPages(pageCount),
        pageCount
      });
    }
  });
});

module.exports = router;