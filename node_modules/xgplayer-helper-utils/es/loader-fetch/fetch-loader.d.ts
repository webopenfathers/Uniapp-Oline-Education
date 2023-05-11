export default FetchLoader;
declare class FetchLoader {
    static isSupported(): boolean;
    static get type(): string;
    constructor(configs: any);
    configs: any;
    url: string;
    status: number;
    error: any;
    _reader: any;
    _canceled: boolean;
    _destroyed: boolean;
    readtype: any;
    buffer: any;
    _loaderTaskNo: number;
    _ttfb: number;
    _speed: Speed;
    abortControllerEnabled: boolean;
    init(): void;
    /**
     * @param {string}      url
     * @param {RequestInit} params
     * @param {number}      timeout
     * @return {Promise<unknown>}
     */
    fetch(url: string, params: RequestInit, timeout: number): Promise<unknown>;
    abortController: AbortController;
    /**
     * @param {string}      url
     * @param {RequestInit} params
     * @param {number}      retryTimes
     * @param {number}      totalRetry
     * @param {number}      delayTime
     * @return {Promise<{ok}>}
     */
    internalLoad(url: string, params: RequestInit, retryTimes: number, totalRetry: number, delayTime: number, loadTimeout: any): Promise<{
        ok;
    }>;
    loading: boolean;
    _retryTimer: NodeJS.Timeout;
    /**
     * @param {string}      url
     * @param {RequestInit} opts
     * @param {retryCount, retryDelay, loadTimeout}  pluginConfig
     * @return {Promise<{ok}>}
     */
    load(url: string, opts?: RequestInit, { retryCount, retryDelay, loadTimeout }?: any): Promise<{
        ok;
    }>;
    _onFetchResponse(response: any): void;
    _onReader(reader: any, taskno: any): void;
    _noDataTimer: NodeJS.Timeout;
    /**
     *
     * @param {RequestInit} opts
     * @return {{mode: string, headers: Headers, cache: string, method: string}}
     */
    getParams(opts: RequestInit): {
        mode: string;
        headers: Headers;
        cache: string;
        method: string;
    };
    get currentSpeed(): number;
    cancel(): void;
    destroy(): void;
}
import Speed from "./speed";
