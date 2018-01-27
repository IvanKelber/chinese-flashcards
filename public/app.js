const CreateWord = document.querySelector('.CreateWord')
CreateWord.addEventListener('submit', (e) => {
  e.preventDefault()
  const character = CreateWord.querySelector('.character').value
  const pinyin = CreateWord.querySelector('.pinyin').value
  const definition = CreateWord.querySelector('.definition').value
  const particle = CreateWord.querySelector('.particle').value

  post('/CreateWord', { character, pinyin, definition, particle })
})
function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
