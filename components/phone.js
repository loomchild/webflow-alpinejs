document.addEventListener('alpine:init', () => {
  Alpine.data('phone', ({ country } = {}) => ({
    async init () {
      const { AsYouType } = await import('libphonenumber-js/max')
      this.formatter = new AsYouType(country)
    },

    input: {
      '@input' () {
        this.formatter.reset()
        const newValue = this.formatter.input(this.$el.value)
        this.$el.value = newValue
      }
    }
  }))
})
