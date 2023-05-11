export default XHR;
declare class XHR {
    constructor({ url, method, type, timeout, data }?: {
        url: any;
        method?: string;
        type?: string;
        timeout?: number;
        data?: {};
    }, context?: {});
}
