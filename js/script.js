(function () {
  'use strict'; // import './components/event-archive';

  let programmNavLink = document.querySelectorAll('.programm__nav-li');
  [].forEach.call(programmNavLink, function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault(); // console.log(e.target.tagName);

      if (e.target.tagName === 'A') document.querySelector('.programm__nav-link--active').classList.remove('programm__nav-link--active');
      document.querySelector('.programm__nav-li--active').classList.remove('programm__nav-li--active');
      document.querySelector('.programm__description-inner--active').classList.remove('programm__description-inner--active');
      item.classList.add('programm__nav-li--active');
      let id = e.target.href.split('#')[1];
      document.querySelector('#' + id).classList.add('programm__description-inner--active');
      e.target.classList.add('programm__nav-link--active');
    });
  });
  $(document).ready(function () {
    var $sliderFirst = $('.slider_first');

    if ($sliderFirst.length) {
      var currentSlide;
      var slidesCount;
      var sliderCounter = document.querySelectorAll('.numSlides--first');

      var updateSliderCounter = function (slick, currentIndex, counter) {
        currentSlide = slick.slickCurrentSlide() + 1;
        slidesCount = slick.slideCount;
        $(counter).text(function (n) {
          return currentSlide + '/' + slidesCount;
        });
      };

      $sliderFirst.on('init', function (event, slick, currentSlide) {
        let counter = sliderCounter;
        updateSliderCounter(slick, currentSlide, counter);
      });
      $sliderFirst.on('afterChange', function (event, slick, currentSlide) {
        let counter = sliderCounter;
        updateSliderCounter(slick, currentSlide, counter);
      });
      $('.slider_first').slick({
        infinite: true,
        dots: true,
        customPaging: function (slider, i) {
          console.log(slider, i);
          return '<span class="dot"></span>';
        },
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev-frst'),
        nextArrow: $('.next-frst'),
        autoplay: true,
        autoplaySpeed: 3000
      });
    }

    let countFirst = $('.life .slick-dots > li').length;
    $('.life .slick-dots > li').css({
      width: 'calc(1 / ' + countFirst + ' * 100% - (1 - 1 / ' + countFirst + ') * 4.4px)'
    });
    var $sliderSecond = $('.slider_second');

    if ($sliderSecond.length) {
      var sliderCounterSecond = document.querySelector('.numSlides--second');
      $sliderSecond.on('init', function (event, slick, currentSlide) {
        let counter = sliderCounterSecond;
        updateSliderCounter(slick, currentSlide, counter);
      });
      $sliderSecond.on('afterChange', function (event, slick, currentSlide) {
        let counter = sliderCounterSecond;
        updateSliderCounter(slick, currentSlide, counter);
      });
      $('.slider_second').slick({
        infinite: true,
        dots: false,
        customPaging: function (slider, i) {
          console.log(slider, i);
          return '<span class="dot"></span>';
        },
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('.prev-sec'),
        nextArrow: $('.next-sec'),
        autoplay: true,
        autoplaySpeed: 9000,
        responsive: [{
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }]
      });
    }

    $('.slider_third').slick({
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false // prevArrow: $('.prev-frst'),
      // nextArrow: $('.next-frst'),
      // autoplay: true,
      // autoplaySpeed: 3000,

    });
  }); // window.addEventListener('scroll', myFunction());
  // function myFunction() {
  //   var elmnt = document.getElementByTagName('html');
  //   var y = elmnt.scrollTop;
  //   document.getElementById ("demo").innerHTML = "Horizontally: " + x + "px<br>Vertically: " + y + "px";
  // }

  let header = document.querySelector('.main__header');
  let headerMail = document.querySelector('.main__header-mail');
  let headerPhone = document.querySelector('.main__header-phone');
  let headerUniver = document.querySelector('.main__header-univer');
  let citySelect = document.querySelector('.main__header-city--top');
  let citySelected = document.querySelectorAll('.city__selected');
  let citySelectMob = document.querySelector('.main__header-city--bottom');
  let logo = document.querySelector('.logo__text');
  let nav = document.querySelector('.nav');
  let navLinks = document.querySelector('.nav__links-inner');
  let navButton = document.querySelector('.nav__button');
  let cityList = document.querySelectorAll('.city__list');
  let cityItem = document.querySelectorAll('.city__list-item');
  let mFooterBut = document.querySelector('.mfooter__button');
  let toggle = document.querySelector('.toggle');
  toggle.addEventListener("click", function () {
    if (!document.querySelector('.main__header--active')) {
      header.classList.add('main__header--active');
      nav.classList.add('nav--active');
      window.scrollBy(0, 1);
    } else {
      header.classList.remove('main__header--active');
      nav.classList.remove('nav--active');
      window.scrollBy(0, 1);
      window.scrollBy(0, -2);
    }
  });
  citySelected.forEach(div => {
    div.addEventListener("click", function () {
      if (!document.querySelector('.city__list--active')) {
        cityList.forEach(list => {
          list.classList.add('city__list--active');
        });
        citySelected.forEach(item => {
          item.classList.add('city__selected--active');
        });

        if (window.innerWidth > 959) {
          if ($('.toggle--scroll').ready().length > 0) {
            $('.city__selected.city__selected--active').css({
              'background': '#fff'
            });
            $('.city__list--active').css({
              'background': '#fff'
            });
            $('.city__list--active .city__list-item').css({
              'color': '#000'
            });
          } else {
            $('.city__selected.city__selected--active').css({
              'background': '#393939'
            });
            $('.city__list--active').css({
              'background': '#393939'
            });
            $('.city__list--active .city__list-item').css({
              'color': '#fff'
            });
          }
        }
      } else {
        cityList.forEach(list => {
          list.classList.remove('city__list--active');
        });
        citySelected.forEach(item => {
          item.classList.remove('city__selected--active');
        });

        if (window.innerWidth > 959) {
          $('.city__selected').css({
            'background': 'unset'
          });
        }
      }
    });
  });
  cityItem.forEach(div => {
    div.addEventListener("click", function (e) {
      // console.log(e.target.innerHTML);
      if (document.querySelector('.city__list-item--active')) {
        document.querySelectorAll('.city__list-item--active').forEach(item => {
          item.classList.remove('city__list-item--active');
        }); // } else {

        e.target.classList.add('city__list-item--active');
        citySelected.forEach(list => {
          list.innerHTML = e.target.innerHTML;
        });
        cityList.forEach(list => {
          list.classList.remove('city__list--active');
        });
        citySelected.forEach(item => {
          item.classList.remove('city__selected--active');
        });
      }
    });
  });
  mFooterBut.addEventListener("click", function (e) {
    if (!document.querySelector('.mfooter__button--active')) {
      e.target.classList.add('mfooter__button--active');
      document.querySelector('.mfooter__messengers').classList.add('mfooter__messengers--active');
    } else {
      e.target.classList.remove('mfooter__button--active');
      document.querySelector('.mfooter__messengers').classList.remove('mfooter__messengers--active');
    }
  });
  document.querySelector('.city__close').addEventListener('click', function () {
    if (document.querySelector('.city__list--active')) {
      cityList.forEach(list => {
        list.classList.remove('city__list--active');
      });
    }
  });
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > 0) {
      header.style.cssText = "background-color: #fff; color: #000;";
      toggle.classList.add('toggle--scroll');
      headerMail.classList.add('main__header-mail--scroll');
      headerPhone.classList.add('main__header-phone--scroll');
      headerUniver.classList.add('main__header-univer--scroll');
      citySelect.classList.add('main__header-city--top--scroll');
      citySelectMob.classList.add('main__header-city--bottom--scroll');
      logo.classList.add('logo__text--scroll');
      navLinks.classList.add('nav__links-inner--scroll');
      navButton.classList.add('nav__button--scroll');

      if (window.innerWidth > 959) {
        $('.city__selected.city__selected--active').css({
          'background': '#fff'
        });
        $('.city__list--active').css({
          'background': '#fff'
        });
        $('.city__list--active .city__list-item').css({
          'color': '#000'
        });
      }
    } else {
      if (!document.querySelector('.main__header--active') && !document.querySelector('.main__header--active')) {
        header.style.cssText = "background-color: unset;";
        toggle.classList.remove('toggle--scroll');
        headerMail.classList.remove('main__header-mail--scroll');
        headerPhone.classList.remove('main__header-phone--scroll');
        headerUniver.classList.remove('main__header-univer--scroll');
        citySelect.classList.remove('main__header-city--top--scroll');
        citySelectMob.classList.remove('main__header-city--bottom--scroll');
        logo.classList.remove('logo__text--scroll');
        navLinks.classList.remove('nav__links-inner--scroll');
        navButton.classList.remove('nav__button--scroll');

        if (window.innerWidth > 959) {
          $('.city__selected.city__selected--active').css({
            'background': '#393939'
          });
          $('.city__list--active').css({
            'background': '#393939'
          });
          $('.city__list--active .city__list-item').css({
            'color': '#fff'
          });
        }
      }
    } // if ($('.main__header-city--top--scroll')) {
    //     $('.city__selected--active').css({
    //         'background':'#fff'
    //     });
    //     $('.city__list--activee').css({
    //         'background':'#fff'
    //     });
    // };


    if (st > lastScrollTop) {
      header.classList.add('main__header--scroll');
    } else {
      header.classList.remove('main__header--scroll');
    }

    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }, false);
  let aboutPopup = document.querySelector('.about__popup');
  let lifePopup = document.querySelector('.life__popup');

  if (document.querySelector('.about__video-inner')) {
    document.querySelector('.about__video-inner').addEventListener('click', function () {
      if (!document.querySelector('.popup__video--active')) {
        aboutPopup.classList.add('popup__video--active');
      } else {
        aboutPopup.classList.remove('popup__video--active');
      }
    });
  }

  document.querySelectorAll('.life__slide-img').forEach(div => {
    div.addEventListener('click', function () {
      console.log(div.id);

      if (!document.querySelector('.life__popup--active')) {
        document.querySelector("." + div.id).classList.add('life__popup--active');
      }
    });
  });
  document.querySelectorAll('.intensives__item-preview').forEach(div => {
    div.addEventListener('click', function () {
      console.log(div.id);

      if (!document.querySelector('.intensives__popup--active')) {
        document.querySelector("." + div.id).classList.add('intensives__popup--active');
      }
    });
  });
  document.querySelectorAll('.smi__slide-preview').forEach(div => {
    div.addEventListener('click', function () {
      console.log(div.id);

      if (!document.querySelector('.smi__popup--active')) {
        document.querySelector("." + div.id).classList.add('smi__popup--active');
      }
    });
  });
  document.querySelectorAll('.popup__video--close').forEach(div => {
    div.addEventListener('click', function () {
      if (document.querySelector('.life__popup--active')) {
        document.querySelector('.life__popup--active').classList.remove('life__popup--active');
      }

      if (document.querySelector('.sucsess__popup--active')) {
        document.querySelector('.sucsess__popup--active').classList.remove('sucsess__popup--active');
      }

      if (document.querySelector('.reviews__popup--active')) {
        document.querySelector('.reviews__popup--active').classList.remove('reviews__popup--active');
      }

      if (document.querySelector('.intensives__popup--active')) {
        document.querySelector('.intensives__popup--active').classList.remove('intensives__popup--active');
      }

      if (document.querySelector('.smi__popup--active')) {
        document.querySelector('.smi__popup--active').classList.remove('smi__popup--active');
      }
    });
  });
  document.querySelectorAll('.sucsess__slide__img').forEach(div => {
    div.addEventListener('click', function () {
      console.log(div.id);

      if (!document.querySelector('.sucsess__popup--active')) {
        document.querySelector("." + div.id).classList.add('sucsess__popup--active');
      }
    });
  });
  document.querySelectorAll('.reviews__item').forEach(div => {
    div.addEventListener('click', function () {
      console.log(div.id);

      if (!document.querySelector('.reviews__popup--active')) {
        document.querySelector("." + div.id).classList.add('reviews__popup--active');
      }
    });
  });

  if (document.querySelector('.grant__form')) {
    document.querySelector('.grant__form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.grant__form').style = "display:none";
      document.querySelector('.grant__title').innerHTML = "Ваша заявка принята!";
      document.querySelector('.grant__sucsess').classList.add('grant__sucsess--active');
      console.log(e.target);
    });
  }

  if (document.querySelector('.request__form')) {
    document.querySelector('.request__form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.request__form').style = "display:none";
      document.querySelector('.request__title').innerHTML = "Ваша заявка принята!";
      document.querySelector('.request__sucsess').classList.add('request__sucsess--active');
      document.querySelector('.request__inner').classList.add('request__inner--active');
      console.log(e.target);
    });
  }

  if (document.querySelector('.event__form')) {
    document.querySelector('.event__form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.event__form').style = "display:none";
      document.querySelector('.event__title').classList.add('hidden');
      document.querySelector('.event__title--sucsess').classList.add('active');
      document.querySelector('.event__sucsess').classList.add('event__sucsess--active');
      document.querySelector('.event__inner').classList.add('event__inner--active');
      console.log(e.target);
    });
  }

  if (document.querySelectorAll('.events__item')) {
    let i = 0;

    if (document.querySelectorAll('.events__item').length < 9) {
      document.querySelectorAll('.events__item').forEach(div => {
        div.style.order = 0;
      });
    } else {
      document.querySelectorAll('.events__item').forEach(div => {
        if (i < 8) {
          div.style.order = 0;
        } else {
          div.style.order = 2;
        }

        i++;
      });
    }
  }

  if (document.querySelectorAll('.upcoming__item')) {
    let i = 0;

    if (document.querySelectorAll('.upcoming__item').length < 9) {
      document.querySelectorAll('.upcoming__item').forEach(div => {
        div.style.order = 0;
      });
    } else {
      document.querySelectorAll('.upcoming__item').forEach(div => {
        if (i < 8) {
          div.style.order = 0;
        } else {
          div.style.order = 2;
        }

        i++;
      });
    }
  }

  if (document.querySelectorAll('.upcoming__item-date-day')) {
    document.querySelectorAll('.upcoming__item-date-day').forEach(div => {
      if (div.innerHTML.length < 3) {
        div.classList.add('upcoming__item-date-day--big');
      }
    });
  }

  if (document.querySelectorAll('.events__item-date-day')) {
    document.querySelectorAll('.events__item-date-day').forEach(div => {
      if (div.innerHTML.length < 3) {
        div.classList.add('events__item-date-day--big');
      }
    });
  }

  if (document.querySelector('.prevent__button--reg')) {
    document.querySelector('.prevent__button--reg').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.prevent__popup').classList.add('prevent__popup--active');
      document.querySelector('.prevent__pup__close').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.prevent__popup').classList.remove('prevent__popup--active');
      });
    });
  }

  $(document).ready(function () {
    $('.prevent__slider-inner').slick({
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.prev-event'),
      nextArrow: $('.next-event'),
      // autoplay: true,
      autoplaySpeed: 3000
    });
    $('.events__button').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, '300');
    });
  });

  if (document.querySelector('.prevent__pup__form')) {
    document.querySelector('.prevent__pup__form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.prevent__pup__form').style = "display:none"; // document.querySelector('.event__title').classList.add('hidden');
      // document.querySelector('.event__title--sucsess').classList.add('active');

      document.querySelector('.prevent__pup__sucsess').classList.add('prevent__pup__sucsess--active');
      document.querySelector('.prevent__pup__inner').classList.add('prevent__pup__inner--active');
      console.log(e.target);
    });
  }

  if (document.querySelector('.aplicForm__form')) {
    document.querySelector('.aplicForm__form').addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.aplicForm__form').style = "display:none";
      document.querySelector('.aplicForm__title').innerHTML = "Ваша заявка принята!";
      document.querySelector('.aplicForm__sucsess').classList.add('aplicForm__sucsess--active');
      console.log(e.target);
    });
  }

  if (document.querySelector('.directions__item-button')) {
    $('.directions__item-button').click(function () {
      $(this).toggleClass('directions__item-button--active'); // $('.directions__item-button--active ~ .directions__item-subjects').toggleClass('directions__item-subjects--active');
      // console.log($(this).sibling());
    });
  }

  $(document).ready(function () {
    $('.photoSlider__slider').slick({
      infinite: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.prev-ps'),
      nextArrow: $('.next-ps'),
      // autoplay: true,
      autoplaySpeed: 3000
    });
    $('.swork__slider-top').slick({
      infinite: true,
      dots: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $('.prev-swork'),
      nextArrow: $('.next-swork'),
      // autoplay: true,
      autoplaySpeed: 3000,
      responsive: [{
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $('.smi__slider').slick({
      infinite: true,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $('.prev-smi'),
      nextArrow: $('.next-smi'),
      autoplaySpeed: 3000,
      responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    function sideScroll(element, direction, speed, distance, step) {
      let scrollAmount = 0;
      var slideTimer = setInterval(function () {
        if (direction == 'left') {
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }

        scrollAmount += step;

        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer);
        }
      }, speed);
    }

    $('.next-stages').click(function () {
      var container = document.querySelector(".container__overflow--active");
      sideScroll(container, 'right', 10, 200, 10);
    });
    $('.prev-stages').click(function () {
      var container = document.querySelector(".container__overflow--active");
      sideScroll(container, 'left', 10, 200, 10);
    });

    if (document.querySelector(".main__aplic-item--bac")) {
      document.querySelector(".main__aplic-item--bac").addEventListener('click', function () {
        document.querySelector(".main__aplic-item--bac").classList.add('main__aplic-item--active');
        document.querySelector(".main__aplic-item--mag").classList.remove('main__aplic-item--active');
        document.querySelector(".container__overflow-bachelor").classList.add('container__overflow--active');
        document.querySelector(".container__overflow-magister").classList.remove('container__overflow--active');
      });
      document.querySelector(".main__aplic-item--mag").addEventListener('click', function () {
        document.querySelector(".main__aplic-item--mag").classList.add('main__aplic-item--active');
        document.querySelector(".main__aplic-item--bac").classList.remove('main__aplic-item--active');
        document.querySelector(".container__overflow-magister").classList.add('container__overflow--active');
        document.querySelector(".container__overflow-bachelor").classList.remove('container__overflow--active');
      });
    }

    $('.sachive__button').on('click', function () {
      $('.sachive__item--hidden').slideToggle();
    });
    $(".docum__inner").slick({
      infinite: true,
      dots: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: $('.prev-doc'),
      nextArrow: $('.next-doc'),
      autoplaySpeed: 3000,
      responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: "unslick"
      }]
    });

    if ($('.directions__item:last-child').ready()) {
      $('.directions__item').css({
        'min-height': '0px'
      });
      let fItem = $('.directions__item:first-child').outerHeight();
      let sItem = $('.directions__item:last-child').outerHeight();

      if (fItem > sItem) {
        $('.directions__item').css({
          'min-height': fItem + 'px'
        });
      } else {
        $('.directions__item').css({
          'min-height': sItem + 'px'
        });
      }

      console.log(fItem);
    }

    window.addEventListener('resize', function () {
      console.log(this.window.innerWidth, $('.docum__inner').hasClass('slick-initialized'));

      if (this.window.innerWidth > 479) {
        if (!$('.docum__inner').hasClass('slick-initialized')) {
          $(".docum__inner").slick({
            infinite: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: $('.prev-doc'),
            nextArrow: $('.next-doc'),
            autoplaySpeed: 3000,
            responsive: [{
              breakpoint: 960,
              settings: {
                slidesToShow: 3
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesToShow: 2
              }
            }, {
              breakpoint: 480,
              settings: "unslick"
            }]
          });
        }
      }

      if ($('.directions__item:first-child').ready()) {
        $('.directions__item').css({
          'min-height': '0px'
        });
        setTimeout(() => {
          let fItem = $('.directions__item:first-child').outerHeight();
          let sItem = $('.directions__item:last-child').outerHeight();

          if (fItem > sItem) {
            $('.directions__item').css({
              'min-height': fItem + 'px'
            });
          } else {
            $('.directions__item').css({
              'min-height': sItem + 'px'
            });
          }
        }, 100);
      }
    });
    $('.teachers__button').on('click', function (e) {
      e.preventDefault();
      $('.teachers__inner:last-child').slideToggle();
    });
    $('.main__button--index').on('click', function (e) {
      e.preventDefault();
      $("html, body").animate({
        scrollTop: $('.programm').offset().top - 140
      }, 600);
    });
  });
})();