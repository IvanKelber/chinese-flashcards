var port = process.env.PORT || 8000

const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();
const knex = require('knex')(require('./knexfile'))

app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  console.log("你好");
  res.send("你好");
});

app.get('/home', (req,res) => {
  res.redirect('/');
})

app.get('/table', (req, res) => {
  knex.select('character','pinyin','definition','particle').from('words')
    .then(function(words) {
        res.send(words);
  });
})

app.get('/flash', (req, res) => {
  knex.select('character','pinyin','definition','particle')
    .from('words')
    .orderByRaw('RANDOM() LIMIT 2')
    .then(function(words) {

      res.send(flash(words,0))
  })
})

app.post('/createWord', (req, res) => {
  store
    .createWord({
      character: req.body.character,
      definition: req.body.definition,
      particle: req.body.particle
    })
    .then(() => res.sendStatus(200))
})

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
})

function objToArray(obj) {
    return Object.values(obj);
}

function flash(words, difficulty) {
    var retval = [];
    words.forEach(function(word) {
        retval.push(objToArray(word));
    })
    console.log(retval);
    return retval;
}
