const mainBook = {
  init: function() {
    console.log('appelsap')
    document.querySelectorAll('#buttons a').forEach((button) => {
      button.addEventListener('click', this.flipPage)
    })
    document.getElementById('pageSlider').addEventListener('change', () => {
      let value = document.getElementById('pageSlider').value
      document.getElementsByClassName('cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 2) + 'em')
      document.getElementsByClassName('bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value /2))
      document.querySelectorAll('.page').forEach((page) => {
        page.classList.add('none')
      })
      document.getElementsByClassName('page')[0].classList.remove('none')
      document.getElementById('pageSlideIndicator').innerHTML = value
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
        page.classList.add('animationReverse')
        setTimeout(() => {
          document.getElementsByClassName('bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1)
          document.querySelector('#book').classList.add('inDepth')
          console.log('sapje')
        }, 500)
      })
    }
  }
}

export {
  mainBook
}
