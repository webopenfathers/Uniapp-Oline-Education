export default Context;
declare class Context {
    /**
     *
     * @param {*} player
     * @param {*} configs
     * @param {string[]}allowedEvents
     */
    constructor(player: any, configs: any, allowedEvents?: string[]);
    _emitter: any;
    mediaInfo: MediaInfo;
    _instanceMap: {};
    _clsMap: {};
    _inited: boolean;
    allowedEvents: string[];
    _configs: any;
    _player: any;
    _hooks: {};
    /**
     * 从上下文中获取解码流程实例，如果没有实例，构造一个
     * @param {string} tag
     * @returns {*}
     */
    getInstance(tag: string): any;
    /**
     * 初始化具体实例
     * @param {string} tag
     * @param {any[]}args
     */
    initInstance(tag: string, ...args: any[]): any;
    /**
     * 避免大量的initInstance调用，初始化所有的组件
     * @param {*} config
     */
    init(config: any): void;
    /**
     * 注册一个上下文流程，提供安全的事件发送机制
     * @param {string} tag
     * @param {*} cls
     */
    registry(tag: string, cls: any): (...args: any[]) => any;
    /**
     * 各个模块处理seek
     * @param {number} time
     */
    seek(time: number): void;
    /**
     * 对存在的实例进行
     */
    destroyInstances(): void;
    /**
     * 编解码流程无需关注事件的解绑
     */
    destroy(): void;
    /**
     * 对信道进行收拢
     * @param {string} messageName
     * @private
     */
    private _isMessageNameValid;
}
import { MediaInfo } from "xgplayer-helper-models";
