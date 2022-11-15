# onetime-rnd

Generate unique random number

## Installation

```
$ npm i onetime-rnd
```

or

```html
<script src="https://unpkg.com/onetime-rnd@1.0.0/dist/index.js"></script>
```

## Example

By default if you don't pass any arguments it will generate number between 0 and 100 inclusive.

```js
const OneTimeRnd = require("onetime-rnd");

const rnd = new OneTimeRnd({ from: 1, to: 3 });

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
console.log(rnd.next()); //undefined
```

## How to use ?

### float

Generate float number. Here in this case you will generate 3 float for each number so you have 3 numbers \* 3 floats = 9 numbers

```js
const rnd = new OneTimeRnd({ from: 1, to: 3, float: 3 });

console.log(rnd.next()); //1.156449849
console.log(rnd.next()); //3.416419571
console.log(rnd.next()); //2.711771777
console.log(rnd.next()); //2.525252524
console.log(rnd.next()); //3.272727227
console.log(rnd.next()); //2.525228282
```

### autoRefresh

Will generate new numbers at the end of the first iteration (exclusive will not generate float numbers for 1).

```js
const rnd = new OneTimeRnd({
  from: 0,
  to: 1,
  float: 2,
  exclusive: true,
  autoRefresh: true,
});

console.log(rnd.next()); //0.1564498495
console.log(rnd.next()); //0.4481797174
console.log(rnd.next()); //0.5252772721
console.log(rnd.next()); //0.7971117657
console.log(rnd.next()); //0.7171617261
console.log(rnd.next()); //0.7167197129
```

### Repeat

When all the number are done it will return the same sequence in the same order.

```js
const rnd = new OneTimeRnd({ from: 1, to: 3, repeat: true });

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
```

### shuffleOnRepeat

Will display the same numbers but in a different order.

```js
const rnd = new OneTimeRnd({
  from: 1,
  to: 3,
  repeat: true,
  shuffleOnRepeat: true,
});

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
console.log(rnd.next()); //2
console.log(rnd.next()); //1
console.log(rnd.next()); //3
```

### refresh()

Refresh the list by generating new numbers (for float) and making a new shuffle.

```js
const rnd = new OneTimeRnd({
  from: 1,
  to: 3,
});

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
rnd.refresh();
console.log(rnd.next()); //2
console.log(rnd.next()); //1
console.log(rnd.next()); //3
```

### shuffle()

Shuffle the numbers.

```js
const rnd = new OneTimeRnd({
  from: 1,
  to: 3,
});

rnd.shuffle();

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
```

### onEnd(fn: Function)

Start the function passed as argument when all the numbers are done.

```js
const rnd = new OneTimeRnd({
  from: 1,
  to: 3,
});

rnd.onEnd(function () {
  console.log("Done !");
});

console.log(rnd.next()); //1
console.log(rnd.next()); //3
console.log(rnd.next()); //2
rnd.next(); // Done !
```
