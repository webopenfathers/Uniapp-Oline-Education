export default Crypto;
declare class Crypto {
    constructor(config: any);
    inputBuffer: any;
    outputBuffer: any;
    key: any;
    iv: any;
    method: any;
    crypto: any;
    init(): void;
    decrypto(): void;
    aeskey: any;
    decryptoData(): void;
}
