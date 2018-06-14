const result = {
  init: function(data) {
    const resultButton = document.querySelector('#resultButton')

    if(data < 401 && data > 40) {
      resultButton.disabled = false
      resultButton.innerHTML = 'Toon resultaten'  
    } else if(data < 41 && data > 1) {
      resultButton.disabled = false
      resultButton.innerHTML = 'Toon ' + data + ' resultaten'
    } else if(data === 1) {
      resultButton.disabled = false
      resultButton.innerHTML = 'Toon ' + data + ' resultaat'
    } else if(data === 0) {
      resultButton.disabled = true
      resultButton.innerHTML = 'Geen resultaten'
    } else {
      resultButton.disabled = true
      resultButton.innerHTML = 'Toon resultaten'
    }
    console.log(data)
  }
}

export {
  result
}