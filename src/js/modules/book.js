const mainBook = {
  init: function() {
    console.log('appelsap')
    if(document.querySelector('#book')) {
      document.querySelectorAll('#buttons button').forEach((button) => {
        button.addEventListener('click', this.flipPage)
      })
      document.querySelector('#pageSlider').addEventListener('change', () => {
        let value = document.querySelector('#pageSlider').value
        document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 100) + 'em')
        document.querySelectorAll('.bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value /100))
        console.log(value)
        this.selectors.page.forEach((page) => {
          page.classList.add('none')
        })
        this.selectors.page[0].classList.remove('none')
        document.querySelector('#pageSlideIndicator').innerHTML = value
      })
    }
  },
  selectors : {
    page: document.querySelectorAll('.page'),
    listItem: document.querySelectorAll('#sideNav li')
  },
  currentState: 0,
  flipCount: 0,
  flipPage: function() {
    if (this.id == 'next') {
      mainBook.flipCount ++
    } else {
      mainBook.flipCount --
    }
    console.log('van' + mainBook.currentState)
    console.log('naar' + mainBook.flipCount)
    mainBook.actualFlipPage()
  },
  actualFlipPage: function() {
    if (this.currentState == 0 && this.flipCount == 1) {
      this.selectors.page[0].classList.add('animation')
      this.selectors.page[1].classList.add('animation')
      document.querySelectorAll('#sideNav li')[0].classList.remove('checked')
      document.querySelectorAll('#sideNav li')[1].classList.add('checked')
      this.currentState++
    } else if (this.currentState == 1 && this.flipCount == 0) {
      this.selectors.page[1].classList.add('animationReverse')
      this.selectors.page[0].classList.add('animationReverse')
      this.selectors.page[0].classList.remove('animation')
      this.selectors.page[1].classList.remove('animation')
      setTimeout (() => {
        this.selectors.page[1].classList.remove('animationReverse')
        this.selectors.page[0].classList.remove('animationReverse')
      }, 1500)
      document.querySelectorAll('#sideNav li')[0].classList.add('checked')
      document.querySelectorAll('#sideNav li')[1].classList.remove('checked')
      this.currentState--
    } else if (this.currentState == 1 && this.flipCount == 2) {
      this.selectors.page[2].classList.add('animation')
      this.selectors.page[3].classList.add('animation')
      document.querySelectorAll('#sideNav li')[1].classList.remove('checked')
      document.querySelectorAll('#sideNav li')[2].classList.add('checked')
      this.currentState++
    } else if (this.currentState == 2 && this.flipCount == 1) {
      this.selectors.page[3].classList.add('animationReverse')
      this.selectors.page[2].classList.add('animationReverse')
      this.selectors.page[2].classList.remove('animation')
      this.selectors.page[3].classList.remove('animation')
      setTimeout (() => {
        this.selectors.page[2].classList.remove('animationReverse')
        this.selectors.page[3].classList.remove('animationReverse')
      }, 1500)
      document.querySelectorAll('#sideNav li')[1].classList.add('checked')
      document.querySelectorAll('#sideNav li')[2].classList.remove('checked')
      this.currentState--
    } else if (this.currentState == 2 && this.flipCount == 3) {
      document.querySelectorAll('#sideNav li')[2].classList.remove('checked')
      this.currentState++
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
    } else if (this.currentState == 3 && this.flipCount == 2) {
      document.querySelectorAll('#book .page').forEach((page) => {
        page.classList.remove('animationReverse')
        page.classList.add('animation')
      })
      this.currentState--
      document.querySelector('#range').classList.remove('sliderSlidesIn')
      document.querySelectorAll('#sideNav li')[3].classList.remove('checked')
      document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0)
      document.querySelector('#book').classList.remove('inDepth')
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
