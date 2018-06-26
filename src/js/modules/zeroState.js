const zeroState = {
  init: function() {
    if(document.querySelector('.zeroState button')) {
      this.hideZeroState()
      this.showZeroState()
      this.checkZeroState()
    }
  },
  showZeroState: function() {
    document.querySelector('header span').addEventListener('click', () => {
      document.querySelector('.zeroState').classList.remove('inactive')
    })
  },
  hideZeroState: function() {
    document.querySelector('.zeroState button').addEventListener('click', () => {
      document.querySelector('.zeroState').classList.add('inactive')
    })
  },
  checkZeroState: function() {
    if(zeroState.select.title.value !== '' || zeroState.select.author.value !== '' || zeroState.select.language.value !== 'none' || zeroState.select.age.value !== 'none' || zeroState.select.year.value !== '') {
      document.querySelector('.zeroState').classList.add('inactive')
    }
  },
  select: {
    title: document.querySelector('#title'),
    author: document.querySelector('#author'),
    language: document.querySelector('#language'),
    age: document.querySelector('#age'),
    year: document.querySelector('#year'),
  }
}

export {
  zeroState
}
