import{test} from './modules/test.js'
import{socket} from './modules/io.js'
import{bookForm} from './modules/formResults.js'


let app = {
  init: function() {
    console.log(this)
    test()
    socket.init()
    bookForm.init()
  }
}

app.init()
