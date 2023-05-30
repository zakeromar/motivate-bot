import { Context } from 'telegraf';
import createDebug from 'debug';
import GPTTellMe from '../openAi';
import { schedule } from 'node-cron';
const debug = createDebug('bot:greeting_text');

const sendMotivation = (ctx: Context) => {
    debug('Triggered "sendMotivation" text command');
    schedule('0 8 * * *', async () => {
        const sentence = await GPTTellMe('I need a motivational sentence.');
        ctx.sendMessage(sentence!)
    }, { timezone: "Asia/Tehran", runOnInit: true }) 
};

export { sendMotivation };
