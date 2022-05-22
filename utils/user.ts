import CryptoJS from 'crypto-js';

export function fromToken(token: string): number | undefined {
    try {
        const str = CryptoJS.TripleDES
            .decrypt(CryptoJS.enc.Hex.parse(token).toString(CryptoJS.enc.Base64), process.env.DES_SECRET!)
            .toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(str);
        if (!obj.chatId || typeof (obj.chatId) !== "number") {
            return undefined;
        }
        return obj.chatId;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

export function toToken(chatId: number): string {
    const hexStr = CryptoJS.TripleDES
        .encrypt(JSON.stringify({chatId}), process.env.DES_SECRET!)
        .toString();
    return CryptoJS.enc.Base64.parse(hexStr).toString(CryptoJS.enc.Hex);
}
