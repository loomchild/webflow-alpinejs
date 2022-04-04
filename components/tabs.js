document.addEventListener('alpine:init', () => {
  Alpine.data('tabs', (targetEl = null) => ({
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
      if (targetEl) {
        this.tabs = document.querySelector(targetEl)
      } else {
        this.tabs = this.$el.classList.contains('w-tabs') ? this.$el : this.$el.querySelector('.w-tabs')
      }

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

      this.$dispatch('update:tab', this.tab)
      this.$watch('tab', (index) => {
        const tab = this.tabs.querySelector(`.w-tab-link:nth-child(${index + 1})`)
        if (tab && !tab.classList.contains('w--current')) {
          tab.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
        }
        this.$dispatch('update:tab', index)
      })
    }
  }))
})
