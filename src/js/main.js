import{test} from './modules/test.js'
import{bookForm} from './modules/formResults.js'
import{mainBook} from './modules/book.js'


let app = {
  init: function() {
    console.log(this)
    test()
    bookForm.init()
    mainBook.init()
  }
}

app.init()
