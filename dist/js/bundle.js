(function () {
  'use strict';

  const result = {
    init: function(data) {
      const resultButton = document.querySelector('#resultButton');
      const loader = document.querySelector('.loader');

      resultButton.addEventListener('click', () => {
        resultButton.innerHTML = 'Laden...';
        resultButton.classList.add('noresult');
        loader.classList.add('active');
        resultButton.tabIndex = -1;
      });

      console.log(data);
      if(data > 300000) {
        resultButton.classList.add('noresult');
        resultButton.classList.remove('activeResult');
        resultButton.innerHTML = 'Nog geen resultaten'; 
        resultButton.tabIndex = -1;
      } else if(data < 100000 && data > 1) {
        resultButton.classList.remove('noresult');
        resultButton.classList.add('activeResult');
        resultButton.innerHTML = 'Toon ' + data + ' resultaten'; 
        resultButton.tabIndex = 0; 
      } else if(data === 1) {
        resultButton.classList.remove('noresult');
        resultButton.classList.add('activeResult');
        resultButton.innerHTML = 'Toon ' + data + ' resultaat';
        resultButton.tabIndex = 0;
      } else if(data === 0) {
        resultButton.classList.add('noresult');
        resultButton.classList.remove('activeResult');
        resultButton.innerHTML = 'Geen resultaten';
        resultButton.tabIndex = -1;
      } else {
        resultButton.classList.add('noresult');
        resultButton.classList.remove('activeResult');
        resultButton.innerHTML = data + ' resultaten';
        resultButton.tabIndex = -1;
      }
    }
  };

  const socket = {
    io: io(), // eslint-disable-line no-undef
    init: function() {
      console.log('socket init complete...');
      this.io;
      this.io.on('searchCount', (data) => result.init(data));
    }
  };

  const bookForm = {
    init: function() {
      if(document.querySelector('form')) {
        window.onload = bookForm.search;
        bookForm.select.inputs.forEach(input => input.addEventListener('change', (e) => bookForm.search(e)));
        bookForm.select.selects.forEach(select => select.addEventListener('change', (e) => bookForm.search(e)));
        bookForm.select.textArea.addEventListener('change', (e) => bookForm.search(e));
      }
      socket.init();
    },
    select: {
      inputs: document.querySelectorAll('#bookInfo input'),
      selects: document.querySelectorAll('#bookInfo select'),
      textArea: document.querySelector('textarea'),
      checkboxes: document.querySelectorAll('.cover:last-of-type input'),
      title: document.querySelector('#title'),
      author: document.querySelector('#author'),
      language: document.querySelector('#language'),
      age: document.querySelector('#age'),
      year: document.querySelector('#year'),
      illustrator: document.querySelector('#illustrator'),
      illustrations: document.querySelector('#illustrations'),
      publisher: document.querySelector('#publisher'),
      pages: document.querySelector('#pages'),
      summary: document.querySelector('#summary'),
      coverColor: document.querySelector('#coverColor')
    },
    search: function(el) {
      el.preventDefault();
      const genres = [];
      let summary = bookForm.select.summary.value;
      let illustrator = bookForm.select.illustrator.value;
      let publisher = bookForm.select.publisher.value;

      bookForm.select.checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          genres.push(checkbox.value);
        }
      });

      summary = summary.toLowerCase().split(' ');
      illustrator = illustrator.toLowerCase().split(' ');
      publisher = publisher.toLowerCase().split(' ');

      const givenSearchValues = {
        url: 'search',
        title: bookForm.select.title.value,
        author: bookForm.select.author.value,
        language: bookForm.select.language.value,
        age: bookForm.select.age.value,
        pubYear: bookForm.select.year.value,
        genres: genres,
        illustrator: illustrator,
        illustrations: bookForm.select.illustrations.value,
        publisher: publisher,
        pages: bookForm.select.pages.value,
        summary: summary,
        coverColor: bookForm.select.coverColor.value
      };
      socket.io.emit('searchValues', givenSearchValues);
    }
  };

  const mainBook = {
    init: function() {
      if(document.querySelector('form')) {
        this.whatButtonsToShow();
        customSelect.init();
        document.querySelector('#coverColor').addEventListener('change', () => {
          let that = document.querySelector('#coverColor').value;
          document.body.style.setProperty('--bookColor', that);
        });

        this.selectors.listItem.forEach((state) => {
          state.addEventListener('click', this.flipPage);
        });

        document.querySelectorAll('#buttons button').forEach((button) => {
          button.addEventListener('click', this.flipPage);
        });
        document.querySelector('#pages').addEventListener('mousemove', mainBook.slider);
        document.querySelector('#pages').addEventListener('touchmove', mainBook.slider);
      }
    },
    selectors : {
      page: document.querySelectorAll('.page'),
      listItem: document.querySelectorAll('#sideNav li')
    },
    currentState: 0,
    flipCount: 0,
    phoneState: 0,
    flipPage: function() {
      if (this.id == 'next' || this.id == 'back') {
        if (window.screen.width < 1120 && mainBook.currentState == 1 && this.id == 'next' && mainBook.phoneState == 0) {
          
          mainBook.phoneState = 1;
          mainBook.flipCount = 1.5;
        } else if (window.screen.width < 1120 && mainBook.currentState == 1 && mainBook.phoneState == 1 && this.id == 'back') {
          
          mainBook.phoneState = 0;
          mainBook.flipCount = 1.25;
        } else if (this.id == 'next') {
          mainBook.flipCount ++;
        } else {
          mainBook.flipCount --;
        }
      } else {
        let flipTo = this.id;
        flipTo = flipTo.split('state');
        mainBook.flipCount = flipTo[1];
      }
      mainBook.actualFlipPage();
      mainBook.sideMenuUpdate();
    },
    actualFlipPage: function() {
      
      if (this.currentState == 3) {
        document.body.style.setProperty('--animationTime', '2s');
      } else {
        document.body.style.setProperty('--animationTimeTilt', '1s');
        this.selectors.page.forEach((page) => {
          page.classList.remove('none');
        });
      }
      if (this.currentState == 0 && this.flipCount == 1) {
        this.selectors.page[0].classList.add('animation');
        this.selectors.page[1].classList.add('animation');
        if (window.screen.width < 1120) {
          document.querySelector('#book').classList.add('showLeftSide');
        }
        this.currentState ++;
      } else if (this.currentState == 0 && this.flipCount == 2) {
        this.selectors.page.forEach((page) => {
          page.classList.add('animation');
        });
        this.currentState = 2;
      } else if (this.currentState == 0 && this.flipCount == 3) {
        document.body.style.setProperty('--animationTime', '0s');
        this.currentState = 3;
        document.querySelector('#range').classList.add('sliderSlidesIn');
        document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1);
        document.querySelector('#book').classList.add('inDepth');
        this.selectors.page.forEach((page) => {
          page.classList.add('animationReverse');
        });
      } else if (this.currentState == 1 && this.flipCount == 0) {
        this.selectors.page[1].classList.add('animationReverse');
        this.selectors.page[0].classList.add('animationReverse');
        this.selectors.page[0].classList.remove('animation');
        this.selectors.page[1].classList.remove('animation');
        if (window.screen.width < 1120) {
          document.querySelector('#book').classList.remove('showLeftSide');
        }
        setTimeout (() => {
          this.selectors.page[1].classList.remove('animationReverse');
          this.selectors.page[0].classList.remove('animationReverse');
        }, 1500);
        this.currentState --;
      } else if (this.currentState == 1 && this.flipCount == 1.25) {
        
        this.flipCount = 1;
        this.phoneState = 0;
        document.querySelector('#book').classList.add('showLeftSide');
      } else if (this.currentState == 1 && this.flipCount == 1.5) {
        
        document.querySelector('#book').classList.remove('showLeftSide');
        this.currentState = 1;
        this.flipCount = 1;
      } else if (this.currentState == 1 && this.flipCount == 2) {
        this.selectors.page[2].classList.add('animation');
        this.selectors.page[3].classList.add('animation');
        if (window.screen.width < 1120) {
          document.querySelector('#book').classList.add('showLeftSide');
        }
        this.currentState ++;
      } else if (this.currentState == 1 && this.flipCount == 3) {
        this.currentState = 3;
        document.body.style.setProperty('--animationTime', '1s');
        this.selectors.page.forEach((page) => {
          page.classList.remove('animation');
        });
        this.selectors.page[0].classList.add('animationReverse');
        this.selectors.page[1].classList.add('animationReverse');
        setTimeout(() => {
          document.body.style.setProperty('--animationTime', '0s');
          document.body.style.setProperty('--animationTimeTilt', '0.5s');
          this.selectors.page[2].classList.add('animationReverse');
          this.selectors.page[3].classList.add('animationReverse');
          document.querySelector('#range').classList.add('sliderSlidesIn');
          document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1);
          document.querySelector('#book').classList.add('inDepth');
        }, 500);
      } else if (this.currentState == 2 && this.flipCount == 1) {
        this.selectors.page[3].classList.add('animationReverse');
        this.selectors.page[2].classList.add('animationReverse');
        this.selectors.page[2].classList.remove('animation');
        this.selectors.page[3].classList.remove('animation');
        if (window.screen.width < 1120) {
          document.querySelector('#book').classList.remove('showLeftSide');
        }
        setTimeout (() => {
          this.selectors.page[2].classList.remove('animationReverse');
          this.selectors.page[3].classList.remove('animationReverse');
        }, 1500);
        this.currentState --;
      } else if (this.currentState == 2 && this.flipCount == 0) {
        this.currentState = 0;
        this.selectors.page.forEach((page) => {
          page.classList.remove('animation');
          page.classList.add('animationReverse');
          setTimeout(() => {
            page.classList.remove('animationReverse');
          }, 1600);
        });
      } else if (this.currentState == 2 && this.flipCount == 3) {
        this.currentState ++;
        this.selectors.page.forEach((page) => {
          page.classList.add('animationReverse');
          setTimeout(() => {
            page.classList.remove('animation');
            document.querySelector('#range').classList.add('sliderSlidesIn');
            document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 1);
            document.querySelector('#book').classList.add('inDepth');
          }, 500);
        });
      } else if (this.currentState == 3 && this.flipCount == 2) {
        document.querySelectorAll('#book .page').forEach((page) => {
          page.classList.remove('animationReverse');
          page.classList.add('animation');
          page.classList.remove('none');
        });
        this.currentState --;
        document.querySelector('#range').classList.remove('sliderSlidesIn');
        document.querySelector('#book').style.setProperty('--cover-translateY', 0);
        document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0);
        document.querySelector('#book').classList.remove('inDepth');
      } else if (this.currentState == 3 && this.flipCount == 0) {
        this.currentState = 0;
        document.querySelector('#range').classList.remove('sliderSlidesIn');
        document.querySelector('#book').classList.remove('inDepth');
        document.querySelector('#book').style.setProperty('--cover-translateY', 0);
        document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0);
        this.selectors.page.forEach((page) => {
          page.classList.remove('animationReverse');
        });
      } else if (this.currentState == 3 && this.flipCount == 1) {
        this.currentState = 1;
        this.selectors.page.forEach((page) => {
          page.classList.remove('animationReverse');
        });
        document.querySelector('#range').classList.remove('sliderSlidesIn');
        document.querySelector('#book').classList.remove('inDepth');
        document.querySelector('#book').style.setProperty('--cover-translateY', 0);
        document.querySelector('.bookBottomTwo').style.setProperty('--bookBottom-scale', 0);
        this.selectors.page[1].classList.add('animation');
        this.selectors.page[0].classList.add('animation');
      }
      this.whatButtonsToShow();
    },
    sideMenuUpdate: function() {
      this.selectors.listItem.forEach((li) => {
        li.classList.remove('checked');
      });
      this.selectors.listItem[this.flipCount].classList.add('checked');
    },
    whatButtonsToShow: function() {
      if (this.flipCount == 0) {
        document.querySelector('#next').classList.remove('inactive');
        document.querySelector('#back').classList.add('inactive');
      } else if (this.flipCount == 3) {
        document.querySelector('#back').classList.remove('inactive');
        document.querySelector('#next').classList.add('inactive');
      } else {
        document.querySelector('#next').classList.remove('inactive');
        document.querySelector('#back').classList.remove('inactive');
      }
    },
    slider : function() {
      let value = document.querySelector('#pages').value;
      document.querySelectorAll('.cover')[0].style.setProperty('--cover-translateY', '-' + parseInt(value / 100) + 'em');
      document.querySelectorAll('.bookBottomTwo')[0].style.setProperty('--bookBottom-scale', 1 + parseInt(value / 100));
      document.querySelector('#range label').style.setProperty('--tooltipPos', value / 6.2 + '%');
      mainBook.selectors.page.forEach((page) => {
        page.classList.add('none');
      });
      mainBook.selectors.page[0].classList.remove('none');
      if (value <= 1) {
        document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : 50 of minder';
      } else if (value >= 499) {
        document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : 500 of meer';
      } else {
        document.querySelector('#pageSlideIndicator').innerHTML = 'Aantal Pagina\'s : ongeveer ' + value;
      }
    }
  };

  const customSelect = {
    amountOfValuesInCustomSelect : 0,
    arrayOfChosenGenres : [],
    init : function() {
      document.querySelector('.customSelect p ').addEventListener('click', () => {
        document.querySelector('.insideCustomSelect').classList.toggle('hidden');
        document.querySelector('.customSelect').classList.toggle('rotate');
      });
      // this.createCheckboxes()
    },
    allGenres : ['Avontureroman', 'Bijbelseroman', 'Biografie', 'Detective', 'Dieren', 'Doktersverhaal', 'Erotiek', 'Experimentele roman', 'Familieroman', 'Feministische roman', 'Homofiel thema', 'Humor', 'Indisch milieu', 'Islamitisch milieu', 'Joods milieu', 'Kinderleven', 'Oorlog en verzet', 'Paarden', 'Politieke roman', 'Protestants milieu', 'Psychologisch verhaal', 'Racisme', 'Romantisch verhaal', 'School', 'Sciencefiction', 'Sociaal/politiek verhaal', 'Spionageroman', 'Sport', 'Sprookjes', 'Streek/boeren-roman', 'Stripverhaal', 'Thriller', 'Verhalenbundel', 'Western', 'Zeeverhaal'],
    createCheckboxes: function() {
      // document.querySelector('.insideCustomSelect').innerHTML += ''
      // this.allGenres.forEach((genre) => {
      //   document.querySelector('.insideCustomSelect').innerHTML += `
      //   <label for="${genre.toLocaleLowerCase()}">${genre}</label>
      //   <input id="${genre.toLocaleLowerCase()}" value="${genre.toLocaleLowerCase()}" type="checkbox">
      //   `
      // })
      document.querySelectorAll('.insideCustomSelect input').forEach((checkbox) => {
        checkbox.addEventListener('change', this.customSelect);
      });
    },
    customSelect : function() {
      if (customSelect.amountOfValuesInCustomSelect == 0 && this.checked) {
        customSelect.arrayOfChosenGenres.push(this.id);
        customSelect.amountOfValuesInCustomSelect++;
      } else if (customSelect.amountOfValuesInCustomSelect == 1 && this.checked) {
        customSelect.arrayOfChosenGenres.push(this.id);
      } else if (this.checked === false) {
        if(customSelect.arrayOfChosenGenres.includes(this.id)){
          let remove = customSelect.arrayOfChosenGenres.indexOf(this.id);
          customSelect.arrayOfChosenGenres.splice(remove, 1);
        }
      }
      customSelect.checkChangeInGenres();
    },
    checkChangeInGenres : function() {
      {
        document.querySelector('.customSelect p').innerHTML = '';
        if(customSelect.arrayOfChosenGenres.length >= 1) {
          customSelect.arrayOfChosenGenres.forEach((value) => {
            document.querySelector('.customSelect p').innerHTML += value + ', ';
          });
        } else {
          document.querySelector('.customSelect p').innerHTML = 'Meer Genres...';
        }
      }
    }
  };

  const result$1 = {
    init: function() {
      if(document.querySelector('.result-container')) {
        this.currentPage.page = 0;
        this.next();
        this.back();
        this.checkResults();
        this.pageIndicator();
        document.querySelector('.previous-result').classList.add('inactive');
      }
    },
    next: function() {
      const nextButton = document.querySelector('.next-result');
      const self = this;

      nextButton.addEventListener('click', function() {
        const resultsContainer = document.querySelectorAll('.results');
        document.querySelector('.previous-result').classList.remove('inactive');

        let currentPage = self.currentPage.page;
        let nextPage = currentPage + 1;

        //If the user is on the last page on the result page, add inactive state
        //to the next result button
        if (nextPage == resultsContainer.length - 1) {
          document.querySelector('.next-result').classList.add('inactive');
        }

        //Check if the next result page exit. If exist make it active
        if(resultsContainer[nextPage] != undefined) {
          resultsContainer.forEach((i) => {
            i.classList.remove('active');
          });
          resultsContainer[nextPage].classList.add('active');
          self.currentPage.page = nextPage;
        }

        self.pageIndicator();
      });
    },
    back: function() {
      const backButton = document.querySelector('.previous-result');
      const self = this;

      backButton.addEventListener('click', function() {
        const resultsContainer = document.querySelectorAll('.results');

        let currentPage = self.currentPage.page;
        let previousPage = currentPage - 1;

        //Add active state to next result button
        document.querySelector('.next-result').classList.remove('inactive');

        //If the user is on the first page, make the previous button in-active
        if(previousPage == 0) {
          document.querySelector('.previous-result').classList.add('inactive');
        }

        /*Check first if the resultpage exist. If it exist make it than active*/
        if(resultsContainer[previousPage]) {
          resultsContainer.forEach((i) => {
            i.classList.remove('active');
          });
          resultsContainer[previousPage].classList.add('active');
          self.currentPage.page = previousPage;
        } else {
          document.querySelector('.previous-result').classList.add('inactive');
        }

        self.pageIndicator();
      });
    },
    checkResults: function() {
      //If there is only one result page make the 'next page' button inactive
      const resultContainer = document.querySelectorAll('.results').length;

      if(resultContainer === 1) {
        document.querySelector('.next-result').classList.add('inactive');
      }
    },
    pageIndicator: function() {
      //Count how many result pages we have and put that in the in HTML
      const totalResultPages = document.querySelectorAll('.results').length;
      document.querySelector('.total-page').innerHTML = totalResultPages;

      //+1 because the user starts at page 1 and not 0
      let position = this.currentPage.page+1; 

      //When the user click the next/previous button we will change
      //the position indicator
      document.querySelector('.position').innerHTML = position;
    },
    currentPage: {
      page : 0
    }
  };

  const bookLocation = {
    init: function() {
      if(document.querySelector('.detailInformation button')){
        this.showLocation();
        this.hideLocation();
      }
    },
    showLocation: function() {
      document.querySelector('.detailInformation button').addEventListener('click', () => {
        document.querySelector('.bookLocation').classList.add('active');
      });
    },
    hideLocation: function() {
      document.querySelector('.bookLocation button').addEventListener('click', () => {
        document.querySelector('.bookLocation').classList.remove('active');
      });
    }
  };

  const zeroState = {
    init: function() {
      if(document.querySelector('.zeroState button')) {
        this.hideZeroState();
        this.showZeroState();
        this.checkZeroState();
      }
    },
    showZeroState: function() {
      document.querySelector('header button').addEventListener('click', () => {
        document.querySelector('.zeroState').classList.remove('inactive');
      });
    },
    hideZeroState: function() {
      document.querySelector('.zeroState button').addEventListener('click', () => {
        document.querySelector('.zeroState').classList.add('inactive');
      });
    },
    checkZeroState: function() {
      if(zeroState.select.title.value !== '' || zeroState.select.author.value !== '' || zeroState.select.language.value !== 'none' || zeroState.select.age.value !== 'none' || zeroState.select.year.value !== '') {
        document.querySelector('.zeroState').classList.add('inactive');
      }
    },
    select: {
      title: document.querySelector('#title'),
      author: document.querySelector('#author'),
      language: document.querySelector('#language'),
      age: document.querySelector('#age'),
      year: document.querySelector('#year'),
    }
  };

  let app = {
    init: function() {
      bookForm.init();
      mainBook.init();
      result$1.init();
      bookLocation.init();
      zeroState.init();
    }
  };

  app.init();

}());
