(function() {
  'use strict';

  /**
   * Image slider
   *
   * @name Slider
   * @constructor
   * @access public
   * @param {HTMLElement} el container
   * @param {Boolean} enableHotkeys enable hotkeys
   */
  function Slider(el, enableHotkeys) {
    this.el = el;

    var leftHandle = this.el.querySelector('.slider-left-handle');
    var rightHandle = this.el.querySelector('.slider-right-handle');

    if (this.el.querySelectorAll('.slider-item').length < 2) {  // Nothing to slide
      if (leftHandle) {
        leftHandle.remove()
      }
      if (rightHandle) {
        rightHandle.remove();
      }
      return;
    }

    this.currentItem = this.el.querySelector('.current') || this._getFirstItem();
    this.currentItem.classList.add('current');

    leftHandle.onclick = function(evt) {
      evt.preventDefault();
      this.showPrevious();
    }.bind(this);

    rightHandle.onclick = function(evt) {
      evt.preventDefault();
      this.showNext();
    }.bind(this);

    if (enableHotkeys) {
      window.onkeyup = function (evt) {
        if (evt.keyCode === 37) {
          this.showPrevious();
        } else if (evt.keyCode === 39) {
          this.showNext();
        }
      }.bind(this);
    }
  }

  /**
   * Slide to the passed item
   *
   * @name slideTo
   * @function
   * @access public
   * @param {HTMLElement} item Item
   * @param {Boolean} right Slide direction. True if the slider should be moved to the right, false otherwise.
   */
  Slider.prototype.slideTo = function(item, right) {
    item.classList.add('notransition');
    item.classList.add(right ? 'left' : 'right');

    setTimeout(function() { // Prevent class optimizations
      item.classList.remove('notransition');
      item.classList.add('current');
      item.classList.remove(right ? 'left' : 'right');

      this.currentItem.classList.remove('current');
      this.currentItem.classList.add(right ? 'right' : 'left');

      var prev = this.currentItem;
      this.currentItem = item;

      setTimeout(function() { // Clear classes of the invisible item
        prev.classList.remove(right ? 'right' : 'left');
      }, 250);
    }.bind(this), 10);
  };

  /**
   * Show the next image
   *
   * @name showNext
   * @method
   * @access public
   */
  Slider.prototype.showNext = function() {
    var item = this.currentItem.nextElementSibling;
    if (!item.classList.contains('slider-item')) {
      item = this._getFirstItem();
    }
    this.slideTo(item, false);
  };

  /**
   * Show the previous image
   *
   * @name showNext
   * @method
   * @access public
   */
  Slider.prototype.showPrevious = function() {
    var item = this.currentItem.previousElementSibling || this._getLastItem();
    this.slideTo(item, true);
  };

  /**
   * Get the first item
   *
   * @name _getFirstItem
   * @method
   * @access private
   * @return {HTMLElement}
   */
  Slider.prototype._getFirstItem = function() {
    return this.el.querySelector('.slider-item');
  };

  /**
   * Get the last item
   *
   * @name _getLastItem
   * @function
   * @access private
   * @return {HTMLElement}
   */
  Slider.prototype._getLastItem = function() {
    var items = this.el.querySelectorAll('.slider-item');
    return items[items.length - 1];
  };

  window.Slider = Slider;
})();

