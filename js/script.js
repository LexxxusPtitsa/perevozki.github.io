(function () {
  'use strict';

  !function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
  }(function (a) {
    var b,
        c = navigator.userAgent,
        d = /iphone/i.test(c),
        e = /chrome/i.test(c),
        f = /android/i.test(c);
    a.mask = {
      definitions: {
        9: "[0-9]",
        a: "[A-Za-z]",
        "*": "[A-Za-z0-9]"
      },
      autoclear: !0,
      dataName: "rawMaskFn",
      placeholder: "_"
    }, a.fn.extend({
      caret: function (a, b) {
        var c;
        if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
          this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
        })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
          begin: a,
          end: b
        });
      },
      unmask: function () {
        return this.trigger("unmask");
      },
      mask: function (c, g) {
        var h, i, j, k, l, m, n, o;

        if (!c && this.length > 0) {
          h = a(this[0]);
          var p = h.data(a.mask.dataName);
          return p ? p() : void 0;
        }

        return g = a.extend({
          autoclear: a.mask.autoclear,
          placeholder: a.mask.placeholder,
          completed: null
        }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
          "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
        }), this.trigger("unmask").each(function () {
          function h() {
            if (g.completed) {
              for (var a = l; m >= a; a++) if (j[a] && C[a] === p(a)) return;

              g.completed.call(B);
            }
          }

          function p(a) {
            return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
          }

          function q(a) {
            for (; ++a < n && !j[a];);

            return a;
          }

          function r(a) {
            for (; --a >= 0 && !j[a];);

            return a;
          }

          function s(a, b) {
            var c, d;

            if (!(0 > a)) {
              for (c = a, d = q(b); n > c; c++) if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d);
              }

              z(), B.caret(Math.max(l, a));
            }
          }

          function t(a) {
            var b, c, d, e;

            for (b = a, c = p(a); n > b; b++) if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e;
            }
          }

          function u() {
            var a = B.val(),
                b = B.caret();

            if (o && o.length && o.length > a.length) {
              for (A(!0); b.begin > 0 && !j[b.begin - 1];) b.begin--;

              if (0 === b.begin) for (; b.begin < l && !j[b.begin];) b.begin++;
              B.caret(b.begin, b.begin);
            } else {
              for (A(!0); b.begin < n && !j[b.begin];) b.begin++;

              B.caret(b.begin, b.begin);
            }

            h();
          }

          function v() {
            A(), B.val() != E && B.change();
          }

          function w(a) {
            if (!B.prop("readonly")) {
              var b,
                  c,
                  e,
                  f = a.which || a.keyCode;
              o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
            }
          }

          function x(b) {
            if (!B.prop("readonly")) {
              var c,
                  d,
                  e,
                  g = b.which || b.keyCode,
                  i = B.caret();

              if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
                if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                  if (t(c), C[c] = d, z(), e = q(c), f) {
                    var k = function () {
                      a.proxy(a.fn.caret, B, e)();
                    };

                    setTimeout(k, 0);
                  } else B.caret(e);

                  i.begin <= m && h();
                }

                b.preventDefault();
              }
            }
          }

          function y(a, b) {
            var c;

            for (c = a; b > c && n > c; c++) j[c] && (C[c] = p(c));
          }

          function z() {
            B.val(C.join(""));
          }

          function A(a) {
            var b,
                c,
                d,
                e = B.val(),
                f = -1;

            for (b = 0, d = 0; n > b; b++) if (j[b]) {
              for (C[b] = p(b); d++ < e.length;) if (c = e.charAt(d - 1), j[b].test(c)) {
                C[b] = c, f = b;
                break;
              }

              if (d > e.length) {
                y(b + 1, n);
                break;
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);

            return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
          }

          var B = a(this),
              C = a.map(c.split(""), function (a, b) {
            return "?" != a ? i[a] ? p(b) : a : void 0;
          }),
              D = C.join(""),
              E = B.val();
          B.data(a.mask.dataName, function () {
            return a.map(C, function (a, b) {
              return j[b] && a != p(b) ? a : null;
            }).join("");
          }), B.one("unmask", function () {
            B.off(".mask").removeData(a.mask.dataName);
          }).on("focus.mask", function () {
            if (!B.prop("readonly")) {
              clearTimeout(b);
              var a;
              E = B.val(), a = A(), b = setTimeout(function () {
                B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
              }, 10);
            }
          }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
            B.prop("readonly") || setTimeout(function () {
              var a = A(!0);
              B.caret(a), h();
            }, 0);
          }), e && f && B.off("input.mask").on("input.mask", u), A();
        });
      }
    });
  });
  /*!
   * Datepicker v1.0.9
   * https://fengyuanchen.github.io/datepicker
   *
   * Copyright 2014-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2019-09-21T06:57:34.100Z
   */

  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) : typeof define === 'function' && define.amd ? define(['jquery'], factory) : (global = global || self, factory(global.jQuery));
  })(undefined, function ($) {
    'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      return Constructor;
    }

    var DEFAULTS = {
      // Show the datepicker automatically when initialized
      autoShow: false,
      // Hide the datepicker automatically when picked
      autoHide: false,
      // Pick the initial date automatically when initialized
      autoPick: false,
      // Enable inline mode
      inline: false,
      // A element (or selector) for putting the datepicker
      container: null,
      // A element (or selector) for triggering the datepicker
      trigger: null,
      // The ISO language code (built-in: en-US)
      language: '',
      // The date string format
      format: 'mm/dd/yyyy',
      // The initial date
      date: null,
      // The start view date
      startDate: null,
      // The end view date
      endDate: null,
      // The start view when initialized
      startView: 0,
      // 0 for days, 1 for months, 2 for years
      // The start day of the week
      // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday,
      // 4 for Thursday, 5 for Friday, 6 for Saturday
      weekStart: 0,
      // Show year before month on the datepicker header
      yearFirst: false,
      // A string suffix to the year number.
      yearSuffix: '',
      // Days' name of the week.
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      // Shorter days' name
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      // Shortest days' name
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      // Months' name
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      // Shorter months' name
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      // A element tag for each item of years, months and days
      itemTag: 'li',
      // A class (CSS) for muted date item
      mutedClass: 'muted',
      // A class (CSS) for picked date item
      pickedClass: 'picked',
      // A class (CSS) for disabled date item
      disabledClass: 'disabled',
      // A class (CSS) for highlight date item
      highlightedClass: 'highlighted',
      // The template of the datepicker
      template: '<div class="datepicker-container">' + '<div class="datepicker-panel" data-view="years picker">' + '<ul>' + '<li data-view="years prev">&lsaquo;</li>' + '<li data-view="years current"></li>' + '<li data-view="years next">&rsaquo;</li>' + '</ul>' + '<ul data-view="years"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="months picker">' + '<ul>' + '<li data-view="year prev">&lsaquo;</li>' + '<li data-view="year current"></li>' + '<li data-view="year next">&rsaquo;</li>' + '</ul>' + '<ul data-view="months"></ul>' + '</div>' + '<div class="datepicker-panel" data-view="days picker">' + '<ul>' + '<li data-view="month prev">&lsaquo;</li>' + '<li data-view="month current"></li>' + '<li data-view="month next">&rsaquo;</li>' + '</ul>' + '<ul data-view="week"></ul>' + '<ul data-view="days"></ul>' + '</div>' + '</div>',
      // The offset top or bottom of the datepicker from the element
      offset: 10,
      // The `z-index` of the datepicker
      zIndex: 1000,
      // Filter each date item (return `false` to disable a date item)
      filter: null,
      // Event shortcuts
      show: null,
      hide: null,
      pick: null
    };
    var IS_BROWSER = typeof window !== 'undefined';
    var WINDOW = IS_BROWSER ? window : {};
    var IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
    var NAMESPACE = 'datepicker';
    var EVENT_CLICK = "click.".concat(NAMESPACE);
    var EVENT_FOCUS = "focus.".concat(NAMESPACE);
    var EVENT_HIDE = "hide.".concat(NAMESPACE);
    var EVENT_KEYUP = "keyup.".concat(NAMESPACE);
    var EVENT_PICK = "pick.".concat(NAMESPACE);
    var EVENT_RESIZE = "resize.".concat(NAMESPACE);
    var EVENT_SCROLL = "scroll.".concat(NAMESPACE);
    var EVENT_SHOW = "show.".concat(NAMESPACE);
    var EVENT_TOUCH_START = "touchstart.".concat(NAMESPACE);
    var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
    var LANGUAGES = {};
    var VIEWS = {
      DAYS: 0,
      MONTHS: 1,
      YEARS: 2
    };
    var toString = Object.prototype.toString;

    function typeOf(obj) {
      return toString.call(obj).slice(8, -1).toLowerCase();
    }

    function isString(value) {
      return typeof value === 'string';
    }

    var isNaN = Number.isNaN || WINDOW.isNaN;

    function isNumber(value) {
      return typeof value === 'number' && !isNaN(value);
    }

    function isUndefined(value) {
      return typeof value === 'undefined';
    }

    function isDate(value) {
      return typeOf(value) === 'date' && !isNaN(value.getTime());
    }

    function proxy(fn, context) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return function () {
        for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args2[_key2] = arguments[_key2];
        }

        return fn.apply(context, args.concat(args2));
      };
    }

    function selectorOf(view) {
      return "[data-view=\"".concat(view, "\"]");
    }

    function isLeapYear(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    function getDaysInMonth(year, month) {
      return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    function getMinDay(year, month, day) {
      return Math.min(day, getDaysInMonth(year, month));
    }

    var formatParts = /(y|m|d)+/g;

    function parseFormat(format) {
      var source = String(format).toLowerCase();
      var parts = source.match(formatParts);

      if (!parts || parts.length === 0) {
        throw new Error('Invalid date format.');
      }

      format = {
        source: source,
        parts: parts
      };
      $.each(parts, function (i, part) {
        switch (part) {
          case 'dd':
          case 'd':
            format.hasDay = true;
            break;

          case 'mm':
          case 'm':
            format.hasMonth = true;
            break;

          case 'yyyy':
          case 'yy':
            format.hasYear = true;
            break;

          default:
        }
      });
      return format;
    }

    function getScrollParent(element) {
      var includeHidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var $element = $(element);
      var position = $element.css('position');
      var excludeStaticParent = position === 'absolute';
      var overflowRegex = includeHidden ? /auto|scroll|hidden/ : /auto|scroll/;
      var scrollParent = $element.parents().filter(function (index, parent) {
        var $parent = $(parent);

        if (excludeStaticParent && $parent.css('position') === 'static') {
          return false;
        }

        return overflowRegex.test($parent.css('overflow') + $parent.css('overflow-y') + $parent.css('overflow-x'));
      }).eq(0);
      return position === 'fixed' || !scrollParent.length ? $(element.ownerDocument || document) : scrollParent;
    }
    /**
     * Add leading zeroes to the given value
     * @param {number} value - The value to add.
     * @param {number} [length=1] - The expected value length.
     * @returns {string} Returns converted value.
     */


    function addLeadingZero(value) {
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var str = String(Math.abs(value));
      var i = str.length;
      var result = '';

      if (value < 0) {
        result += '-';
      }

      while (i < length) {
        i += 1;
        result += '0';
      }

      return result + str;
    }

    var REGEXP_DIGITS = /\d+/g;
    var methods = {
      // Show the datepicker
      show: function show() {
        if (!this.built) {
          this.build();
        }

        if (this.shown) {
          return;
        }

        if (this.trigger(EVENT_SHOW).isDefaultPrevented()) {
          return;
        }

        this.shown = true;
        this.$picker.removeClass(CLASS_HIDE).on(EVENT_CLICK, $.proxy(this.click, this));
        this.showView(this.options.startView);

        if (!this.inline) {
          this.$scrollParent.on(EVENT_SCROLL, $.proxy(this.place, this));
          $(window).on(EVENT_RESIZE, this.onResize = proxy(this.place, this));
          $(document).on(EVENT_CLICK, this.onGlobalClick = proxy(this.globalClick, this));
          $(document).on(EVENT_KEYUP, this.onGlobalKeyup = proxy(this.globalKeyup, this));

          if (IS_TOUCH_DEVICE) {
            $(document).on(EVENT_TOUCH_START, this.onTouchStart = proxy(this.touchstart, this));
          }

          this.place();
        }
      },
      // Hide the datepicker
      hide: function hide() {
        if (!this.shown) {
          return;
        }

        if (this.trigger(EVENT_HIDE).isDefaultPrevented()) {
          return;
        }

        this.shown = false;
        this.$picker.addClass(CLASS_HIDE).off(EVENT_CLICK, this.click);

        if (!this.inline) {
          this.$scrollParent.off(EVENT_SCROLL, this.place);
          $(window).off(EVENT_RESIZE, this.onResize);
          $(document).off(EVENT_CLICK, this.onGlobalClick);
          $(document).off(EVENT_KEYUP, this.onGlobalKeyup);

          if (IS_TOUCH_DEVICE) {
            $(document).off(EVENT_TOUCH_START, this.onTouchStart);
          }
        }
      },
      toggle: function toggle() {
        if (this.shown) {
          this.hide();
        } else {
          this.show();
        }
      },
      // Update the datepicker with the current input value
      update: function update() {
        var value = this.getValue();

        if (value === this.oldValue) {
          return;
        }

        this.setDate(value, true);
        this.oldValue = value;
      },

      /**
       * Pick the current date to the element
       *
       * @param {String} _view (private)
       */
      pick: function pick(_view) {
        var $this = this.$element;
        var date = this.date;

        if (this.trigger(EVENT_PICK, {
          view: _view || '',
          date: date
        }).isDefaultPrevented()) {
          return;
        }

        date = this.formatDate(this.date);
        this.setValue(date);

        if (this.isInput) {
          $this.trigger('input');
          $this.trigger('change');
        }
      },
      // Reset the datepicker
      reset: function reset() {
        this.setDate(this.initialDate, true);
        this.setValue(this.initialValue);

        if (this.shown) {
          this.showView(this.options.startView);
        }
      },

      /**
       * Get the month name with given argument or the current date
       *
       * @param {Number} month (optional)
       * @param {Boolean} shortForm (optional)
       * @return {String} (month name)
       */
      getMonthName: function getMonthName(month, shortForm) {
        var options = this.options;
        var monthsShort = options.monthsShort;
        var months = options.months;

        if ($.isNumeric(month)) {
          month = Number(month);
        } else if (isUndefined(shortForm)) {
          shortForm = month;
        }

        if (shortForm === true) {
          months = monthsShort;
        }

        return months[isNumber(month) ? month : this.date.getMonth()];
      },

      /**
       * Get the day name with given argument or the current date
       *
       * @param {Number} day (optional)
       * @param {Boolean} shortForm (optional)
       * @param {Boolean} min (optional)
       * @return {String} (day name)
       */
      getDayName: function getDayName(day, shortForm, min) {
        var options = this.options;
        var days = options.days;

        if ($.isNumeric(day)) {
          day = Number(day);
        } else {
          if (isUndefined(min)) {
            min = shortForm;
          }

          if (isUndefined(shortForm)) {
            shortForm = day;
          }
        }

        if (min) {
          days = options.daysMin;
        } else if (shortForm) {
          days = options.daysShort;
        }

        return days[isNumber(day) ? day : this.date.getDay()];
      },

      /**
       * Get the current date
       *
       * @param {Boolean} formatted (optional)
       * @return {Date|String} (date)
       */
      getDate: function getDate(formatted) {
        var date = this.date;
        return formatted ? this.formatDate(date) : new Date(date);
      },

      /**
       * Set the current date with a new date
       *
       * @param {Date} date
       * @param {Boolean} _updated (private)
       */
      setDate: function setDate(date, _updated) {
        var filter = this.options.filter;

        if (isDate(date) || isString(date)) {
          date = this.parseDate(date);

          if ($.isFunction(filter) && filter.call(this.$element, date, 'day') === false) {
            return;
          }

          this.date = date;
          this.viewDate = new Date(date);

          if (!_updated) {
            this.pick();
          }

          if (this.built) {
            this.render();
          }
        }
      },

      /**
       * Set the start view date with a new date
       *
       * @param {Date|string|null} date
       */
      setStartDate: function setStartDate(date) {
        if (isDate(date) || isString(date)) {
          this.startDate = this.parseDate(date);
        } else {
          this.startDate = null;
        }

        if (this.built) {
          this.render();
        }
      },

      /**
       * Set the end view date with a new date
       *
       * @param {Date|string|null} date
       */
      setEndDate: function setEndDate(date) {
        if (isDate(date) || isString(date)) {
          this.endDate = this.parseDate(date);
        } else {
          this.endDate = null;
        }

        if (this.built) {
          this.render();
        }
      },

      /**
       * Parse a date string with the set date format
       *
       * @param {String} date
       * @return {Date} (parsed date)
       */
      parseDate: function parseDate(date) {
        var format = this.format;
        var parts = [];

        if (!isDate(date)) {
          if (isString(date)) {
            parts = date.match(REGEXP_DIGITS) || [];
          }

          date = date ? new Date(date) : new Date();

          if (!isDate(date)) {
            date = new Date();
          }

          if (parts.length === format.parts.length) {
            // Set year and month first
            $.each(parts, function (i, part) {
              var value = parseInt(part, 10);

              switch (format.parts[i]) {
                case 'yy':
                  date.setFullYear(2000 + value);
                  break;

                case 'yyyy':
                  // Converts 2-digit year to 2000+
                  date.setFullYear(part.length === 2 ? 2000 + value : value);
                  break;

                case 'mm':
                case 'm':
                  date.setMonth(value - 1);
                  break;

                default:
              }
            }); // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`

            $.each(parts, function (i, part) {
              var value = parseInt(part, 10);

              switch (format.parts[i]) {
                case 'dd':
                case 'd':
                  date.setDate(value);
                  break;

                default:
              }
            });
          }
        } // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)


        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      },

      /**
       * Format a date object to a string with the set date format
       *
       * @param {Date} date
       * @return {String} (formatted date)
       */
      formatDate: function formatDate(date) {
        var format = this.format;
        var formatted = '';

        if (isDate(date)) {
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var values = {
            d: day,
            dd: addLeadingZero(day, 2),
            m: month + 1,
            mm: addLeadingZero(month + 1, 2),
            yy: String(year).substring(2),
            yyyy: addLeadingZero(year, 4)
          };
          formatted = format.source;
          $.each(format.parts, function (i, part) {
            formatted = formatted.replace(part, values[part]);
          });
        }

        return formatted;
      },
      // Destroy the datepicker and remove the instance from the target element
      destroy: function destroy() {
        this.unbind();
        this.unbuild();
        this.$element.removeData(NAMESPACE);
      }
    };
    var handlers = {
      click: function click(e) {
        var $target = $(e.target);
        var options = this.options,
            date = this.date,
            viewDate = this.viewDate,
            format = this.format;
        e.stopPropagation();
        e.preventDefault();

        if ($target.hasClass('disabled')) {
          return;
        }

        var view = $target.data('view');
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var viewDay = viewDate.getDate();

        switch (view) {
          case 'years prev':
          case 'years next':
            {
              viewYear = view === 'years prev' ? viewYear - 10 : viewYear + 10;
              viewDate.setFullYear(viewYear);
              viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
              this.renderYears();
              break;
            }

          case 'year prev':
          case 'year next':
            viewYear = view === 'year prev' ? viewYear - 1 : viewYear + 1;
            viewDate.setFullYear(viewYear);
            viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
            this.renderMonths();
            break;

          case 'year current':
            if (format.hasYear) {
              this.showView(VIEWS.YEARS);
            }

            break;

          case 'year picked':
            if (format.hasMonth) {
              this.showView(VIEWS.MONTHS);
            } else {
              $target.siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'year');
              this.hideView();
            }

            this.pick('year');
            break;

          case 'year':
            viewYear = parseInt($target.text(), 10); // Set date first to avoid month changing (#195)

            date.setDate(getMinDay(viewYear, viewMonth, viewDay));
            date.setFullYear(viewYear);
            viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
            viewDate.setFullYear(viewYear);

            if (format.hasMonth) {
              this.showView(VIEWS.MONTHS);
            } else {
              $target.addClass(options.pickedClass).data('view', 'year picked').siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'year');
              this.hideView();
            }

            this.pick('year');
            break;

          case 'month prev':
          case 'month next':
            viewMonth = view === 'month prev' ? viewMonth - 1 : viewMonth + 1;

            if (viewMonth < 0) {
              viewYear -= 1;
              viewMonth += 12;
            } else if (viewMonth > 11) {
              viewYear += 1;
              viewMonth -= 12;
            }

            viewDate.setFullYear(viewYear);
            viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
            viewDate.setMonth(viewMonth);
            this.renderDays();
            break;

          case 'month current':
            if (format.hasMonth) {
              this.showView(VIEWS.MONTHS);
            }

            break;

          case 'month picked':
            if (format.hasDay) {
              this.showView(VIEWS.DAYS);
            } else {
              $target.siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'month');
              this.hideView();
            }

            this.pick('month');
            break;

          case 'month':
            viewMonth = $.inArray($target.text(), options.monthsShort);
            date.setFullYear(viewYear); // Set date before month to avoid month changing (#195)

            date.setDate(getMinDay(viewYear, viewMonth, viewDay));
            date.setMonth(viewMonth);
            viewDate.setFullYear(viewYear);
            viewDate.setDate(getMinDay(viewYear, viewMonth, viewDay));
            viewDate.setMonth(viewMonth);

            if (format.hasDay) {
              this.showView(VIEWS.DAYS);
            } else {
              $target.addClass(options.pickedClass).data('view', 'month picked').siblings(".".concat(options.pickedClass)).removeClass(options.pickedClass).data('view', 'month');
              this.hideView();
            }

            this.pick('month');
            break;

          case 'day prev':
          case 'day next':
          case 'day':
            if (view === 'day prev') {
              viewMonth -= 1;
            } else if (view === 'day next') {
              viewMonth += 1;
            }

            viewDay = parseInt($target.text(), 10); // Set date to 1 to avoid month changing (#195)

            date.setDate(1);
            date.setFullYear(viewYear);
            date.setMonth(viewMonth);
            date.setDate(viewDay);
            viewDate.setDate(1);
            viewDate.setFullYear(viewYear);
            viewDate.setMonth(viewMonth);
            viewDate.setDate(viewDay);
            this.renderDays();

            if (view === 'day') {
              this.hideView();
            }

            this.pick('day');
            break;

          case 'day picked':
            this.hideView();
            this.pick('day');
            break;

          default:
        }
      },
      globalClick: function globalClick(_ref) {
        var target = _ref.target;
        var element = this.element,
            $trigger = this.$trigger;
        var trigger = $trigger[0];
        var hidden = true;

        while (target !== document) {
          if (target === trigger || target === element) {
            hidden = false;
            break;
          }

          target = target.parentNode;
        }

        if (hidden) {
          this.hide();
        }
      },
      keyup: function keyup() {
        this.update();
      },
      globalKeyup: function globalKeyup(_ref2) {
        var target = _ref2.target,
            key = _ref2.key,
            keyCode = _ref2.keyCode;

        if (this.isInput && target !== this.element && this.shown && (key === 'Tab' || keyCode === 9)) {
          this.hide();
        }
      },
      touchstart: function touchstart(_ref3) {
        var target = _ref3.target; // Emulate click in touch devices to support hiding the picker automatically (#197).

        if (this.isInput && target !== this.element && !$.contains(this.$picker[0], target)) {
          this.hide();
          this.element.blur();
        }
      }
    };
    var render = {
      render: function render() {
        this.renderYears();
        this.renderMonths();
        this.renderDays();
      },
      renderWeek: function renderWeek() {
        var _this = this;

        var items = [];
        var _this$options = this.options,
            weekStart = _this$options.weekStart,
            daysMin = _this$options.daysMin;
        weekStart = parseInt(weekStart, 10) % 7;
        daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
        $.each(daysMin, function (i, day) {
          items.push(_this.createItem({
            text: day
          }));
        });
        this.$week.html(items.join(''));
      },
      renderYears: function renderYears() {
        var options = this.options,
            startDate = this.startDate,
            endDate = this.endDate;
        var disabledClass = options.disabledClass,
            filter = options.filter,
            yearSuffix = options.yearSuffix;
        var viewYear = this.viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var year = this.date.getFullYear();
        var start = -5;
        var end = 6;
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;

        for (i = start; i <= end; i += 1) {
          var date = new Date(viewYear + i, 1, 1);
          var disabled = false;

          if (startDate) {
            disabled = date.getFullYear() < startDate.getFullYear();

            if (i === start) {
              prevDisabled = disabled;
            }
          }

          if (!disabled && endDate) {
            disabled = date.getFullYear() > endDate.getFullYear();

            if (i === end) {
              nextDisabled = disabled;
            }
          }

          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'year') === false;
          }

          var picked = viewYear + i === year;
          var view = picked ? 'year picked' : 'year';
          items.push(this.createItem({
            picked: picked,
            disabled: disabled,
            text: viewYear + i,
            view: disabled ? 'year disabled' : view,
            highlighted: date.getFullYear() === thisYear
          }));
        }

        this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearsNext.toggleClass(disabledClass, nextDisabled);
        this.$yearsCurrent.toggleClass(disabledClass, true).html("".concat(viewYear + start + yearSuffix, " - ").concat(viewYear + end).concat(yearSuffix));
        this.$years.html(items.join(''));
      },
      renderMonths: function renderMonths() {
        var options = this.options,
            startDate = this.startDate,
            endDate = this.endDate,
            viewDate = this.viewDate;
        var disabledClass = options.disabledClass || '';
        var months = options.monthsShort;
        var filter = $.isFunction(options.filter) && options.filter;
        var viewYear = viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;

        for (i = 0; i <= 11; i += 1) {
          var date = new Date(viewYear, i, 1);
          var disabled = false;

          if (startDate) {
            prevDisabled = date.getFullYear() === startDate.getFullYear();
            disabled = prevDisabled && date.getMonth() < startDate.getMonth();
          }

          if (!disabled && endDate) {
            nextDisabled = date.getFullYear() === endDate.getFullYear();
            disabled = nextDisabled && date.getMonth() > endDate.getMonth();
          }

          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'month') === false;
          }

          var picked = viewYear === year && i === month;
          var view = picked ? 'month picked' : 'month';
          items.push(this.createItem({
            disabled: disabled,
            picked: picked,
            highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
            index: i,
            text: months[i],
            view: disabled ? 'month disabled' : view
          }));
        }

        this.$yearPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearNext.toggleClass(disabledClass, nextDisabled);
        this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
        this.$months.html(items.join(''));
      },
      renderDays: function renderDays() {
        var $element = this.$element,
            options = this.options,
            startDate = this.startDate,
            endDate = this.endDate,
            viewDate = this.viewDate,
            currentDate = this.date;
        var disabledClass = options.disabledClass,
            filter = options.filter,
            months = options.months,
            weekStart = options.weekStart,
            yearSuffix = options.yearSuffix;
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var thisDay = now.getDate();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        var length;
        var i;
        var n; // Days of prev month
        // -----------------------------------------------------------------------

        var prevItems = [];
        var prevViewYear = viewYear;
        var prevViewMonth = viewMonth;
        var prevDisabled = false;

        if (viewMonth === 0) {
          prevViewYear -= 1;
          prevViewMonth = 11;
        } else {
          prevViewMonth -= 1;
        } // The length of the days of prev month


        length = getDaysInMonth(prevViewYear, prevViewMonth); // The first day of current month

        var firstDay = new Date(viewYear, viewMonth, 1); // The visible length of the days of prev month
        // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]

        n = firstDay.getDay() - parseInt(weekStart, 10) % 7; // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

        if (n <= 0) {
          n += 7;
        }

        if (startDate) {
          prevDisabled = firstDay.getTime() <= startDate.getTime();
        }

        for (i = length - (n - 1); i <= length; i += 1) {
          var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
          var disabled = false;

          if (startDate) {
            disabled = prevViewDate.getTime() < startDate.getTime();
          }

          if (!disabled && filter) {
            disabled = filter.call($element, prevViewDate, 'day') === false;
          }

          prevItems.push(this.createItem({
            disabled: disabled,
            highlighted: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
            muted: true,
            picked: prevViewYear === year && prevViewMonth === month && i === day,
            text: i,
            view: 'day prev'
          }));
        } // Days of next month
        // -----------------------------------------------------------------------


        var nextItems = [];
        var nextViewYear = viewYear;
        var nextViewMonth = viewMonth;
        var nextDisabled = false;

        if (viewMonth === 11) {
          nextViewYear += 1;
          nextViewMonth = 0;
        } else {
          nextViewMonth += 1;
        } // The length of the days of current month


        length = getDaysInMonth(viewYear, viewMonth); // The visible length of next month (42 means 6 rows and 7 columns)

        n = 42 - (prevItems.length + length); // The last day of current month

        var lastDate = new Date(viewYear, viewMonth, length);

        if (endDate) {
          nextDisabled = lastDate.getTime() >= endDate.getTime();
        }

        for (i = 1; i <= n; i += 1) {
          var date = new Date(nextViewYear, nextViewMonth, i);
          var picked = nextViewYear === year && nextViewMonth === month && i === day;
          var _disabled = false;

          if (endDate) {
            _disabled = date.getTime() > endDate.getTime();
          }

          if (!_disabled && filter) {
            _disabled = filter.call($element, date, 'day') === false;
          }

          nextItems.push(this.createItem({
            disabled: _disabled,
            picked: picked,
            highlighted: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
            muted: true,
            text: i,
            view: 'day next'
          }));
        } // Days of current month
        // -----------------------------------------------------------------------


        var items = [];

        for (i = 1; i <= length; i += 1) {
          var _date = new Date(viewYear, viewMonth, i);

          var _disabled2 = false;

          if (startDate) {
            _disabled2 = _date.getTime() < startDate.getTime();
          }

          if (!_disabled2 && endDate) {
            _disabled2 = _date.getTime() > endDate.getTime();
          }

          if (!_disabled2 && filter) {
            _disabled2 = filter.call($element, _date, 'day') === false;
          }

          var _picked = viewYear === year && viewMonth === month && i === day;

          var view = _picked ? 'day picked' : 'day';
          items.push(this.createItem({
            disabled: _disabled2,
            picked: _picked,
            highlighted: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
            text: i,
            view: _disabled2 ? 'day disabled' : view
          }));
        } // Render days picker
        // -----------------------------------------------------------------------


        this.$monthPrev.toggleClass(disabledClass, prevDisabled);
        this.$monthNext.toggleClass(disabledClass, nextDisabled);
        this.$monthCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(options.yearFirst ? "".concat(viewYear + yearSuffix, " ").concat(months[viewMonth]) : "".concat(months[viewMonth], " ").concat(viewYear).concat(yearSuffix));
        this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
      }
    };
    var CLASS_TOP_LEFT = "".concat(NAMESPACE, "-top-left");
    var CLASS_TOP_RIGHT = "".concat(NAMESPACE, "-top-right");
    var CLASS_BOTTOM_LEFT = "".concat(NAMESPACE, "-bottom-left");
    var CLASS_BOTTOM_RIGHT = "".concat(NAMESPACE, "-bottom-right");
    var CLASS_PLACEMENTS = [CLASS_TOP_LEFT, CLASS_TOP_RIGHT, CLASS_BOTTOM_LEFT, CLASS_BOTTOM_RIGHT].join(' ');

    var Datepicker = /*#__PURE__*/function () {
      function Datepicker(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Datepicker);

        this.$element = $(element);
        this.element = element;
        this.options = $.extend({}, DEFAULTS, LANGUAGES[options.language], $.isPlainObject(options) && options);
        this.$scrollParent = getScrollParent(element, true);
        this.built = false;
        this.shown = false;
        this.isInput = false;
        this.inline = false;
        this.initialValue = '';
        this.initialDate = null;
        this.startDate = null;
        this.endDate = null;
        this.init();
      }

      _createClass(Datepicker, [{
        key: "init",
        value: function init() {
          var $this = this.$element,
              options = this.options;
          var startDate = options.startDate,
              endDate = options.endDate,
              date = options.date;
          this.$trigger = $(options.trigger);
          this.isInput = $this.is('input') || $this.is('textarea');
          this.inline = options.inline && (options.container || !this.isInput);
          this.format = parseFormat(options.format);
          var initialValue = this.getValue();
          this.initialValue = initialValue;
          this.oldValue = initialValue;
          date = this.parseDate(date || initialValue);

          if (startDate) {
            startDate = this.parseDate(startDate);

            if (date.getTime() < startDate.getTime()) {
              date = new Date(startDate);
            }

            this.startDate = startDate;
          }

          if (endDate) {
            endDate = this.parseDate(endDate);

            if (startDate && endDate.getTime() < startDate.getTime()) {
              endDate = new Date(startDate);
            }

            if (date.getTime() > endDate.getTime()) {
              date = new Date(endDate);
            }

            this.endDate = endDate;
          }

          this.date = date;
          this.viewDate = new Date(date);
          this.initialDate = new Date(this.date);
          this.bind();

          if (options.autoShow || this.inline) {
            this.show();
          }

          if (options.autoPick) {
            this.pick();
          }
        }
      }, {
        key: "build",
        value: function build() {
          if (this.built) {
            return;
          }

          this.built = true;
          var $this = this.$element,
              options = this.options;
          var $picker = $(options.template);
          this.$picker = $picker;
          this.$week = $picker.find(selectorOf('week')); // Years view

          this.$yearsPicker = $picker.find(selectorOf('years picker'));
          this.$yearsPrev = $picker.find(selectorOf('years prev'));
          this.$yearsNext = $picker.find(selectorOf('years next'));
          this.$yearsCurrent = $picker.find(selectorOf('years current'));
          this.$years = $picker.find(selectorOf('years')); // Months view

          this.$monthsPicker = $picker.find(selectorOf('months picker'));
          this.$yearPrev = $picker.find(selectorOf('year prev'));
          this.$yearNext = $picker.find(selectorOf('year next'));
          this.$yearCurrent = $picker.find(selectorOf('year current'));
          this.$months = $picker.find(selectorOf('months')); // Days view

          this.$daysPicker = $picker.find(selectorOf('days picker'));
          this.$monthPrev = $picker.find(selectorOf('month prev'));
          this.$monthNext = $picker.find(selectorOf('month next'));
          this.$monthCurrent = $picker.find(selectorOf('month current'));
          this.$days = $picker.find(selectorOf('days'));

          if (this.inline) {
            $(options.container || $this).append($picker.addClass("".concat(NAMESPACE, "-inline")));
          } else {
            $(document.body).append($picker.addClass("".concat(NAMESPACE, "-dropdown")));
            $picker.addClass(CLASS_HIDE).css({
              zIndex: parseInt(options.zIndex, 10)
            });
          }

          this.renderWeek();
        }
      }, {
        key: "unbuild",
        value: function unbuild() {
          if (!this.built) {
            return;
          }

          this.built = false;
          this.$picker.remove();
        }
      }, {
        key: "bind",
        value: function bind() {
          var options = this.options,
              $this = this.$element;

          if ($.isFunction(options.show)) {
            $this.on(EVENT_SHOW, options.show);
          }

          if ($.isFunction(options.hide)) {
            $this.on(EVENT_HIDE, options.hide);
          }

          if ($.isFunction(options.pick)) {
            $this.on(EVENT_PICK, options.pick);
          }

          if (this.isInput) {
            $this.on(EVENT_KEYUP, $.proxy(this.keyup, this));
          }

          if (!this.inline) {
            if (options.trigger) {
              this.$trigger.on(EVENT_CLICK, $.proxy(this.toggle, this));
            } else if (this.isInput) {
              $this.on(EVENT_FOCUS, $.proxy(this.show, this));
            } else {
              $this.on(EVENT_CLICK, $.proxy(this.show, this));
            }
          }
        }
      }, {
        key: "unbind",
        value: function unbind() {
          var $this = this.$element,
              options = this.options;

          if ($.isFunction(options.show)) {
            $this.off(EVENT_SHOW, options.show);
          }

          if ($.isFunction(options.hide)) {
            $this.off(EVENT_HIDE, options.hide);
          }

          if ($.isFunction(options.pick)) {
            $this.off(EVENT_PICK, options.pick);
          }

          if (this.isInput) {
            $this.off(EVENT_KEYUP, this.keyup);
          }

          if (!this.inline) {
            if (options.trigger) {
              this.$trigger.off(EVENT_CLICK, this.toggle);
            } else if (this.isInput) {
              $this.off(EVENT_FOCUS, this.show);
            } else {
              $this.off(EVENT_CLICK, this.show);
            }
          }
        }
      }, {
        key: "showView",
        value: function showView(view) {
          var $yearsPicker = this.$yearsPicker,
              $monthsPicker = this.$monthsPicker,
              $daysPicker = this.$daysPicker,
              format = this.format;

          if (format.hasYear || format.hasMonth || format.hasDay) {
            switch (Number(view)) {
              case VIEWS.YEARS:
                $monthsPicker.addClass(CLASS_HIDE);
                $daysPicker.addClass(CLASS_HIDE);

                if (format.hasYear) {
                  this.renderYears();
                  $yearsPicker.removeClass(CLASS_HIDE);
                  this.place();
                } else {
                  this.showView(VIEWS.DAYS);
                }

                break;

              case VIEWS.MONTHS:
                $yearsPicker.addClass(CLASS_HIDE);
                $daysPicker.addClass(CLASS_HIDE);

                if (format.hasMonth) {
                  this.renderMonths();
                  $monthsPicker.removeClass(CLASS_HIDE);
                  this.place();
                } else {
                  this.showView(VIEWS.YEARS);
                }

                break;
              // case VIEWS.DAYS:

              default:
                $yearsPicker.addClass(CLASS_HIDE);
                $monthsPicker.addClass(CLASS_HIDE);

                if (format.hasDay) {
                  this.renderDays();
                  $daysPicker.removeClass(CLASS_HIDE);
                  this.place();
                } else {
                  this.showView(VIEWS.MONTHS);
                }

            }
          }
        }
      }, {
        key: "hideView",
        value: function hideView() {
          if (!this.inline && this.options.autoHide) {
            this.hide();
          }
        }
      }, {
        key: "place",
        value: function place() {
          if (this.inline) {
            return;
          }

          var $this = this.$element,
              options = this.options,
              $picker = this.$picker;
          var containerWidth = $(document).outerWidth();
          var containerHeight = $(document).outerHeight();
          var elementWidth = $this.outerWidth();
          var elementHeight = $this.outerHeight();
          var width = $picker.width();
          var height = $picker.height();

          var _$this$offset = $this.offset(),
              left = _$this$offset.left,
              top = _$this$offset.top;

          var offset = parseFloat(options.offset);
          var placement = CLASS_TOP_LEFT;

          if (isNaN(offset)) {
            offset = 10;
          }

          if (top > height && top + elementHeight + height > containerHeight) {
            top -= height + offset;
            placement = CLASS_BOTTOM_LEFT;
          } else {
            top += elementHeight + offset;
          }

          if (left + width > containerWidth) {
            left += elementWidth - width;
            placement = placement.replace('left', 'right');
          }

          $picker.removeClass(CLASS_PLACEMENTS).addClass(placement).css({
            top: top,
            left: left
          });
        } // A shortcut for triggering custom events

      }, {
        key: "trigger",
        value: function trigger(type, data) {
          var e = $.Event(type, data);
          this.$element.trigger(e);
          return e;
        }
      }, {
        key: "createItem",
        value: function createItem(data) {
          var options = this.options;
          var itemTag = options.itemTag;
          var item = {
            text: '',
            view: '',
            muted: false,
            picked: false,
            disabled: false,
            highlighted: false
          };
          var classes = [];
          $.extend(item, data);

          if (item.muted) {
            classes.push(options.mutedClass);
          }

          if (item.highlighted) {
            classes.push(options.highlightedClass);
          }

          if (item.picked) {
            classes.push(options.pickedClass);
          }

          if (item.disabled) {
            classes.push(options.disabledClass);
          }

          return "<".concat(itemTag, " class=\"").concat(classes.join(' '), "\" data-view=\"").concat(item.view, "\">").concat(item.text, "</").concat(itemTag, ">");
        }
      }, {
        key: "getValue",
        value: function getValue() {
          var $this = this.$element;
          return this.isInput ? $this.val() : $this.text();
        }
      }, {
        key: "setValue",
        value: function setValue() {
          var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          var $this = this.$element;

          if (this.isInput) {
            $this.val(value);
          } else if (!this.inline || this.options.container) {
            $this.text(value);
          }
        }
      }], [{
        key: "setDefaults",
        value: function setDefaults() {
          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          $.extend(DEFAULTS, LANGUAGES[options.language], $.isPlainObject(options) && options);
        }
      }]);

      return Datepicker;
    }();

    if ($.extend) {
      $.extend(Datepicker.prototype, render, handlers, methods);
    }

    if ($.fn) {
      var AnotherDatepicker = $.fn.datepicker;

      $.fn.datepicker = function jQueryDatepicker(option) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var result;
        this.each(function (i, element) {
          var $element = $(element);
          var isDestroy = option === 'destroy';
          var datepicker = $element.data(NAMESPACE);

          if (!datepicker) {
            if (isDestroy) {
              return;
            }

            var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);
            datepicker = new Datepicker(element, options);
            $element.data(NAMESPACE, datepicker);
          }

          if (isString(option)) {
            var fn = datepicker[option];

            if ($.isFunction(fn)) {
              result = fn.apply(datepicker, args);

              if (isDestroy) {
                $element.removeData(NAMESPACE);
              }
            }
          }
        });
        return !isUndefined(result) ? result : this;
      };

      $.fn.datepicker.Constructor = Datepicker;
      $.fn.datepicker.languages = LANGUAGES;
      $.fn.datepicker.setDefaults = Datepicker.setDefaults;

      $.fn.datepicker.noConflict = function noConflict() {
        $.fn.datepicker = AnotherDatepicker;
        return this;
      };
    }
  });

  $.fn.datepicker.languages['ru-RU'] = {
    format: 'dd.mm.YYYY',
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekStart: 1,
    startView: 0,
    yearFirst: false,
    yearSuffix: ''
  };
  $('.header__burger').on('click', function () {
    $('.menu').toggleClass('menu--active');
  });
  $('.menu__close,.menu__link,.menu__avatar').on('click', function () {
    $('.menu').toggleClass('menu--active');
  });
  $('.menu__link, .header__link, .header__avatar, .menu__avatar').on('click', function (e) {
    e.preventDefault();
    $('.popup').toggleClass('popup--active');
    $('.popup__person').toggleClass('pop--active');
  });
  $('.popup__close, .success__button').on('click', function () {
    $('.popup').toggleClass('popup--active');
    $('.pop--active').toggleClass('pop--active');
  });
  $('.popup__button').on('click', function () {
    if (!$(this).hasClass('popup__button--active')) {
      $('.popup__button').toggleClass('popup__button--active');
    }

    if ($(this).hasClass('popup__button-history')) {
      $('.popup__profile').removeClass('popup__toggle--active');
      $('.popup__history').addClass('popup__toggle--active');
    } else {
      $('.popup__history').removeClass('popup__toggle--active');
      $('.popup__profile').addClass('popup__toggle--active');
    }
  });

  if (!$('.history__timetable').hasClass('history__timetable--active')) {
    $('.history__about').addClass('history__about--active');
  } else {
    $('.history__about').removeClass('history__about--active');
  }

  $('.main__form').on('submit', function (e) {
    e.preventDefault();
    $('.popup').toggleClass('popup--active');
    $('.popup__auth').toggleClass('pop--active');
  });
  $('.auth__form').on('submit', function (e) {
    e.preventDefault();
    $('.popup__auth').toggleClass('pop--active');
    $('.popup__auth-code').toggleClass('pop--active');
  });
  $('.auth__form--code').on('submit', function (e) {
    e.preventDefault();
    $('.popup__auth-code').toggleClass('pop--active');
    $('.popup__success').toggleClass('pop--active');
  });
  $('[data-toggle="datepicker"]').datepicker({
    language: 'ru-RU',
    format: 'dd.mm.yyyy'
  });
  jQuery(function ($) {
    $("#tel, #num").mask("+38(999) 999-99-99");
    $('#date').mask('99.99.9999', {
      placeholder: "дд.мм.гггг"
    });
  });
})();