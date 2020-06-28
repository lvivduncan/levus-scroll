// 27-06-2020
"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LevusScroll = function () {
  function LevusScroll(elements) {
    _classCallCheck(this, LevusScroll);

    this.elements = document.querySelector(elements);

    this.wrapper = this.elements.querySelector('.levus-scroll');

    this.items = this.elements.querySelectorAll('.scroll-item');

    this.left = this.elements.querySelector('.left');

    this.right = this.elements.querySelector('.right');

    this.sizes = [];

    this.width = 1;

    this.zIndex = 0;
  }

  _createClass(LevusScroll, [{
    key: "getElements",
    value: function getElements() {
      var _this = this;

      this.items.forEach(function (item) {
        var clone = item.cloneNode(!0);

        _this.wrapper.append(clone);
      });
      this.items = this.elements.querySelectorAll('.scroll-item');
      return this.items;
    }
  }, {
    key: "toSizes",
    value: function toSizes() {
      var _this2 = this;

      this.items.forEach(function (item, i) {
        return _this2.sizes.push(i * _this2.width - _this2.width);
      });
    }
  }, {
    key: "arrows",
    value: function arrows() {
      var _this3 = this;

      this.right.addEventListener('click', function () {
        var first = _this3.sizes.pop();

        _this3.sizes.unshift(first);

        _this3.move();
      });
      this.left.addEventListener('click', function () {
        var last = _this3.sizes.shift();

        _this3.sizes.push(last);

        _this3.move();
      });
    }
  }, {
    key: "move",
    value: function move() {
      var _this4 = this;

      if (this.wrapper.offsetWidth < 400) {
        this.width = this.wrapper.offsetWidth;
        this.items.forEach(function (item, i) {
          item.style.width = "".concat(_this4.width, "px");
          item.style.transform = "translateX(".concat(_this4.sizes[i] * _this4.width, "px)");
          if (_this4.sizes[i] === 0) _this4.zIndex = 3;else if (_this4.sizes[i] === -1 || _this4.sizes[i] === 1) _this4.zIndex = 2;else _this4.zIndex = 0;
          item.style.zIndex = _this4.zIndex;
        });
      } else if (this.wrapper.offsetWidth < 600) {
        this.width = this.wrapper.offsetWidth / 2;
        this.items.forEach(function (item, i) {
          item.style.width = "".concat(_this4.width, "px");
          item.style.transform = "translateX(".concat(_this4.sizes[i] * _this4.width, "px)");
          if (_this4.sizes[i] === 0 || _this4.sizes[i] === 1 || _this4.sizes[i] === 2) _this4.zIndex = 3;else _this4.zIndex = 0;
          item.style.zIndex = _this4.zIndex;
        });
      } else if (this.wrapper.offsetWidth > 599) {
        this.width = this.wrapper.offsetWidth / 3;
        this.items.forEach(function (item, i) {
          item.style.width = "".concat(_this4.width, "px");
          item.style.transform = "translateX(".concat(_this4.sizes[i] * _this4.width, "px)");
          if (_this4.sizes[i] === 1) _this4.zIndex = 3;else if (_this4.sizes[i] === 0 || _this4.sizes[i] === 2) _this4.zIndex = 2;else _this4.zIndex = 0;
          item.style.zIndex = _this4.zIndex;
        });
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var that = this;
      window.addEventListener('resize', function () {
        that.move();
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.getElements();
      this.toSizes();
      this.arrows();
      this.resize();
      this.move();
    }
  }]);

  return LevusScroll;
}();


new LevusScroll('.levus-scroll-wrapper').init();

new LevusScroll('.levus-scroll-wrapper-2').init();