import{test} from './modules/test.js'
import{socket} from './modules/io.js'


let app = {
  init: function() {
    console.log(this)
    test()
    socket.init()
  }
}

app.init()
