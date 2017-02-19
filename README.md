# pnut-butter

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

- Leave alpha status