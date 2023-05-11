export default class ProxyPromise {
    /** @param {T=} value */
    resolve(value?: T): void;
    /** @param {*=} reason */
    reject(reason?: any | undefined): void;
}
