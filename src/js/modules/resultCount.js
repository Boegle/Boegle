const result = {
  init: function(data) {
    const resultButton = document.querySelector('#resultButton')
    console.log(data)
    if(data < 401 && data > 40) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon 40 resultaten' 
      resultButton.tabIndex = 0 
    } else if(data < 41 && data > 1) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaten'
      resultButton.tabIndex = 0
    } else if(data === 1) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaat'
      resultButton.tabIndex = 0
    } else if(data === 0) {
      resultButton.classList.remove('inactive')
      resultButton.classList.add('noresult')
      resultButton.innerHTML = 'Geen resultaten'
      resultButton.tabIndex = -1
    } else {
      resultButton.classList.add('noresult')
      resultButton.classList.add('inactive')
      resultButton.innerHTML = data + ' resultaten'
      resultButton.tabIndex = -1
    }
  }
}

export {
  result
}