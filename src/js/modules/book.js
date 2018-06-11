const mainBook = {
  init: function() {
    console.log('tekfposjgpodsjposdjgpodjst')
    document.querySelector('#book .cover').addEventListener('click', this.flipPage)
  },
  flipPage: function() {
    this.classList.add('animation')
    document.querySelectorAll('.page')[1].classList.add('animation')
  }
}

export {
  mainBook
}
