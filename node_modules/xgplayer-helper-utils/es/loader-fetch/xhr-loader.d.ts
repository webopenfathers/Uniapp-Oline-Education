export default XhrLoader;
declare class XhrLoader {
    static get type(): string;
    constructor(configs: any);
    _xhr: any;
    configs: any;
    loading: boolean;
    _readtype: any;
    _bufferType: any;
    _requestInfo: {
        url: any;
        options: {};
        retryTimes: number;
        totalRetry: number;
        delayTime: number;
    };
    _onReadyStateChange(): void;
    _onError(): void;
    _onAbort(): void;
    _onTimeout(): void;
    get bufferIns(): any;
    init(): void;
    _createXhr(): any;
    load(url: any, opts?: {}, retryTimes?: number, delayTime?: number): void;
    _loadInternal(url: any, options: any): void;
    _bindEvents(): void;
    _setTimeout(xhr: any, options: any): void;
    _setCredentails(xhr: any, options: any): void;
    _setHeaders(xhr: any, options: any): void;
    _setResponseType(xhr: any): void;
    _onComplete(xhr: any): void;
    _whenError(info: any): void;
    cancel(): void;
    destroy(): void;
}
