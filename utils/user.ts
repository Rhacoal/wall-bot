import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse(process.env.DES_SECRET!);
const cfg = {
  iv: CryptoJS.lib.WordArray.create([0, 0]),
  padding: CryptoJS.pad.NoPadding,
};

export function fromToken(token: string): number | undefined {
    try {
        const b64Str = CryptoJS.enc.Hex.parse(token).toString(CryptoJS.enc.Base64);
        const { words } = CryptoJS.DES.decrypt(b64Str, key, cfg);
        const view = new DataView(new ArrayBuffer(8));
        for (let i of [0, 1]) {
            view.setInt32(i * 4, words[i]);
        }
        return view.getFloat64(0);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

export function toToken(chatId: number): string {
    const view = new DataView(new ArrayBuffer(8));
    view.setFloat64(0, chatId);
    const words = [0, 1].map(i => view.getInt32(i * 4));
    const data = CryptoJS.lib.WordArray.create(words);
    const b64Str = CryptoJS.DES.encrypt(data, key, cfg).toString();
    return CryptoJS.enc.Base64.parse(b64Str).toString(CryptoJS.enc.Hex);
}
