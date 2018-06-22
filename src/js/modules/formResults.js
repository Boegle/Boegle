import{socket} from './socket.js'

const bookForm = {
  init: function() {
    if(document.querySelector('form')) {
      bookForm.select.inputs.forEach(input => input.addEventListener('change', (e) => bookForm.search(e)))
      bookForm.select.selects.forEach(select => select.addEventListener('change', (e) => bookForm.search(e)))
    }
    socket.init()
  },
  select: {
    inputs: document.querySelectorAll('#bookInfo input'),
    selects: document.querySelectorAll('#bookInfo select'),
    checkboxes: document.querySelectorAll('.cover:last-of-type input'),
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    language: document.querySelector('#language'),
    age: document.querySelector('#age'),
    year: document.querySelector('#year'),
    illustrator: document.querySelector('#illustrator'),
    illustrations: document.querySelector('#illustrations'),
    publisher: document.querySelector('#publisher'),
    pages: document.querySelector('#pages'),
    summary: document.querySelector('#summary'),
    coverColor: document.querySelector('#coverColor')
  },
  search: function(el) {
    el.preventDefault()
    const genres = []

    bookForm.select.checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        genres.push(checkbox.value)
      }
    })

    const givenSearchValues = {
      url: 'search',
      title: bookForm.select.title.value,
      author: bookForm.select.author.value,
      language: bookForm.select.language.value,
      age: bookForm.select.age.value,
      pubYear: bookForm.select.year.value,
      genres: genres,
      illustrator: bookForm.select.illustrator.value,
      illustrations: bookForm.select.illustrations.value,
      publisher: bookForm.select.publisher.value,
      pages: bookForm.select.pages.value,
      summary: bookForm.select.summary.value,
      coverColor: bookForm.select.coverColor.value
    }
    socket.io.emit('searchValues', givenSearchValues)
  }
}

export {
  bookForm
}
