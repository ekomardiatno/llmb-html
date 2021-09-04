+function ($) {
  'use strict'
  $.fn.owl = function (props) {
    return this.each(function () {
      $(this).owlCarousel({
        loop: false,
        margin: 30,
        autoplay: true,
        lazyLoad: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      })
    })
  }
}(jQuery)

$('.owl-carousel').owl()