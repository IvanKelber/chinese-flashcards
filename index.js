var port = process.env.PORT || 8000

const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json())
app.post('/createWord', (req, res) => {
  store
    .createWord({
      character: req.body.character,
      pinyin: req.body.pinyin,
      definition: req.body.definition,
      particle: req.body.particle
    })
    .then(() => res.sendStatus(200))
})

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
})

var sqlite3 = require('sqlite3').verbose()
