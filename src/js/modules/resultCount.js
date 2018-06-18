const result = {
  init: function(data) {
    const resultButton = document.querySelector('#resultButton')

    if(data < 401 && data > 40) {
      resultButton.classList.remove('inactive')
      resultButton.classList.remove('noresult')
      resultButton.innerHTML = 'Toon resultaten'  
    } else if(data < 41 && data > 1) {
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
      resultButton.classList.add('inactive')
    }
    console.log(data)
  }
}

export {
  result
}