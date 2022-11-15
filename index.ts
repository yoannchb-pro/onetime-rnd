type Options = {
  to?: number;
  from?: number;
  float?: number;
  repeat?: boolean;
  shuffleOnRepeat?: boolean;
  autoRefresh?: boolean;
  exclusive?: boolean;
};

const MAX_ITERATION = 10;

class OneTimeRnd {
  private rnd: number[] = [];
  private back: number[] = [];
  private options: Options = {
    from: 0,
    to: 100,
    float: 0,
  };

  private endedFn: Function;

  constructor(options: Options = {}) {
    Object.assign(this.options, options);

    this.generateRange();
    this.shuffle();
  }

  shuffle() {
    this.rnd.sort(() => Math.random() - 0.5);
  }

  private generateRange() {
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
      } else {
        this.rnd.push(i);
      }
    }
  }

  onEnd(fn: Function) {
    this.endedFn = fn;
  }

  refresh() {
    this.generateRange();
    this.shuffle();
  }

  next() {
    const nb = this.rnd.shift();
    if (this.options.repeat && !this.options.autoRefresh) this.back.push(nb);

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

export default OneTimeRnd;
