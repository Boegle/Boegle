(function () {
  'use strict';

  function test() {
    console.log('test');
  }

  const socket = {
    io: io(), // eslint-disable-line no-undef
    init: function() {
      console.log('socket init complete...');
      this.io;
    }
  };

  let bookForm = {
    init: function() {
      console.log('bookForm init complete');
      document.querySelector('form').addEventListener('submit', this.search);
      socket.init();
    },
    search: function(el) {
      el.preventDefault();
      const input = document.querySelectorAll('#bookInfo input');
      const select = document.querySelectorAll('#bookInfo select');
      const checkboxes = document.querySelectorAll('#checkboxes input');
      const genres = [];

      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          genres.push(checkbox.value);
        }
      });

      const givenSearchValues = {
        url: 'search',
        title: input[0].value,
        author: input[1].value,
        language: select[0].value,
        age: select[1].value,
        pubYear: input[2].value,
        genres: genres
      };

      console.log(givenSearchValues);

      socket.io.emit('searchValues', givenSearchValues);
    }
  };

  let app = {
    init: function() {
      console.log(this);
      test();
      bookForm.init();
    }
  };

  app.init();

}());
