<div align="center">
    <h1>configurable-date-input-polyfill</h1>

[![NPM version](https://badge.fury.io/js/configurable-date-input-polyfill.svg)](https://badge.fury.io/js/configurable-date-input-polyfill)
[![All-time downloads](https://img.shields.io/npm/dm/configurable-date-input-polyfill.svg)](https://www.npmjs.com/package/configurable-date-input-polyfill)
[![Monthly downloads](https://img.shields.io/npm/dt/configurable-date-input-polyfill.svg)](https://www.npmjs.com/package/configurable-date-input-polyfill)
<p>
    The last date-input polyfill you will ever need. A fancy and lightweight datepicker with a high number of configuration options for all needs. Supports any calendar format and contains a large amount of localizations.
</p>

Just include this simple script and IE, Firefox, and OS X Safari will support `<input type="date">`, without any dependencies, not even jQuery!

Forked from [date-input-polyfill](https://github.com/jcgertig/date-input-polyfill). Continuing as a separate project.

[VIEW DEMO HERE](https://kreutzercode.github.io/configurable-date-input-polyfill/)

</div>


## Features

* Easily Stylable. [These are the default styles](https://github.com/KreutzerCode/configurable-date-input-polyfill/blob/master/src/configurable-date-input-polyfill.scss),
which you may override with your own.
* Accessibility friendly with Keyboard Shortcuts. Full arrow controls `Up/Down/Left/Right` to increment/decrement the selected date.
`Esc` to hide the datepicker.
* Easy Localization. Specify the datepicker's locale by setting the
`lang` attribute of the `input` element. The Localisation is easy to extend with own items.
* Limit the range to choose from by setting the `min` and `max` attributes.
* Configure display format at will. Specify the display format by setting either the
`date-format` or `data-date-format` attribute of the `input` element.
* Configure the first day of the week. By setting the `data-first-day` attribute you 
can set the calendar matrix format to any standard. Value of this attribute can be `sa`,`su` or `mo`.
* Polyfill can be added with class `date-polyfill`.
* Polyfill works with `valueAsDate` and `valueAsNumber`.
[Learn more about these properties.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#property-valueasdate)
They behave as getters and setters.
* Change detection of input attributes via [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 
always keeps the datepicker up to date.
* Ensure a consistent look and feel for date inputs across all browsers by forcing the use of the polyfill.


## Install
`npm install --save configurable-date-input-polyfill`

Add to your project:

* **Webpack/Browserify:** `require('configurable-date-input-polyfill');`

* **Babel:** `import 'configurable-date-input-polyfill';`

* **Script Tag:** Copy `configurable-date-input-polyfill.dist.js` from `node_modules` and
include it anywhere in your HTML.
```html
<script src="./dist/configurable-date-input-polyfill.dist.js"></script>

<script src="node_modules/configurable-date-input-polyfill/dist/configurable-date-input-polyfill.dist.js"></script>
```


* This package supports **AMD**.

## Localization
* You can easily set a specific locale for each date input. [The list of available languages](https://github.com/KreutzerCode/configurable-date-input-polyfill/blob/master/src/localisations.js) can easily be extended by your own.
```html
<!--default dont need to be specified-->
<input type="date" lang="en" />

<input type="date" lang="fr" />
```

## Min and Max
* By setting the `min` and `max` attributes you can change the range of available date options. In case you are faced with an input without type date, it is recommended to use `data-min` and `data-max`.
```html
<!--default dont need to be specified-->
<input type="date" min="1800-01-01" max="3000-01-01"/>

<!--custom-->
<input type="date" min="2015-02-15" max="2030-01-01" />

<!--custom for non type date-->
<input type="text" class="date-polyfill" data-min="2015-02-15" data-max="2030-01-01" />
```

## Formatting
* You can easily specify the display format by setting either the
`date-format` or `data-date-format` attribute of the `input` element.  The default format is `yyyy-mm-dd`. 
[Available options list.](https://github.com/felixge/node-dateformat#mask-options)
```html
<!--default dont need to be specified-->
<input type="date" date-format="yyyy-mm-dd" />

<input type="date" data-date-format="mm/dd/yyyy" />

<input type="date" data-date-format="dd.mm.yyyy" />
```

## First day of the Week (Matrix Formatting)
* Specify the first day of the week. You can use the data-first-day attribute to change the day the week starts between Saturday, Sunday, and Monday.
```html
<!--default dont need to be specified-->
<input type="date" data-first-day="su" />

<!--europe-->
<input type="date" data-first-day="mo" />

<!--egypt-->
<input type="date" data-first-day="sa" />
```

## Force Polyfill
* Ensure a consistent date input experience across all browsers by forcing the use of the polyfill.
  To do this you have to add `data-force-polyfill="true"` to an specific date input element.

```html
<!--default uses browser based date input-->
<input type="date" />

<!--forces use of date input polyfill-->
<input type="date" data-force-polyfill="true" />

<!--forcing the polyfill in configured date input-->
<input type="date" class="date-polyfill" data-min="2015-02-15" data-max="2030-01-01" data-force-polyfill="true" />
```

## Browser support
#### Desktop
* Chrome
* Safari 7+
* Firefox
* Opera
* Edge
* Internet Explorer 10+

#### Mobile
* iOS Safari 7+
* Samsung Internet 11+

---

## Contributing

Feel free to contribute. Whether it's a feature request or a pull request, any type of contribution is welcome.

### Development
* To start modifying the project, you will need to run `npm install` in the package folder.
* After modifying the project files, you will need to run `npm run build` to apply your changes.
* It is recommended to use `npm run watch` when making large changes.

### Production
* When your changes are ready to be used in production, you need to run `npm run production`.
* After that, the modified package is ready for use. Pull Requests of any kind are strongly encouraged!

