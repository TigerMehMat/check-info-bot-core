/* eslint-disable no-await-in-loop */
import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import got from 'got';
import type {
    IIntoBotOptions, IWatchOptions, IWatchParserFunction,
} from './types.js';

function asyncTimeout(ms: number) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

async function getValue(url: string, parser: IWatchParserFunction) {
    try {
        const res = await got.get(url)
            .text();
        return parser(res);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Error -_- Can not get items');
        return null;
    }
}

async function runWatch(options: IWatchOptions, client: Client<true>) {
    if (options.timeToCheckMinutes < 1) {
        throw new Error('Please, do not DDOS API!!!');
    }

    const guild = await client.guilds.fetch(options.guild);
    if (!guild) {
        throw new Error(`Guild ${options.guild} not found`);
    }
    const channel = await guild?.channels.fetch(options.channel);
    if (!channel) {
        throw new Error(`Channel ${options.channel} not found in guild ${options.guild}`);
    }
    if (!(channel instanceof TextChannel)) {
        throw new Error(`Channel ${options.channel} is not text type`);
    }

    let musterValues = await getValue(options.url, options.parser);

    if (musterValues === null) {
        throw new Error('Fail start data');
    }

    // eslint-disable-next-line no-constant-condition
    while (1) {
        await asyncTimeout(1000 * 60 * options.timeToCheckMinutes);

        const currentValue = await getValue(options.url, options.parser);

        if (currentValue === null) {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (!options.equal(musterValues, currentValue)) {
            options.sendResult(musterValues, currentValue, channel);
            musterValues = currentValue;
        }
    }
}

export function initInformationBot({
    logger = console,
    info,
    watches,
}: IIntoBotOptions) {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds],
    });

    client.once('ready', async () => {
        logger.log(`${client.user?.tag} ready`);

        watches.forEach((opt) => runWatch(opt, client));
    });

    client.login(info.token)
        .then();
}
