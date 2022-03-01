import Alpine from 'alpinejs'

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

function wrapInTemplate (el) {
  const template = document.createElement('template')

  const attributes = getAlpineAttributes(el)
  attributes.forEach(a => {
    template.setAttribute(a.name, a.value)
    el.removeAttribute(a.name)
  })

  el.parentNode.insertBefore(template, el)
  template.content.appendChild(el)
}

function replaceDotAttributes (el) {
  const attributes = getAlpineAttributes(el)

  attributes.forEach(a => {
    const m = a.name.match(/^(x-[^:]+)(:.+)$/)
    if (m) {
      let newA = null
      if (['x-bind', 'x-on'].includes(m[1])) {
        let prefix = m[1]
        let suffix = m[2].substring(1)
        if (prefix === 'x-on' && suffix.startsWith('update:')) {
          prefix += ':update'
          suffix = suffix.substring(7)
        }
        if (suffix.includes(':')) {
          newA = prefix + ':' + suffix.replace(/:/g, '.')
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
  document.querySelectorAll('[x-data],[x-data] *').forEach((el) => {
    replaceDotAttributes(el)
    removeUnnecessaryAttributeValues(el)
  })

  document.querySelectorAll('[x-data] [x-for], [x-data] [x-if]').forEach(wrapInTemplate)
}

window.Alpine = Alpine
if (!window.Webflow) {
  window.Webflow = []
}
window.Webflow.push(() => {
  init()
  Alpine.start()
})
