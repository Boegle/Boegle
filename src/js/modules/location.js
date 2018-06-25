const bookLocation = {
  init: function() {
    if(document.querySelector('.detailInformation button')){
      this.showLocation()
      this.hideLocation()
    }
  },
  showLocation: function() {
    document.querySelector('.detailInformation button').addEventListener('click', () => {
      document.querySelector('.bookLocation').classList.add('active')
    })
  },
  hideLocation: function() {
    document.querySelector('.bookLocation button').addEventListener('click', () => {
      document.querySelector('.bookLocation').classList.remove('active')
    })
  }
}

export {
  bookLocation
}
