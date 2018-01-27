const knex = require('knex')(require('./knexfile'))

module.exports = {
  createWord ({ character, pinyin, definition, particle }) {
    console.log(`Add word ${character}, ${pinyin}, ${definition}, ${particle}`)
    return knex('words').insert({
      character,
      pinyin,
      definition,
      particle
    });
  }
}
