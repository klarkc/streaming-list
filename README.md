# streaming-list

[![Travis][travis-image]][travis-url]
[![Codeclimate note][cc-image]][cc-url]
[![Coverage][cov-image]][cov-url]
[![Bower][bower-image]][bower-url]
[![Published on webcomponents.org][webc-image]][webc-url]

[travis-image]: https://img.shields.io/travis/klarkc/streaming-list/master.svg
[travis-url]: https://travis-ci.org/klarkc/streaming-list
[cc-image]: https://img.shields.io/codeclimate/github/klarkc/streaming-list.svg?maxAge=2592000
[cc-url]: https://codeclimate.com/github/klarkc/streaming-list
[cov-image]: https://img.shields.io/codeclimate/coverage/github/klarkc/streaming-list.svg?maxAge=2592000
[cov-url]: https://codeclimate.com/github/klarkc/streaming-list/coverage
[bower-image]:  https://img.shields.io/bower/v/streaming-list.svg
[bower-url]: https://github.com/klarkc/streaming-list/releases
[webc-image]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[webc-url]: https://beta.webcomponents.org/element/klarkc/streaming-list

A webcomponent written with [Polymer](https://www.polymer-project.org/) for list [Twitch](https://www.twitch.tv/) and (in future) [Youtube](http://youtube.com/) streams. You will be able to filter the results by a specific game and define priority for a selected language.

Example:
```html
<streaming-list lang="pt" game="Dota 2"></streaming-list>
```

The demo and API is [available here](http://klarkc.github.io/streaming-list/).

### Browser Compatibility
- [x] Google Chrome
- [x] Mozilla Firefox
- [x] Safari >= 9
- [x] Microsoft Edge
- [x] Internet Explorer >= 11

## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can
install that via:

    npm install -g bower

Then, go ahead and download the element's dependencies:

    bower install


## Playing With Your Element

If you wish to work on your element in isolation, we recommend that you use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep your element's
bower dependencies in line. You can install it via:

    npm install -g polyserve

And you can run it via:

    polyserve

Once running, you can preview your element at
`http://localhost:8080/components/streaming-list/`, where `streaming-list` is the name of the directory containing it.


## Testing Your Element

Simply navigate to the `/test` directory of your element to run its tests. If
you are using Polyserve: `http://localhost:8080/components/streaming-list/test/`

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run your tests on _all_ of your local browsers via:

    wct

#### WCT Tips

`wct -l chrome` will only run tests in chrome.

`wct -p` will keep the browsers alive after test runs (refresh to re-run).

`wct test/some-file.html` will test only the files you specify.
