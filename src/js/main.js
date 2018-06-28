import{bookForm} from './modules/formResults.js'
import{mainBook} from './modules/book.js'
import{result} from './modules/result.js'
import{bookLocation} from './modules/location.js'
import{zeroState} from './modules/zeroState.js'


let app = {
  init: function() {
    bookForm.init()
    mainBook.init()
    result.init()
    bookLocation.init()
    zeroState.init()
  }
}

app.init()
