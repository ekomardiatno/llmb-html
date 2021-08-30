/* ============================================= *
 *    __   ___ _______  ___  ___  _______        *
 *   |  | /  /|       ||   \/   ||   _   |       *
 *   |  |/  / |   _   ||        ||  |_|  |       *
 *   |     /  |  | |  ||  |\/|  ||   _   |       *
 *   |     \  |  |_|  ||  |  |  ||  | |  |       *
 *   |  |\  \ |       ||  |  |  ||  | |  |  _    *
 *   |__| \__\|_______||__|  |__||__| |__| (_)   *
 *                                               *
 *          Copyright 2021 Eko Mardiatno         *
 *              instagram.com/komafx             *
 *               facebook.com/emrdtn             *
 *            twitter.com/ekomardiatno           *
 * ============================================= */

+function ($) {
  'use strict'

  $.fn.affix = function (props) {
    var $this = this
    return $this.each(function () {
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