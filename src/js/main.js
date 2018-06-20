import{bookForm} from './modules/formResults.js'
import{mainBook} from './modules/book.js'
import{result} from './modules/result.js'


let app = {
  init: function() {
    bookForm.init()
    mainBook.init()
    result.init()
  }
}

app.init()
