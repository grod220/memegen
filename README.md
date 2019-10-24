# Meme Generator 🖼

At Google, their internal [Memegen](https://www.buzzfeednews.com/article/reyhan/inside-googles-internal-meme-generator) site is one of core ways employees playfully dialog, give feedback, and get a pulse of what's going on in the company. It's extremely transparent and provides a forum that serves as a form of communication that can't really be expressed elsewhere. This hackweek project will explore building an open source version.

### General direction:

_Phase 1_ --> Is this needed? How will this add value to our dialog internally? What should it look like? What features should it have? Should it be a web-app or is there an integration with slack or workplace that makes more sense.

_Phase 2_ --> Build! Spin up database & server instances.

_Phase 3_ --> Evaluate progress. Plan out future features. Consider what goes into demo.


## Tech heavily inspired by:
https://github.com/AvanthikaMeenakshi/ReactMemeMaker/blob/master/src/Components/MainPage/index.js
https://codepen.io/ninivert/pen/BpLKRx?editors=1010

### Result of hack
* Determined the differences between canvas & svg editor. Went with svg as it lends itself better to a data model that can be edited later.
* High resolution downloading: svg --> high-res canvas --> download
* Conversion to ReasonML