const OneTimeRnd = require("../dist/index");

const rnd1 = new OneTimeRnd();

console.log(rnd1.next());

rnd1.onEnd(function () {
  console.log("Done !");
});

for (let i = 0; i < 100; ++i) {
  rnd1.next();
}

console.log(rnd1.next() === undefined);

const rnd2 = new OneTimeRnd({ from: 5, to: 10 });

for (let i = 0; i < 7; ++i) {
  console.log(rnd2.next());
}

const rnd3 = new OneTimeRnd({ from: 5, to: 10, float: 10 });

console.log(rnd3.next());

const rnd4 = new OneTimeRnd({ from: 1, to: 3, repeat: true });

for (let i = 0; i < 6; ++i) {
  console.log(rnd4.next());
}

const rnd5 = new OneTimeRnd({
  from: 1,
  to: 3,
  repeat: true,
  shuffleOnRepeat: true,
});

for (let i = 0; i < 6; ++i) {
  console.log(rnd5.next());
}

const rnd6 = new OneTimeRnd({ from: 1, to: 3, float: 1, autoRefresh: true });

for (let i = 0; i < 6; ++i) {
  console.log(rnd6.next());
}
