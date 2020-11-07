# webflow-alpinejs

> A simple script to allow using [Alpine.js](https://github.com/alpinejs/alpine) in [Webflow](https://webflow.com/) designer.

Read my related article on [Medium](https://medium.com/untitled-factory/webflow-alpine-js-d53d77e3293) to learn more. You can also check a [demo site](https://webflow.com/website/alpinejs-demo) for live example.

## Initialization
To initialize Alpine.js in Webflow add the following code at the bottom of the `<body>` element, either globally in Project Settings or via HTML Embed on each page.

```
<script src="https://cdn.jsdelivr.net/gh/loomchild/webflow-alpinejs@latest/index.js"></script>
<script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
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
In Webflow it's not possible to create a `<template>` element in the designer, and it is necessary for `x-if` conditionals. To solve this issue, this script automatically transforms any element containing `x-if` into `<template>`. For example we can create a conditional Div Block with `x-if` attribute with `open` value.

## For loops
Similarly to conditional statements, any element containing `x-for` is automatically converted to `<template>`. For example, to initialize a loop, simply create a div block with `x-for` attribute equal to `item in items`, and `x-bind:key` attribute with value `item`.

## Cloak
When refreshing the site, the hidden content is briefly displayed, creating an ugly flickering effect. To hide an element before Alpine.js is initialized, add an `x-cloak` attribute with any value to it.

In order to make it work, you also need to add the following style in HTML Embed to your page:

```
<style>
[x-cloak]:not(.uncloak) { 
  display: none;
}
</style>
```
It could be a good idea to create a symbol containing the above code. As a bonus, you can add `.uncloak` class to such elements to make them temporarily visible during development.

---

For more information how to use Alpine.js please refer to [the official documentation](https://github.com/alpinejs/alpine). If you notice something not working as expected in Webflow, do not hesitate to report errors here.
