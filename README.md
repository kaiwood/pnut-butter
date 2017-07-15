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

Most methods allow any arbiritary, additional URL parameters that can be found in the [official documentation](https://pnut.io/docs/api). For example, you can use something like this:

```javascript
pnut.mentions({beforeId: 1235})
```
…to get posts in the mentions category before the specified id. We generate them dynamically and convert the parameters to snake_case automatically for you, so it doesn't matter if you write:

```javascript
pnut.global({sinceId: 4567})
```

or

```javascript
pnut.global({since_id: 4567})
```

Both versions work, it's just syntactic sugar and a matter of personal preference.

## Documentation

You can find the full documentation of all methods [here](https://kaiwood.github.io/pnut-butter/).

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

For everything that requires an authenticated user, you will need an access token. You can create one in the setting of your account on pnut.io under the "Develop" menu.

You can set it like this:

```javascript
const pnut = require('pnut-butter');

pnut.token = ACCESS_TOKEN

pnut.mentions('me').then(data => {
  console.log(data);
});
```

Please consult the [pnut docs](https://pnut.io/docs) for further information about how authentication is handled in the network, how to aquire a "real" token able to authenticate multiple users and so on.

## Changing profile / cover images

Uploading images is currently only supported on the client side. You can give the DOM node for an upload form containing file fields for "avatar" or "cover" as argument to the corresponding methods `uploadAvatar` / `uploadCover`.

A basic HTML form would look something like this:

```html
<form id="avatar-form">
  <input type="file" name="avatar">
</form>
```

Depending on how your application is set up, an upload function looks somewhat like this:

```javascript
function upload(event) {
  event.preventDefault();

  const form = document.querySelector("#avatar-form");
  pnut.uploadAvatar(form).then(res => {
    console.log(res);
  });
}
```

Both, `uploadAvatar` and `uploadCover` will handle server side uploads in a future release.

## App Streams

pnut-butter has support for creating, managing and reading app streams (you need a properly "signed" pair of Client ID and Client Secret to use this).

First, you need to request an app stream access token:

```js
const pnut = require('pnut-butter');
pnut.requestAppAccessToken(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET)
  .then(res => console.log(res));
```

If successful, you will get back a proper token in the response. Set it via:

```js
pnut.token = YOUR_ACCESS_TOKEN
```

Next step is to setup your app stream with up to 5 (!) options (post, bookmark, follow, mute, block, message, channel, channel_subscription, token, user) and a key name:

```js
pnut.createStream({
  objectTypes: ["post", "bookmark", "follow"],
  key: "myfancykeyname"
}).then(res => console.log(res));
```

For reading the stream, we provide a separate module you have to require, that preconfigures a web socket connection for you, where you can simply listen on the "message" event to read the stream:

```js
const pnut = require("pnut-butter");
const AppStreamSocket = require("pnut-butter/dist/app_stream_socket");

pnut.token = "MY_VALID_ACCESS_TOKEN";
const ws = AppStreamSocket("myfancykeyname");

ws.on("open", event => {
  console.log("Opening app stream");
});

ws.on("message", event => {
  console.log(event.data);
});

ws.on("close", event => {
  console.log("Closing app stream", event.code, event.reason);
});
```

You can now work on the streaming data from the "message" event. Keep in mind that you might want to reconnect to the socket in case it closes on the server side.

## Collaboration / Project status

Issues / Pull Requests are always welcome. If you have any questions, feel free to drop me an email or write a message on pnut.io. There are still a couple of things not implemented yet (creating and updating channels comes to mind), but should be stable and usable already.
