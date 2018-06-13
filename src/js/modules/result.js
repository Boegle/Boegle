const result = {
  init: function() {
    this.next()
    this.back()
  },
  next: function() {
    const nextButton = document.querySelector('.next-result')

    nextButton.addEventListener('click', function(){
      const page = document.querySelector('.book-page.book-left')
      page.classList.add('active')

      const resultPage = document.querySelectorAll('.result-page')

      resultPage.forEach(function(i){
        i.classList.add('active')
      })

      const resultContainer = document.querySelector('.result-container')
      resultContainer.classList.add('active')
    })
  },
  back: function() {
    const nextButton = document.querySelector('.previous-result')

    nextButton.addEventListener('click', function(){
      const resultContainer = document.querySelector('.result-container')
      resultContainer.classList.remove('active')

      const resultPage = document.querySelectorAll('.result-page')

      resultPage.forEach(function(i){
        i.classList.remove('active')
      })

      const page = document.querySelector('.book-page.book-left')
      page.classList.remove('active')




    })
  }
}

export {
  result
}