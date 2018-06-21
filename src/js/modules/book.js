const mainBook = {
  init: function() {
    if(document.querySelector('form')) {
      document.querySelector('.customSelect p ').addEventListener('click', () => {
        document.querySelector('.insideCustomSelect').classList.toggle('hidden')
        document.querySelector('.customSelect').classList.toggle('rotate')
      })

      document.querySelectorAll('.insideCustomSelect input').forEach((checkbox) => {
        checkbox.addEventListener('change', this.customSelect)
      })

      this.whatButtonsToShow()
      document.querySelector('#coverColor').addEventListener('change', () => {
        let that = document.querySelector('#coverColor').value
        document.body.style.setProperty('--bookColor', that)
      })

      this.selectors.listItem.forEach((state) => {
        state.addEventListener('click', this.flipPage)
      })

      document.querySelectorAll('#buttons button').forEach((button) => {
        button.addEventListener('click', this.flipPage)
      })
      document.querySelector('#pages').addEventListener('change', () => {
        let value = document.querySelector('#pages').value
        document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 100) + 'em')
        document.querySelectorAll('.bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value / 100))
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
    if (this.id == 'next' || this.id == 'back') {
      if (this.id == 'next') {
        mainBook.flipCount ++
      } else {
        mainBook.flipCount --
      }
    } else {
      let flipTo = this.id
      flipTo = flipTo.split('state')
      mainBook.flipCount = flipTo[1]
    }
    console.log('van' + mainBook.currentState)
    console.log('naar' + mainBook.flipCount)
    mainBook.actualFlipPage()
    mainBook.sideMenuUpdate()
  },
  actualFlipPage: function() {
    if (this.currentState == 3) {
      document.body.style.setProperty('--animationTime', '2s')
    } else {
      document.body.style.setProperty('--animationTimeTilt', '1s')
      this.selectors.page.forEach((page) => {
        page.classList.remove('none')
      })
    }
    if (this.currentState == 0 && this.flipCount == 1) {
      this.selectors.page[0].classList.add('animation')
      this.selectors.page[1].classList.add('animation')
      this.currentState++
    } else if (this.currentState == 0 && this.flipCount == 2) {
      this.selectors.page.forEach((page) => {
        page.classList.add('animation')
      })
      this.currentState = 2
    } else if (this.currentState == 0 && this.flipCount == 3) {
      document.body.style.setProperty('--animationTime', '0s')
      this.currentState = 3
      document.querySelector('#range').classList.add('sliderSlidesIn')
      document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1)
      document.querySelector('#book').classList.add('inDepth')
      this.selectors.page.forEach((page) => {
        page.classList.add('animationReverse')
      })
    } else if (this.currentState == 1 && this.flipCount == 0) {
      this.selectors.page[1].classList.add('animationReverse')
      this.selectors.page[0].classList.add('animationReverse')
      this.selectors.page[0].classList.remove('animation')
      this.selectors.page[1].classList.remove('animation')
      setTimeout (() => {
        this.selectors.page[1].classList.remove('animationReverse')
        this.selectors.page[0].classList.remove('animationReverse')
      }, 1500)
      this.currentState--
    } else if (this.currentState == 1 && this.flipCount == 2) {
      this.selectors.page[2].classList.add('animation')
      this.selectors.page[3].classList.add('animation')
      this.currentState++
    } else if (this.currentState == 1 && this.flipCount == 3) {
      this.currentState = 3
      document.body.style.setProperty('--animationTime', '1s')
      this.selectors.page.forEach((page) => {
        page.classList.remove('animation')
      })
      this.selectors.page[0].classList.add('animationReverse')
      this.selectors.page[1].classList.add('animationReverse')
      setTimeout(() => {
        document.body.style.setProperty('--animationTime', '0s')
        document.body.style.setProperty('--animationTimeTilt', '0.5s')
        this.selectors.page[2].classList.add('animationReverse')
        this.selectors.page[3].classList.add('animationReverse')
        document.querySelector('#range').classList.add('sliderSlidesIn')
        document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1)
        document.querySelector('#book').classList.add('inDepth')
      }, 500)
    } else if (this.currentState == 2 && this.flipCount == 1) {
      this.selectors.page[3].classList.add('animationReverse')
      this.selectors.page[2].classList.add('animationReverse')
      this.selectors.page[2].classList.remove('animation')
      this.selectors.page[3].classList.remove('animation')
      setTimeout (() => {
        this.selectors.page[2].classList.remove('animationReverse')
        this.selectors.page[3].classList.remove('animationReverse')
      }, 1500)
      this.currentState--
    } else if (this.currentState == 2 && this.flipCount == 0) {
      this.currentState = 0
      this.selectors.page.forEach((page) => {
        page.classList.remove('animation')
        page.classList.add('animationReverse')
        setTimeout(() => {
          page.classList.remove('animationReverse')
        }, 1600)
      })
    } else if (this.currentState == 2 && this.flipCount == 3) {
      this.currentState++
      this.selectors.page.forEach((page) => {
        page.classList.add('animationReverse')
        setTimeout(() => {
          page.classList.remove('animation')
          document.querySelector('#range').classList.add('sliderSlidesIn')
          document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1)
          document.querySelector('#book').classList.add('inDepth')
          console.log('sapje')
        }, 500)
      })
    } else if (this.currentState == 3 && this.flipCount == 2) {
      document.querySelectorAll('#book .page').forEach((page) => {
        page.classList.remove('animationReverse')
        page.classList.remove('none')
        page.classList.add('animation')
      })
      this.currentState--
      document.querySelector('#range').classList.remove('sliderSlidesIn')
      document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', 0)
      document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0)
      document.querySelector('#book').classList.remove('inDepth')
    } else if (this.currentState == 3 && this.flipCount == 0) {
      this.currentState = 0
      document.querySelector('#range').classList.remove('sliderSlidesIn')
      document.querySelector('#book').classList.remove('inDepth')
      document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', 0)
      document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0)
      this.selectors.page.forEach((page) => {
        page.classList.remove('animationReverse')
      })
    } else if (this.currentState == 3 && this.flipCount == 1) {
      this.currentState = 1
      this.selectors.page.forEach((page) => {
        page.classList.remove('animationReverse')
      })
      document.querySelector('#range').classList.remove('sliderSlidesIn')
      document.querySelector('#book').classList.remove('inDepth')
      document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', 0)
      document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0)
      this.selectors.page[1].classList.add('animation')
      this.selectors.page[0].classList.add('animation')
    }
    this.whatButtonsToShow()
  },
  sideMenuUpdate: function() {
    this.selectors.listItem.forEach((li) => {
      li.classList.remove('checked')
    })
    this.selectors.listItem[this.flipCount].classList.add('checked')
  },
  amountOfValuesInCustomSelect : 0,
  arrayOfGenres : [],
  whatButtonsToShow: function() {
    if (this.flipCount == 0) {
      document.querySelector('#next').classList.remove('inactive')
      document.querySelector('#back').classList.add('inactive')
    } else if (this.flipCount == 3) {
      document.querySelector('#back').classList.remove('inactive')
      document.querySelector('#next').classList.add('inactive')
    } else {
      document.querySelector('#next').classList.remove('inactive')
      document.querySelector('#back').classList.remove('inactive')
    }
  },
  customSelect : function() {
    if (mainBook.amountOfValuesInCustomSelect == 0 && this.checked) {
      mainBook.arrayOfGenres.push(this.id)
      console.log(mainBook.arrayOfGenres)
      mainBook.amountOfValuesInCustomSelect++
    } else if (mainBook.amountOfValuesInCustomSelect == 1 && this.checked) {
      mainBook.arrayOfGenres.push(this.id)
      console.log(mainBook.arrayOfGenres)
    } else if (this.checked === false) {
      console.log('unchecked')
      if(mainBook.arrayOfGenres.includes(this.id)){
        console.log(this.id + ' will be removed')
        let remove = mainBook.arrayOfGenres.indexOf(this.id)
        mainBook.arrayOfGenres.splice(remove, 1)
        console.log(mainBook.arrayOfGenres)
      }
    }
    mainBook.checkChangeInGenres()
  },
  checkChangeInGenres : function(){
    {
      document.querySelector('.customSelect p').innerHTML = ''
      console.log('appel')
      if(mainBook.arrayOfGenres.length >= 1) {
        mainBook.arrayOfGenres.forEach((value) => {
          document.querySelector('.customSelect p').innerHTML += value + ', '
        })
      } else {
        document.querySelector('.customSelect p').innerHTML = 'Meer Genres...'
      }
    }
  }
}

export {
  mainBook
}
