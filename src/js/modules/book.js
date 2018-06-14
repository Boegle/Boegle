const mainBook = {
  init: function() {
    console.log('appelsap')
    document.querySelectorAll('#buttons a').forEach((button) => {
      button.addEventListener('click', this.flipPage)
    })
    document.querySelector('pageSlider').addEventListener('change', () => {
      let value = document.querySelector('#pageSlider').value
      document.querySelectorAll('cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 100) + 'em')
      document.querySelectorAll('bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value /100))
      console.log(value)
      document.querySelectorAll('.page').forEach((page) => {
        page.classList.add('none')
      })
      document.querySelectorAll('.page')[0].classList.remove('none')
      document.querySelector('#pageSlideIndicator').innerHTML = value
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
      document.querySelectorAll('#sideNav li')[0].classList.remove('checked')
      document.querySelectorAll('#sideNav li')[1].classList.add('checked')
    } else if (this.flipCount == 2) {
      document.querySelectorAll('.page')[2].classList.add('animation')
      document.querySelectorAll('.page')[3].classList.add('animation')
      document.querySelectorAll('#sideNav li')[1].classList.remove('checked')
      document.querySelectorAll('#sideNav li')[2].classList.add('checked')
    } else if (this.flipCount == 3) {
      document.querySelectorAll('#sideNav li')[2].classList.remove('checked')
      document.querySelectorAll('#book .page').forEach((page) => {
        page.classList.add('animationReverse')
        setTimeout(() => {
          document.querySelector('#range').classList.add('sliderSlidesIn')
          document.querySelectorAll('#sideNav li')[3].classList.add('checked')
          document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1)
          document.querySelector('#book').classList.add('inDepth')

          console.log('sapje')
        }, 500)
      })
    }
  },
  sideMenu: function() {
    for(var i=0; i<document.querySelectorAll('li').length; i++){
      document.querySelectorAll('li')[i].addEventListener('click', function(){
        for(i=0; i<document.querySelectorAll('li').length; i++){
          document.querySelectorAll('li')[i].classList.remove('checked')
          this.classList.add('checked')
        }
      })
    }
  }
}

export {
  mainBook
}
