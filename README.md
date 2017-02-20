# pnut-butter

A simple, promise based wrapper library for the API of [pnut.io](https://pnut.io)

## Installation

```bash
npm install pnut-butter --save
```

## Usage

Fetch the global timeline:

```javascript
const pnut = require('pnut');

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
- [ ] Decide if the scope of this library should be expanded to be browser compatible
- [ ] Leave alpha status
- [ ] Better documentation