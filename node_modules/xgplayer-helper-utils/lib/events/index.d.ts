declare namespace _default {
    export { ALLEVENTS };
    export { HLS_EVENTS };
    export { REMUX_EVENTS };
    export { DEMUX_EVENTS };
    export { MSE_EVENTS };
    export { LOADER_EVENTS };
    export { FlvAllowedEvents };
    export { HlsAllowedEvents };
    export { CRYPTO_EVENTS };
    export { PLAYER_EVENTS };
    export { BROWSER_EVENTS };
}
export default _default;
declare const ALLEVENTS: any;
declare namespace HLS_EVENTS {
    const RETRY_TIME_EXCEEDED: string;
}
declare namespace REMUX_EVENTS {
    const REMUX_METADATA: string;
    const REMUX_MEDIA: string;
    const MEDIA_SEGMENT: string;
    const REMUX_ERROR: string;
    const INIT_SEGMENT: string;
    const DETECT_CHANGE_STREAM: string;
    const DETECT_CHANGE_STREAM_DISCONTINUE: string;
    const DETECT_AUDIO_GAP: string;
    const DETECT_LARGE_GAP: string;
    const DETECT_AUDIO_OVERLAP: string;
    const RANDOM_ACCESS_POINT: string;
    const DETECT_FRAG_ID_DISCONTINUE: string;
}
declare namespace DEMUX_EVENTS {
    const DEMUX_START: string;
    const DEMUX_COMPLETE: string;
    const DEMUX_ERROR: string;
    const METADATA_PARSED: string;
    const SEI_PARSED: string;
    const VIDEO_METADATA_CHANGE: string;
    const AUDIO_METADATA_CHANGE: string;
    const MEDIA_INFO: string;
    const ISKEYFRAME: string;
}
declare namespace MSE_EVENTS {
    const SOURCE_UPDATE_END: string;
    const MSE_ERROR: string;
    const MSE_WRONG_TRACK_ADD: string;
}
declare namespace LOADER_EVENTS {
    const LADER_START: string;
    const LOADER_DATALOADED: string;
    const LOADER_COMPLETE: string;
    const LOADER_RESPONSE_HEADERS: string;
    const LOADER_ERROR: string;
    const LOADER_RETRY: string;
    const LOADER_TTFB: string;
}
declare const FlvAllowedEvents: any[];
declare const HlsAllowedEvents: any[];
declare namespace CRYPTO_EVENTS {
    const START_DECRYPTOO: string;
    const DECRYPTED: string;
}
declare namespace PLAYER_EVENTS {
    const SEEK: string;
}
declare namespace BROWSER_EVENTS {
    const VISIBILITY_CHANGE: string;
}
