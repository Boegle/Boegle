const result = {
  init: function () {
    if (document.querySelector('.result-container')) {
      this.currentPage.page = 0
      this.next()
      this.back()
      document.querySelector('.previous-result').classList.add('inactive')
    }
  },
  next: function () {
    const nextButton = document.querySelector('.next-result')
    const self = this

    nextButton.addEventListener('click', function () {
      const resultsContainer = document.querySelectorAll('.results')
      document.querySelector('.previous-result').classList.remove('inactive')

      let currentPage = self.currentPage.page
      let nextPage = currentPage + 1

      //If the user is on the last page on the result page, add inactive state
      //to the next result button
      if (nextPage == resultsContainer.length - 1) {
        document.querySelector('.next-result').classList.add('inactive')
      }

      //Check if the next result page exit. If exist make it active
      if (resultsContainer[nextPage] != undefined) {
        resultsContainer.forEach((i) => {
          i.classList.remove('active')
        })
        resultsContainer[nextPage].classList.add('active')
        self.currentPage.page = nextPage
      }
    })
  },
  back: function () {
    const backButton = document.querySelector('.previous-result')
    const self = this

    backButton.addEventListener('click', function () {
      const resultsContainer = document.querySelectorAll('.results')

      let currentPage = self.currentPage.page
      let previousPage = currentPage - 1

      //Add active state to next result button
      document.querySelector('.next-result').classList.remove('inactive')

      //If the user is on the first page, make the previous button in-active
      if (previousPage == 0) {
        console.log(previousPage)
        document.querySelector('.previous-result').classList.add('inactive')
      }

      /*Check first if the resultpage exist. If it exist make it than active*/
      if (resultsContainer[previousPage]) {
        resultsContainer.forEach((i) => {
          i.classList.remove('active')
        })
        resultsContainer[previousPage].classList.add('active')
        self.currentPage.page = previousPage
      } else {
        document.querySelector('.previous-result').classList.add('inactive')
      }
    })
  },
  currentPage: {}
}

export {
  result
}