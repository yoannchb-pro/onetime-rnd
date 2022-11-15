type Options = {
    to?: number;
    from?: number;
    float?: number;
    repeat?: boolean;
    shuffleOnRepeat?: boolean;
    autoRefresh?: boolean;
    exclusive?: boolean;
};
declare class OneTimeRnd {
    private rnd;
    private back;
    private options;
    private endedFn;
    constructor(options?: Options);
    shuffle(): void;
    private generateRange;
    onEnd(fn: Function): void;
    refresh(): void;
    next(): number;
}
export { OneTimeRnd as default };
