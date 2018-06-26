const result = {
  init: function(data) {
    const resultButton = document.querySelector('#resultButton')
    const loader = document.querySelector('.loader')

    resultButton.addEventListener('click', () => {
      resultButton.innerHTML = 'Laden...'
      resultButton.classList.add('noresult')
      loader.classList.add('active')
      resultButton.tabIndex = -1
    })

    console.log(data)
    if(data > 300000) {
      resultButton.classList.add('noresult')
      resultButton.classList.remove('activeResult')
      resultButton.innerHTML = 'Nog geen resultaten' 
      resultButton.tabIndex = -1
    } else if(data < 801 && data > 1) {
      resultButton.classList.remove('noresult')
      resultButton.classList.add('activeResult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaten' 
      resultButton.tabIndex = 0 
    } else if(data === 1) {
      resultButton.classList.remove('noresult')
      resultButton.classList.add('activeResult')
      resultButton.innerHTML = 'Toon ' + data + ' resultaat'
      resultButton.tabIndex = 0
    } else if(data === 0) {
      resultButton.classList.add('noresult')
      resultButton.classList.remove('activeResult')
      resultButton.innerHTML = 'Geen resultaten'
      resultButton.tabIndex = -1
    } else {
      resultButton.classList.add('noresult')
      resultButton.classList.remove('activeResult')
      resultButton.innerHTML = data + ' resultaten'
      resultButton.tabIndex = -1
    }
  }
}

export {
  result
}