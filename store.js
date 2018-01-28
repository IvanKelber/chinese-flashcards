const knex = require('knex')(require('./knexfile'))
var npinyin = require('node-pinyin');

module.exports = {
  createWord ({ character, definition, particle }) {
    console.log(`Add word ${character}, ${definition}, ${particle}`)
    var pinyin = npinyin(character).join(' ');
    console.log(pinyin)
    return knex('words').insert({
      character : character,
      pinyin : pinyin,
      definition : definition,
      particle : particle
    })
  },
  getWords() {
    knex.select('character','pinyin', 'definition', 'particle').from('words')
    .then(function(words) {
      console.log(words);
    });
  }
}
