const result = {
  init: function () {
    this.currentPage.page = 0
    this.next()
    this.back()
  },
  next: function () {
    const nextButton = document.querySelector('.next-result')
    const self = this

    nextButton.addEventListener('click', function () {
      const resultsContainer = document.querySelectorAll('.results')

      let currentPage = self.currentPage.page
      let nextPage = currentPage + 1

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

      /*Check first if the resultpage exist. If it exist make it than active*/
      if (resultsContainer[previousPage]) {

        resultsContainer.forEach((i) => {
          i.classList.remove('active')
        })

        resultsContainer[previousPage].classList.add('active')
        self.currentPage.page = previousPage
      }
    })
  },
  currentPage: {}
}

export {
  result
}