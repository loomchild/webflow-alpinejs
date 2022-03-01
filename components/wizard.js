document.addEventListener('alpine:init', () => {
  Alpine.data('wizard', (scroll = false) => ({
    step: 0,

    init () {
      const wizard = this.$root

      wizard.addEventListener('update:slide', (event) => {
        this.step = event.detail
        if (this.step > 0) {
          if (scroll) {
            wizard.scrollIntoView({ behavior: 'smooth' })
          }
          this.$dispatch('update:step', this.step)
        }
      })
    },

    nextStep () {
      const currentSlide = this.$el.closest('.w-slide')
      const slideFields = [...currentSlide.querySelectorAll('input,select')]
      const slideFieldsValid = slideFields.every(i => i.reportValidity())
      if (slideFieldsValid) {
        this.nextSlide()
      }
    },

    previousStep () {
      this.previousSlide()
    }
  }))
})
