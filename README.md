# Morgan ToolKit

by [BideoWego](https://github.com/BideoWego)

View it on [NPM](https://www.npmjs.com/package/morgan-toolkit)

This toolkit adds the following features to the [morgan](https://github.com/expressjs/morgan) logging package:

- Syntax highlighted logs of request properties
- Filtering of shallow keys in request properties
- Whitelisting of shallow keys in request properties

New features are added as ideas arise.


## Installation

Install via NPM

```bash
$ npm install --save morgan-toolkit
```


## Usage

Morgan Toolkit logs the following `req` properties by default:

* query
* params
* body
* session
* user
* cookies
* signedCookies

Basic Morgan Toolkit usage is almost identical to usage for [morgan](https://github.com/expressjs/morgan). The only difference being that you must pass the `morgan` instance to configure `morgan-toolkit` when requiring. The default format for the Morgan Toolkit is `'tiny'`, however all `morgan` formats are supported.


```javascript
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan);

app.use(morganToolkit());
```

### Logging Additional `req` Properties

As of `v1.1.0` Morgan Toolkit logs `cookies` and `signedCookies` by default.

Additional properties can be added by passing an options object when requiring the module:


```javascript
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan, {
  req: ['anotherProperty', 'yetAnotherProperty']
});
```


### Filtering Keys on `req` Properties

As of `v1.2.0`, Morgan Toolkit supports filtering shallow keys on `req` properties. You can specify keys on properties to be filtered by passing a `filter` object in the options when requiring the module. You may specify a single key or an array of keys to filter on each `req` property.

```javascript
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan, {
  filter: {
    user: 'password',
    params: ['password', 'secret']
  }
});
```

### Whitelisting Keys on `req` Properties

As of `v1.2.0`, Morgan Toolkit supports whitelisting shallow keys on `req` properties. You can specify keys on properties to be whitelisted by passing a `whitelist` object in the options when requiring the module. You may specify a single key or an array of keys to whitelist on each `req` property.

```javascript
const morgan = require('morgan');
const morganToolkit = require('morgan-toolkit')(morgan, {
  whitelist: {
    user: 'username',
    params: ['id']
  }
});
```


## Example Output

Here is an example screenshot of Morgan Toolkit logging:


![Screenshot](/screenshot.png?raw=true "Screenshot")


## License


Copyright 2017 Bideo Wego

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.













