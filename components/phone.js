document.addEventListener('alpine:init', () => {
  Alpine.data('phone', ({ country } = {}) => ({
    async init () {
      const { AsYouType, isValidPhoneNumber } = await import('libphonenumber-js/min')
      this.formatter = new AsYouType(country)
      this.isValidPhoneNumber = isValidPhoneNumber
    },

    input: {
      '@input' () {
        this.formatter.reset()
        const newValue = this.formatter.input(this.$el.value)
        this.$el.value = newValue

        if (!this.isValidPhoneNumber(newValue, country)) {
          this.$el.setCustomValidity('Invalid phone number')
        } else {
          this.$el.setCustomValidity('')
        }
      }
    }
  }))
})
