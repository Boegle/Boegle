import{test} from './modules/test.js'
import{bookForm} from './modules/formResults.js'


let app = {
  init: function() {
    console.log(this)
    test()
    bookForm.init()
  }
}

app.init()
