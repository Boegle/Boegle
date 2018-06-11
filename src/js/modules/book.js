const mainBook = {
  init: function() {
    console.log('appelsap')
    document.querySelectorAll('#buttons a').forEach((button) => {
      button.addEventListener('click', this.flipPage)
    })
  },
  flipCount: 0,
  flipPage: function() {
    console.log(mainBook.flipCount)
    if (this.id == 'next') {
      mainBook.flipCount ++
    } else {
      mainBook.flipCount --
    }
    mainBook.actualFlipPage()
  },
  actualFlipPage: function() {
    if (this.flipCount == 1) {
      document.querySelectorAll('.page')[0].classList.add('animation')
      document.querySelectorAll('.page')[1].classList.add('animation')
    } else if (this.flipCount == 2) {
      document.querySelectorAll('.page')[2].classList.add('animation')
      document.querySelectorAll('.page')[3].classList.add('animation')
    } else if (this.flipCount == 3) {
      document.querySelectorAll('#book .page').forEach((page) => {
        // page.classList.remove('animation')
        page.classList.add('animationReverse')
      })
    }
  }
}

export {
  mainBook
}
