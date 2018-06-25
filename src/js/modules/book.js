const mainBook = {
  init: function() {
    if(document.querySelector('form')) {
      this.whatButtonsToShow()
      customSelect.init()
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
      document.querySelector('#pages').addEventListener('mousemove', () => {
        let value = document.querySelector('#pages').value
        document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 100) + 'em')
        document.querySelectorAll('.bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value / 100))
        document.querySelector('#range label').style.setProperty('--tooltipPos', value / 6.2 + '%')
        this.selectors.page.forEach((page) => {
          page.classList.add('none')
        })
        this.selectors.page[0].classList.remove('none')
        if (value <= 1) {
          document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : 50 of minder'
        } else if (value >= 499) {
          document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : 500 of meer'
        } else {
          document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : ongeveer ' + value
        }
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
      this.currentState ++
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
      this.currentState --
    } else if (this.currentState == 1 && this.flipCount == 2) {
      this.selectors.page[2].classList.add('animation')
      this.selectors.page[3].classList.add('animation')
      this.currentState ++
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
      this.currentState --
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
      this.currentState ++
      this.selectors.page.forEach((page) => {
        page.classList.add('animationReverse')
        setTimeout(() => {
          page.classList.remove('animation')
          document.querySelector('#range').classList.add('sliderSlidesIn')
          document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1)
          document.querySelector('#book').classList.add('inDepth')
        }, 500)
      })
    } else if (this.currentState == 3 && this.flipCount == 2) {
      document.querySelectorAll('#book .page').forEach((page) => {
        page.classList.remove('animationReverse')
        page.classList.remove('none')
        page.classList.add('animation')
      })
      this.currentState --
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
  }
}

const customSelect = {
  amountOfValuesInCustomSelect : 0,
  arrayOfChosenGenres : [],
  init : function() {
    document.querySelector('.customSelect p ').addEventListener('click', () => {
      document.querySelector('.insideCustomSelect').classList.toggle('hidden')
      document.querySelector('.customSelect').classList.toggle('rotate')
    })
    // this.createCheckboxes()
  },
  allGenres : ['Avontureroman', 'Bijbelseroman', 'Biografie', 'Detective', 'Dieren', 'Doktersverhaal', 'Erotiek', 'Experimentele roman', 'Familieroman', 'Feministische roman', 'Homofiel thema', 'Humor', 'Indisch milieu', 'Islamitisch milieu', 'Joods milieu', 'Kinderleven', 'Oorlog en verzet', 'Paarden', 'Politieke roman', 'Protestants milieu', 'Psychologisch verhaal', 'Racisme', 'Romantisch verhaal', 'School', 'Sciencefiction', 'Sociaal/politiek verhaal', 'Spionageroman', 'Sport', 'Sprookjes', 'Streek/boeren-roman', 'Stripverhaal', 'Thriller', 'Verhalenbundel', 'Western', 'Zeeverhaal'],
  createCheckboxes: function() {
    // document.querySelector('.insideCustomSelect').innerHTML += ''
    // this.allGenres.forEach((genre) => {
    //   document.querySelector('.insideCustomSelect').innerHTML += `
    //   <label for="${genre.toLocaleLowerCase()}">${genre}</label>
    //   <input id="${genre.toLocaleLowerCase()}" value="${genre.toLocaleLowerCase()}" type="checkbox">
    //   `
    // })
    document.querySelectorAll('.insideCustomSelect input').forEach((checkbox) => {
      checkbox.addEventListener('change', this.customSelect)
    })
  },
  customSelect : function() {
    if (customSelect.amountOfValuesInCustomSelect == 0 && this.checked) {
      customSelect.arrayOfChosenGenres.push(this.id)
      customSelect.amountOfValuesInCustomSelect++
    } else if (customSelect.amountOfValuesInCustomSelect == 1 && this.checked) {
      customSelect.arrayOfChosenGenres.push(this.id)
    } else if (this.checked === false) {
      if(customSelect.arrayOfChosenGenres.includes(this.id)){
        let remove = customSelect.arrayOfChosenGenres.indexOf(this.id)
        customSelect.arrayOfChosenGenres.splice(remove, 1)
      }
    }
    customSelect.checkChangeInGenres()
  },
  checkChangeInGenres : function() {
    {
      document.querySelector('.customSelect p').innerHTML = ''
      if(customSelect.arrayOfChosenGenres.length >= 1) {
        customSelect.arrayOfChosenGenres.forEach((value) => {
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
