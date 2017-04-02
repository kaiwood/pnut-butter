# pnut-butter.js

A modern, promise based wrapper library for the [pnut.io](https://pnut.io) API.

It is currently developed and tested on Node 6 LTS, but should work with basically any current browser supporting ES6 as well (feel free to open an issue if not), especially if you throw it in your typical Webpack/Babel/whatever toolchain.

## Installation

```bash
npm install pnut-butter --save
```

## Usage

Everything related to data fetching returns a Promise, which you can either use directly, with a supporting library like [co](https://www.npmjs.com/package/co) or the upcoming async/await standard.

For example, to fetch the global timeline:

```javascript
const pnut = require('pnut-butter');

pnut.global().then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
```

Fetch a post by its ID:

```javascript
const pnut = require('pnut-butter');

pnut.post(1234).then(res => {
  console.log(res);
});
```

# Documentation

You can find the full documentation with all methods [here](https://kaiwood.github.io/pnut-butter/)

## Custom requests

Pnut is a moving target, so there are still some methods missing and/or parameters that are not yet implemented. Therefor you can always fall back to a custom request with support for all HTTP verbs.

```javascript
const pnut = require('pnut-butter');

pnut.custom('/posts/streams/explore/trending').then(res => {
  console.log(res);
});

pnut.custom('/posts', 'POST', { text: 'Posting with pnut-butter!' }).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

pnut.custom('/posts/1234', 'DELETE').then(res => {
  console.log(res);
});

pnut.custom('/posts/streams/me?before_id=1234').then(res => {
  console.log(res);
});
```

## Authentication

For everything that requires an authenticated user, you will need an access token. You can create one in the setting of your account on pnut.io under "Develop" menu.

You can set it like this:

```javascript
const pnut = require('pnut-butter');

pnut.token = ACCESS_TOKEN

pnut.mentions('me').then(data => {
  console.log(data);
});
```

Please consult the [pnut docs](https://pnut.io/docs) for further information about how authentication is handled in the network, how to aquire a "real" token able to authenticate multiple users and so on.

## Collaboration / Project status

Issues / Pull Requests are always welcome. If you have any questions, feel free to drop me an email or write a message on pnut.io. There are still a couple of things not implemented yet (creating and updating channels comes to mind), but should be stable and usable already.
