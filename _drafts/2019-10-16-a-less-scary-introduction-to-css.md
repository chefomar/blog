---
layout: post
title:  "A Less Scary Introduction to CSS"
image: 
date: 2019-10-16 15:40:13 +0300
tags:
  - frontend
  - css
---

CSS can be scary for some people. This post is a simple introduction to some intermediate css concepts.

I am assuming you already know the basics of HTML and CSS. Meaning you already know how to write simple CSS. If not, take a look at W3School's [HTML]() and [CSS]() labs.

## Quick refresh

Let's start by refreshing your memory on some basic concepts.

CSS stands for Cascading Style Sheet. A CSS rule consists of a selector and a block of style properties and their values. Example:

```css
div {
  color: red;
}
```

In the example above `div` is the selector, `color` is a style property and `red` is the property value. This rule means: for `div` elements, set the text `color` to `red`.

This is a simple example of a really simple CSS rule. Now that your memory is refereshed, let's dive in.

## CSS selectors

CSS selectors are what tells the browser what styles to apply to which html elements. Basic selectors are:

- `*`: this matches all elements.
- Type selector: matches all html elements with the specified element type. `div` is an example as showen in the example above.
- Class selector: matches html elements having the specified class name. These selectors start with a `.` followed by the class name. Example: `.myclass`.
- ID selectors: matches an html element with the specified ID. These selectors start with a `#` followed by the ID. Example: `#myDiv`. This will match the element with `id="myDiv"`.
- Attribute selector: matches all html elements having the specified attributes and optionally their values. These selectors look like `[attributename=value]`. Examples: `[required]` will match all elements having the `required` attribute, regardless of its value. `[type=text]` will match all elements having the `type` attribute with its value set to `text`.

You can write rules that use a mix of the selectors above. For example: `.myClass[required]` will match all elements having the class name `myClass` and the attribute `required`. You can also group selectors to match multiple element types. To group selectors, separate them with a `,`. For example: `.myClass, #myDiv, h1` will select all elements having `.myclass` class, the element with `id="myDiv"` and `h1` elements.

There are other types of selectors, like pseudo-class selectors, and different combinations of selectors, like sibling conmbinations, child combinations and descendant combiniations. For a complete guide and reference for CSS selectors see [MDN CSS selectors reference]() and [W3School CSS selectors guide]().

## CSS selector specificity

Browsers have rules to apply css styles. If two CSS rules are conflecting, browsers uses these rules to choose which styles to apply. More specific styles are more likely to override less specific styles. Understanding CSS selector specificity is important because it affects the way you write your CSS.

Specificity can be explained in 4 basic categories, arranged from most specific to less specific:

- Inline styles: Inline styles will override any other styles. An example:

    If in your HTML:

    ```html
    <h1 id="redTitle" style="color: blue">Hello, world!</h1>
    ```

    In CSS:

    ```css
    #redTitle {
      color: red;
    }
    ```

    The resulting text will have a blue color:

    <!-- insert image here -->

- ID selectors

    ```html
    <h1 id="redTitle" class="blue-title">Hello, world!</h1>
    ```

    In CSS:

    ```css
    #redTitle {
      color: red;
    }

    .blue-title {
      color: blue;
    }
    ```
    The resulting text will have a red color:

    <!-- insert image here -->

- Classes, attributes and pseudo-classes

    ```html
    <h1 class="blue-title">Hello, world!</h1>
    ```

    In CSS:

    ```css
    h1 {
      color: red;
    }

    .blue-title {
      color: blue;
    }
    ```
    The resulting text will have a blue color:

    <!-- insert image here -->

- Element selectors

For rules with equal specificity, the latest rule will be counted.

This is CSS specificity in a high-level. For more elaborate examples of how to calculate CSS specificity, read [Emma Wedekind's CSS Specificity](https://dev.to/emmawedekind/css-specificity-1kca).

## The box model

