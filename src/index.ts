import { Client, GatewayIntentBits, TextChannel } from 'discord.js';
import type { IIntoBotOptions, IWatchOptions } from './types.js';

async function runWatch(options: IWatchOptions, client: Client<true>) {
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
    await channel.send('qwe');
}

export function initInformationBot(options: IIntoBotOptions) {
    const client = new Client({
        intents: [GatewayIntentBits.Guilds],
    });

    client.once('ready', async () => {
        console.log(`${client.user?.tag} ready`);

        options.watches.forEach((opt) => runWatch(opt, client));
    });

    client.login(options.info.token)
        .then();
}
