# webflow-alpinejs

> A simple script to allow using [Alpine.js](https://github.com/alpinejs/alpine) in [Webflow](https://webflow.com/) designer.

To learn the basic usage, read my related tutorial on [Medium](https://medium.com/@jareklipski/webflow-alpine-js-d53d77e3293). To interact with Webflow built-in components, check this article on [Medium](https://medium.com/@jareklipski/interacting-with-the-webflow-slider-component-using-alpine-js-c154885feaed).

You can also check a [demo site](https://webflow.com/website/alpinejs-demo) for a live example.

## Initialization
To initialize Alpine.js in Webflow add the following code at the bottom of the `<body>` element, either globally in Project Settings or via HTML Embed on each page.

```
<script src="https://cdn.jsdelivr.net/npm/@loomchild/webflow-alpinejs@2/dist/index.js"></script>
```

Next, add the following style at the top of the `<body>` element via HTML Embed on each page:
```
<link href="https://cdn.jsdelivr.net/npm/@loomchild/webflow-alpinejs@2/dist/style.css" rel="stylesheet">
```

## Initialize a component
To create an Alpine.js component add an `x-data` custom attribute to any HTML element. For example it can contain the value `{ open: false }`.

## Displaying expressions
To display a value of an expression, use `x-text` or `x-html` attribute with value containing the expresion, for example `open`.

## Binding
To set an attribute value to result of an expression, add an `x-bind` attribute (shorthand starting with `:` symbol cannot be used in Webflow). For example `x-bind:class` with value `myclass`

## Event handlers
To add an event handler, add a `x-on` custom attribute (shorthand starting with `@` symbol cannot be used in Webflow). For example to react to a mouse click, add `x-on:click` attribute with value `open = true`.

## Modifiers
Attributes containing a dot `.` character in their name are not allowed in Webflow. To bypass this limitation, use another `:` character instead. For example, add `x-on:click:away` attribute with value `open = false`.

## Conditional statements
In Webflow it's not possible to create a `<template>` element in the designer, and it is necessary for `x-if` conditionals. To solve this issue, this script automatically wraps any element containing `x-if` in a `<template>`. For example we can create a conditional Div Block with `x-if` attribute with `open` value.

## For loops
Similarly to conditional statements, any element containing `x-for` is automatically wrapped in a `<template>`. For example, to initialize a loop, simply create a div block with `x-for` attribute equal to `item in items`, and `x-bind:key` attribute with value `item`.

## Cloak
When refreshing the site, the hidden content is briefly displayed, creating an ugly flickering effect. To hide an element before Alpine.js is initialized, add an `x-cloak` attribute with any value to it. You can add `.uncloak` class to such element to make it temporarily visible during development.

## Components

This script also simplifies interacting with built-in Webflow components, such as Slider, Tabs or Lightbox.

### Slider

Wrap the slider in a Div Block and initialize the component by adding `x-data` attribute with `slider` value. You can also attach to any slider component on the page by passing it's selector as a parameter, e.g. `slider('#myslider')`.

The component contains `slide` variable indicating current slide index (read/write) and `slideCount` variable (read-only). It also contains `nextSlide()` and `previousSlide()` convenience methods.

### Tabs

Wrap the slider in a Div Block and initialize the component by adding `x-data` attribute with `tabs` value. You can also attach to any tabs component on the page by passing it's selector as a parameter, e.g. `tabs('#mytabs')`.

The component contains `tab` variable indicating current tab index (read/write) and `tabCount` variable (read-only). It also contains `nextTab()` and `previousTab()` convenience methods.

---
For more information how to use Alpine.js please refer to [the official documentation](http://alpinejs.dev/). If you notice something not working as expected in Webflow, do not hesitate to report errors [here](https://github.com/loomchild/webflow-alpinejs/issues).
