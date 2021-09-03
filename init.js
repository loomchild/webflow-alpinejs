import Alpine from 'alpinejs'

function replaceByTemplate (el) {
  const opening = new RegExp('^<' + el.tagName, 'i')
  const closing = new RegExp('</' + el.tagName + '>$', 'i')

  const newOuterHTML = el.outerHTML
    .replace(opening, '<template')
    .replace(closing, '</template>')

  el.outerHTML = newOuterHTML
}

function getAlpineAttributes (el) {
  const alpineAttributes = []
  for (let i = 0; i < el.attributes.length; ++i) {
    const a = el.attributes[i]
    if (a.name.startsWith('x-')) {
      alpineAttributes.push(a)
    }
  }
  return alpineAttributes
}

function replaceDotAttributes (el) {
  const attributes = getAlpineAttributes(el)

  attributes.forEach(a => {
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

function removeUnnecessaryAttributeValues (el) {
  const attributes = getAlpineAttributes(el)

  attributes.forEach(a => {
    if (a.name.match(/^x-transition.*(?!(enter|leave))/)) {
      el.setAttribute(a.name, '')
    }
  })
}

function init () {
  document.querySelectorAll('[x-data] *').forEach((el) => {
    replaceDotAttributes(el)
    removeUnnecessaryAttributeValues(el)
  })

  // Add templates, reverse to treat nested blocks before their parents.
  ;[...document.querySelectorAll('[x-data] [x-for], [x-data] [x-if]')].reverse().forEach(replaceByTemplate)
}

window.Alpine = Alpine
if (!window.Webflow) {
  window.Webflow = []
}
window.Webflow.push(() => {
  init()
  Alpine.start()
})
