exports.up = function (knex) {
  return knex.schema.createTable('words', function (t) {
    t.increments('id').primary()
    t.string('character').notNullable()
    t.string('pinyin').notNullable()
    t.string('definition').notNullable()
    t.string('particle').notNullable()
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('words')
}
