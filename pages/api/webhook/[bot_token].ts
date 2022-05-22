import type {NextApiRequest, NextApiResponse} from "next";
import {toToken} from "../../../utils/user";

interface Chat {
    id: number,
    type: "private" | "group" | "supergroup" | "channel",
}

interface Message {
    message_id: number,
    chat: Chat,
    text?: string,
    from?: number,
}

interface Update {
    update_id: number,
    message: Message,
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query.bot_token !== process.env.ROUTING_TOKEN) {
        res.status(403).send("403 Forbidden");
        return;
    }
    const update = req.body as Update;
    if (update.message.chat.type === "private") {
        if (update.message.text?.match(/^\/start/)) {
            res.json({
                method: "sendMessage",
                chat_id: update.message.chat.id,
                text: `Your token is "${toToken(update.message.chat.id)}" (without quotes).\n\n` +
                    "You may send yourself messages with this token, by making a GET or POST request to " +
                    "https://wall-bot.vercel.app/api/sendMessage with arguments `token` and `msg`.\n\n" +
                    "Arguments can be passed in query string or in body as application/x-www-form-urlencoded " +
                    "or application/json. e.g.\n\n" +
                    "curl -X GET 'https://wall-bot.vercel.app/api/sendMessage?token=123456789&msg=test_message'",
            });
        } else {
            res.json({
                method: "sendMessage",
                chat_id: update.message.chat.id,
                text: "Sorry, unrecognized command.",
            });
        }
    } else {
        res.status(200).send("OK");
    }
}
