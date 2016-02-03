# rc-rate
---

React Rate Component


[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-rate)](https://saucelabs.com/u/rc-rate)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-rate.svg)](https://saucelabs.com/u/rc-rate)

[npm-image]: http://img.shields.io/npm/v/rc-rate.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-rate
[travis-image]: https://img.shields.io/travis/react-component/rate.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/rate
[coveralls-image]: https://img.shields.io/coveralls/react-component/rate.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/rate?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/rate.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/rate
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-rate.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-rate


## Browser Support

|![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)|
| --- | --- | --- | --- | --- |
| IE 8+ ✔ | Chrome 31.0+ ✔ | Firefox 31.0+ ✔ | Opera 30.0+ ✔ | Safari 7.0+ ✔ |

## Screenshots

<img src="" width="288"/>


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/


online example: http://react-component.github.io/rate/examples/


## Feature

* support ie8,ie8+,chrome,firefox,safari

### Keyboard


## install


[![rc-rate](https://nodei.co/npm/rc-rate.png)](https://npmjs.org/package/rc-rate)


## Usage

```js
var Rate = require('rc-rate');
var React = require('react');
React.render(<Rate />, container);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>count</td>
          <td>number</td>
          <td>5</td>
          <td>display initial star numbers</td>
        </tr>
        <tr>
          <td>value</td>
          <td>number</td>
          <td>0</td>
          <td>initial highlight value of the star</td>
        </tr>
        <tr>
          <td>allowHalf</td>
          <td>bool</td>
          <td>false</td>
          <td>support half star</td>
        </tr>
        <tr>
          <td>style</td>
          <td>object</td>
          <td>{}</td>
          <td>星星的样式必须符合react的style样式</td>
        </tr>
        <tr>
          <td>onChange</td>
          <td>bool</td>
          <td>false</td>
          <td>`onChange` will be triggered while the value of Star changing.</td>
        </tr>
    </tbody>
</table>


## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-rate is released under the MIT license.
