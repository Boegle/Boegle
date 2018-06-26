const zeroState = {
  init: function() {
    if(document.querySelector('.zeroState button')){
      this.hideZeroState()
      this.showZeroState()
    }
  },
  showZeroState: function() {
    document.querySelector('header button').addEventListener('click', () => {
      document.querySelector('.zeroState').classList.remove('inactive')
    })
  },
  hideZeroState: function() {
    document.querySelector('.zeroState button').addEventListener('click', () => {
      document.querySelector('.zeroState').classList.add('inactive')
    })
  }
}

export {
  zeroState
}
