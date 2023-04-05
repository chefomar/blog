document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.getElementsByClassName('splide');
    var splide;
    for (var i = 0; i < sliders.length; i++) {
       splide = new Splide('#' + sliders[i].id, {
          type: 'loop',
          autoHeight: true,
          arrows: false,
          gap: '1em',
          mediaQuery: 'min',
          breakpoints: {
              1000: {
                  arrows: true
              }
          }
      });
      splide.mount();
    }
  });