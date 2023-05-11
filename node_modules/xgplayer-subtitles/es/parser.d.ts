export default class SubTitleParser {
    /**
     * 解析json数据进行分组
     * @param {Array<{
     *    start: number,
     *    end: number,
     *    text: Array<string>
     * }>} list
     * @returns
     */
    static parseJson(list: Array<{
        start: number;
        end: number;
        text: Array<string>;
    }>): {
        start: number;
        list: {
            start: number;
            end: number;
            text: Array<string>;
        }[];
        end: number;
    }[];
    static parse(str: any, fun: any): void;
    static parseASSItem(str?: string, mode?: any[]): {};
    static parseASS(str: any): {
        list: {
            start: any;
            end: any;
            list: any[];
        }[];
        style: {};
    };
    static parseVTTStyle(str: any, style: any): any;
    static parseVTT(str: any): {
        list: {
            start: number;
            end: number;
            list: any[];
        }[];
        styles: {
            key: string;
            style: string;
        }[];
    };
    static checkIsTime(str: any): string;
    static parseVttText(text: any): {
        tag: string;
        text: [type];
    };
    static parseVttTime(str: any): {
        start: number;
        end: number;
        time: any;
    };
    static isVTT(str: any): boolean;
    static isASS(str: any): boolean;
    static checkFormat(str: any): "vtt" | "ass";
}
