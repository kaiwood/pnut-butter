# pnut-butter

A simple, promise based wrapper library for the API of [pnut.io](https://pnut.io).

Currently requires Node 6+ because of its ES6 completeness.

## Installation

```bash
npm install pnut-butter --save
```

## Usage

Fetch the global timeline:

```javascript
const pnut = require('pnut-butter');

pnut.global().then(data => {
  console.log(data);
})
```

## Authentication

You can set your access token like this:

```javascript
const pnut = require('pnut');

pnut.token = ACCESS_TOKEN
pnut.global().then(data => {
  console.log(data);
})
```

## Todo

- [ ] Implement endpoints where authentication is required
- [ ] Implement additional parameters for each endpoint / method
- [ ] Decide if the scope of this library should be expanded to be browser compatible
- [ ] Leave alpha status
- [ ] Better documentation
