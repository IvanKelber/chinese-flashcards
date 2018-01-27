module.exports = {
  createWord ({ character, pinyin, definition, particle }) {
    console.log(`Add word ${character}, ${pinyin}, ${definition}, ${particle}`)
    return Promise.resolve()
  }
}
