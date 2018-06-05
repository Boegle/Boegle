(function () {
  'use strict';

  function test() {
    console.log('test');
  }

  let app = {
    init: function() {
      console.log(this);
      test();
    }
  };

  app.init();

}());
