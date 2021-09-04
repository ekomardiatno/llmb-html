+function ($) {
  'use strict'

  $.fn.affix = function (props) {
    var $this = this
    return $this.each(function () {
      if($(window).scrollTop() >= props.top) $this.addClass('affix')
      $(window).on('scroll', function (e) {
        if (e.currentTarget.scrollY >= props.top) {
          $this.addClass('affix')
        } else {
          $this.removeClass('affix')
        }
      })
    })
  }
}(jQuery)

$('nav.scrlspy-affix').affix({
  top: $('nav.scrlspy-affix').attr('data-top-target') ? parseInt($('nav.scrlspy-affix').attr('data-top-target')) : 50
})