import Alpine from 'alpinejs'

Alpine.data('slider', () => ({
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
    this.slider = this.$el.querySelector('.w-slider')
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

    this.$watch('slide', (index) => {
      const dot = this.slider.querySelector(`.w-slider-dot:nth-child(${index + 1})`)
      if (dot && !dot.classList.contains('w-active')) {
        dot.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
      }
    })
  }
}))

Alpine.data('tabs', () => ({
  tabs: null,
  tab: 0,
  _tabCount: 0,

  get tabCount () {
    return this._tabCount
  },

  nextTab () {
    if (this.tab + 1 < this.tabCount) {
      this.tab++
    }
  },

  previousTab () {
    if (this.tab > 0) {
      this.tab--
    }
  },

  init () {
    this.tabs = this.$el.querySelector('.w-tabs')
    if (!this.tabs) {
      throw new Error('Missing tabs component to target')
    }

    const config = { attributes: true, childList: false, subtree: false, attributeFilter: ['class'] }

    const setObserver = (target, index) => {
      const observer = new MutationObserver((mutations) => {
        if (this.tab === index) {
          return
        }

        mutations.forEach((mutation) => {
          if (mutation.target.classList.contains('w--current')) {
            this.tab = index
          }
        })
      })
      observer.observe(target, config)
    }

    const tabs = this.tabs.querySelectorAll('.w-tab-link')
    this._tabCount = tabs.length
    tabs.forEach((tab, index) => {
      setObserver(tab, index)
    })

    this.$watch('tab', (index) => {
      const tab = this.tabs.querySelector(`.w-tab-link:nth-child(${index + 1})`)
      if (tab && !tab.classList.contains('w--current')) {
        tab.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
      }
    })
  }
}))
