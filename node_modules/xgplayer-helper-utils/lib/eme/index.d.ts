export default class EME {
    static isSupported(): boolean;
    constructor({ config, player }: {
        config: any;
        player: any;
    });
    licenseUrl: any;
    mediaKeySystemConfigs: any;
    keySystem: any;
    video: any;
    mediaKeysList: any[];
    requestLicenseFailureCount: number;
    init(): void;
    onManifestParsed(data: any): void;
    onKeySessionMessage(keySession: any, message: any): void;
    requestLicense(keyMessage: any, callback: any): void;
    createLicenseXhr(url: any, keyMessage: any, callback: any): XMLHttpRequest;
    onLicenseRequestReadyStageChange(xhr: any, url: any, keyMessage: any, callback: any): void;
    onMediaEncrypted(e: any): void;
    createWidevineMediaKeySystemConfigurations(audioCodecs: any, videoCodecs: any): {
        videoCapabilities: any;
    }[];
}
