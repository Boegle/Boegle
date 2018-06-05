import{test} from './modules/test.js'


let app = {
  init: function() {
    console.log(this);
    test()
  }
}

app.init()
