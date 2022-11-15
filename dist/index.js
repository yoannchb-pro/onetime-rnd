(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OneTimeRnd = factory());
})(this, (function () { 'use strict';

  const MAX_ITERATION = 10;
  class OneTimeRnd {
      constructor(options = {}) {
          this.rnd = [];
          this.back = [];
          this.options = {
              from: 0,
              to: 100,
              float: 0,
          };
          Object.assign(this.options, options);
          this.generateRange();
          this.shuffle();
      }
      shuffle() {
          this.rnd.sort(() => Math.random() - 0.5);
      }
      generateRange() {
          const ex = this.options.exclusive ? 0 : 1;
          for (let i = this.options.from; i < this.options.to + ex; ++i) {
              //Generate float
              if (this.options.float) {
                  let j = 0;
                  let iterations = 0;
                  while (j < this.options.float) {
                      const nb = i + Math.random();
                      if (!this.rnd.includes(nb) || iterations > MAX_ITERATION) {
                          iterations = 0;
                          this.rnd.push(nb);
                          ++j;
                      }
                      ++iterations;
                  }
              }
              else {
                  this.rnd.push(i);
              }
          }
      }
      onEnd(fn) {
          this.endedFn = fn;
      }
      refresh() {
          this.generateRange();
          this.shuffle();
      }
      next() {
          const nb = this.rnd.shift();
          if (this.options.repeat && !this.options.autoRefresh)
              this.back.push(nb);
          if (this.rnd.length === 0) {
              if (this.options.repeat && !this.options.autoRefresh) {
                  this.rnd = [...this.back];
                  this.back = [];
                  if (this.options.shuffleOnRepeat) {
                      this.shuffle();
                  }
              }
              if (this.options.autoRefresh) {
                  this.generateRange();
                  this.shuffle();
              }
              if (this.endedFn) {
                  this.endedFn();
              }
          }
          return nb;
      }
  }

  return OneTimeRnd;

}));
//# sourceMappingURL=index.js.map
