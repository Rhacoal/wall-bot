import type {NextApiRequest, NextApiResponse} from "next";
import {fromToken, toToken} from "../../utils/user";

async function sendMessage(chatId: string | number, text: String) {
    text = text.substring(0, 2048);
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
        }),
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.query.token ?? req.body.token;
    if (!token) {
        res.status(400).send("400 Bad Request");
        return;
    }
    const chatId = fromToken(`${token}`);
    if (chatId == null) {
        res.status(401).send("401 Unauthorized");
        return;
    }
    const msg = req.query.msg ?? req.body.msg;
    if (!msg) {
        res.status(400).send("400 Bad Request");
        return;
    }
    try {
        await sendMessage(chatId, `${msg}`.substring(0, 2048));
    } catch {
        res.status(500).send("500 Internal Server Error");
        return;
    }
    res.status(200).send("OK");
}
