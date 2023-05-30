import { Telegraf } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import { sendMotivation } from './text/sendMotivation';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
const WELLCOM_MESSAGE = process.env.WELLCOME_MESSAGE || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
bot.start((ctx) => {
  ctx.reply(WELLCOM_MESSAGE)
  sendMotivation(ctx)
})
bot.on('message', greeting());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
