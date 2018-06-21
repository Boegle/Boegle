const result = {
  init: function(data) {
    const resultButton = document.querySelector('#resultButton')

    if(data < 401 && data > 20) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon 40 resultaten'  
    } else if(data < 21 && data > 1) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaten'
    } else if(data === 1) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaat'
    } else if(data === 0) {
      resultButton.classList.remove('inactive')
      resultButton.classList.add('noresult')
      resultButton.innerHTML = 'Geen resultaten'
    } else {
      resultButton.classList.add('noresult')
      resultButton.classList.add('inactive')
      resultButton.innerHTML = data + ' resultaten'
    }
  }
}

export {
  result
}