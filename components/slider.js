import Alpine from 'alpinejs'

Alpine.data('slider', (targetEl = null) => ({
  slider: null,
  slide: 0,
  _slideCount: 0,

  get slideCount () {
    return this._slideCount
  },

  nextSlide () {
    if (this.slide + 1 < this.slideCount) {
      this.slide++
    }
  },

  previousSlide () {
    if (this.slide > 0) {
      this.slide--
    }
  },

  init () {
    if (targetEl) {
      this.slider = document.querySelector(targetEl)
    } else {
      this.slider = this.$el.querySelector('.w-slider')
    }

    if (!this.slider) {
      throw new Error('Missing slider component to target')
    }

    const config = { attributes: true, childList: false, subtree: false, attributeFilter: ['class'] }

    const setObserver = (target, index) => {
      const observer = new MutationObserver((mutations) => {
        if (this.slide === index) {
          return
        }

        mutations.forEach((mutation) => {
          if (mutation.target.classList.contains('w-active')) {
            this.slide = index
          }
        })
      })
      observer.observe(target, config)
    }

    const dots = this.slider.querySelectorAll('.w-slider-dot')
    this._slideCount = dots.length
    dots.forEach((dot, index) => {
      setObserver(dot, index)
    })

    this.$dispatch('update:slide', this.slide)
    this.$watch('slide', (index) => {
      const dot = this.slider.querySelector(`.w-slider-dot:nth-child(${index + 1})`)
      if (dot && !dot.classList.contains('w-active')) {
        dot.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
      }
      this.$dispatch('update:slide', index)
    })
  }
}))
