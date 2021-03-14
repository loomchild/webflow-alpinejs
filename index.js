/* Initialization --------------------------------------------------------- */

function replaceByTemplate (el) {
  const opening = new RegExp('^<' + el.tagName, 'i')
  const closing = new RegExp('</' + el.tagName + '>$', 'i')

  const newOuterHTML = el.outerHTML
    .replace(opening, '<template')
    .replace(closing, '</template>')

  el.outerHTML = newOuterHTML
}

function replaceDotAttributes (el) {
  const alpineAttributes = []
  for (let i = 0; i < el.attributes.length; ++i) {
    const a = el.attributes[i]
    if (a.name.startsWith('x-')) {
      alpineAttributes.push(a)
    }
  }

  alpineAttributes.forEach(a => {
    const m = a.name.match(/^(x-[^:]+)(:.+)$/)
    if (m) {
      let newA = null
      if (['x-bind', 'x-on'].includes(m[1])) {
        const suffix = m[2].substring(1)
        if (suffix.includes(':')) {
          newA = m[1] + ':' + suffix.replace(/:/g, '.')
        }
      } else {
        newA = m[1] + m[2].replace(/:/g, '.')
      }
      if (newA) {
        el.setAttribute(newA, a.value)
        el.removeAttribute(a.name)
      }
    }
  })
}

document.querySelectorAll('[x-data] *').forEach((el) => {
  replaceDotAttributes(el)
})

// Add templates, reverse to treat nested blocks before their parents.
;[...document.querySelectorAll('[x-data] [x-for], [x-data] [x-if]')].reverse().forEach(replaceByTemplate)

/* Components ------------------------------------------------------------- */

/* Slider */
function Slider ({ el }) { // eslint-disable-line no-unused-vars
  return {
    el,
    slide: 0,
    slideCount: 0,

    // TODO: slideCount should be a getter, hide as private somehow (store all slides)

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

    __init () {
      const config = { attributes: true, childList: false, subtree: false, attributeFilter: ['class'] }

      const setObserver = (target, index) => {
        const observer = new MutationObserver((mutations) => {
          if (this.slide === index) {
            return
          }

          mutations.forEach((mutation) => {
            if (/w-active/.test(mutation.target.className)) {
              this.slide = index
            }
          })
        })
        observer.observe(target, config)
      }

      // Wait for Webflow init before capturing the dots
      setTimeout(() => {
        const dots = document.querySelectorAll(`${this.el} .w-slider-dot`)
        this.slideCount = dots.length
        dots.forEach((dot, index) => {
          setObserver(dot, index)
        })
      }, 100)

      this.$watch('slide', (index) => {
        const dot = document.querySelector(`${this.el} .w-slider-dot:nth-child(${index + 1})`)
        if (dot && !/w-active/.test(dot.className)) {
          dot.dispatchEvent(new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
        }
      })
    }
  }
}

/* Utilities -------------------------------------------------------------- */

/* Function to re-initialize Alpine.js during development (WIP). */
function resetAlpine () { // eslint-disable-line no-unused-vars
  document.querySelectorAll('[x-data]').forEach((el) => {
    delete el.__x
  })
  Alpine.start()
}
