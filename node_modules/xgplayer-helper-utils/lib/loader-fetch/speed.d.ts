export default Speed;
declare class Speed {
    _firstCheckpoint: number;
    _lastCheckpoint: number;
    _intervalBytes: number;
    _lastSamplingBytes: number;
    _now: () => number;
    reset(): void;
    addBytes(bytes: any): void;
    get currentKBps(): number;
    get lastSamplingKBps(): number;
}
