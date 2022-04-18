document.addEventListener('alpine:init', () => {
  Alpine.data('phone', ({ country } = {}) => ({
    init () {
      this.formatter = new libphonenumber.AsYouType(country) // eslint-disable-line no-undef
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
