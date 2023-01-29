// Import Vendors
import $ from "jquery";
// import * as Popper from "@popperjs/core";
// import * as bootstrap from "bootstrap";
// // Import Vendors
// import SwiperCore, {
//   Swiper,
//   Navigation,
//   Pagination,
//   Autoplay,
//   EffectFade,
//   Thumbs,
// } from "swiper/core";
// import Swup from "swup";
// import SwupFormsPlugin from "@swup/forms-plugin";
// import SwupScrollPlugin from "@swup/scroll-plugin";

// window.Swiper = Swiper;

window.$ = $;
window.jQuery = $;
// window.Popper = Popper;
// window.bootstrap = bootstrap;

/* ------------------------------------------------------------------------- *
 * INIT COMPONENTS
 * ------------------------------------------------------------------------- */
(function ($) {
  function appScript() {
    var rtlPage =
      $("html").attr("dir") == "rtl" || $("html").attr("lang") == "ar"
        ? true
        : false;

    // (function () {
    //   $(".loading").animate(
    //     {
    //       opacity: 1,
    //     },
    //     {
    //       duration: 500,
    //     }
    //   );
    //   setTimeout(function () {
    //     $(".preloader-number").each(function () {
    //       var $this = $(this),
    //         countTo = $this.attr("data-count");
    //       $({
    //         countNum: $this.text(),
    //       }).animate(
    //         {
    //           countNum: countTo,
    //         },
    //         {
    //           duration: 1000,
    //           easing: "swing",
    //           step: function () {
    //             $this.text(Math.floor(this.countNum));
    //           },
    //         }
    //       );
    //     });
    //     $(".bar").animate(
    //       {
    //         height: "100%",
    //       },
    //       {
    //         duration: 1000,
    //         complete: function () {
    //           $(".preloader").addClass("hidden");
    //         },
    //       }
    //     );
    //   }, 400);
    // })();
    // Header
    (function () {
      var header = $(".header"),
        headerOffset = $(".header").offset();

      $(window).on("scroll", function () {
        if (header.length > 0) {
          if ($(window).scrollTop() >= headerOffset.top + 50) {
            header.addClass("sticking");
          } else {
            header.removeClass("sticking");
          }
        }
      });
    })();

    // Menu
    (function () {
      // Open Menu
      $("[data-toggle='menu']").on("click", function (e) {
        e.preventDefault();
        var dataTarget = $(this).data("target");
        $(dataTarget).fadeIn();
        $(dataTarget).addClass("opened");
        if (rtlPage) {
          $(dataTarget + " .app-menu__offcanvas").animate({ right: 0 }, 400);
        } else {
          $(dataTarget + " .app-menu__offcanvas").animate({ left: 0 }, 400);
        }
      });

      // Close Menu
      $("[data-dismiss='menu']").on("click", function (e) {
        e.preventDefault();
        var getMenu = $(this).parents(".app-menu");
        var menuW = getMenu.find(".app-menu__offcanvas").width();
        if (rtlPage) {
          getMenu.find(".app-menu__offcanvas").animate({ right: -menuW }, 400);
        } else {
          getMenu.find(".app-menu__offcanvas").animate({ left: -menuW }, 400);
        }
        getMenu.fadeOut();
        getMenu.removeClass("opened");
      });

      $(".app-menu").on("click", function (e) {
        e.preventDefault();
        var menuW = $(this).find(".app-menu__offcanvas").width();
        if (rtlPage) {
          $(this).find(".app-menu__offcanvas").animate({ right: -menuW }, 400);
        } else {
          $(this).find(".app-menu__offcanvas").animate({ left: -menuW }, 400);
        }
        $(this).fadeOut();
        $(this).removeClass("opened");
      });

      $(document).keydown(function (e) {
        if (e.keyCode == 27) {
          var menuW = $(".app-menu .app-menu__offcanvas").width();
          $(".app-menu .app-menu__offcanvas").animate({ left: -menuW }, 400);
          $(".app-menu").fadeOut();
          $(".app-menu").removeClass("opened");
        }
      });

      // Stop Propagation Menu Offcanvas
      $(".app-menu .app-menu__offcanvas").on("click", function (e) {
        e.stopPropagation();
      });
    })();

    // Modal
    (function () {
      // Open Modal
      $("[data-toggle='modal']").on("click", function (e) {
        e.preventDefault();
        var dataTarget = $(this).data("target");
        $(dataTarget).fadeIn();
        $(dataTarget).addClass("opened");
        var $videoSrc;
        $videoSrc = $(this).attr("data-video");
        if ($videoSrc) {
          $(dataTarget + " iframe").attr(
            "src",
            $videoSrc + "?autoplay=0&amp;modestbranding=1&amp;showinfo=0"
          );
        }
      });

      // Close Modal
      $("[data-dismiss='modal']").on("click", function (e) {
        e.preventDefault();
        var getModal = $(this).parents(".app-modal");
        getModal.fadeOut();
        getModal.removeClass("opened");
        getModal.find("iframe").attr("src", "");
      });

      $("[data-dismiss='form']").on("submit", function (e) {
        // e.preventDefault();
        var getModal = $(this).parents(".app-modal");
        getModal.fadeOut();
        getModal.removeClass("opened");
      });

      $(".app-modal").on("click", function (e) {
        e.preventDefault();
        $(this).fadeOut();
        $(this).removeClass("opened");
        $(this + " iframe").attr("src", "");
      });

      $(document).on("keydown", function (e) {
        if (e.keyCode == 27) {
          $(".app-modal").fadeOut();
          $(".app-modal").removeClass("opened");
        }
      });
      // Stop Propagation app-modal Offcanvas
      $(".app-modal .app-modal-container").on("click", function (e) {
        e.stopPropagation();
      });
    })();
    (function () {
      $("[data-form]").on("click", function (e) {
        e.preventDefault();
        var thisELe = $(this).data("form");
        $(this).parents(".app-modal-container").find(".auth-form").hide();
        $(this)
          .parents(".app-modal-container")
          .find("." + thisELe + "-auth-form")
          .show();
      });
    })();
  }
  $(function () {
    appScript();
  });
})(jQuery);

 