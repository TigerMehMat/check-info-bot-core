import { TextChannel } from 'discord.js';

export type IParsedData = { [ name: string ]: string };

export type IWatchParserFunction = (input: string) => IParsedData;
export type IEqualFunction = (oldData: IParsedData, newData: IParsedData) => boolean;
export type ISendResultFunction = (
    oldData: IParsedData,
    newData: IParsedData,
    channel: TextChannel
) => void;

export interface IWatchOptions {
    url: string;
    parser: IWatchParserFunction;
    equal: IEqualFunction;
    sendResult: ISendResultFunction;
    guild: string;
    channel: string;
    timeToCheckMinutes: number;
}

interface IBotInfo {
    name: string;
    token: string;
}

interface ILogger {
    log: (msg: string) => void;
}

export interface IIntoBotOptions {
    info: IBotInfo;
    watches: IWatchOptions[];
    logger?: ILogger;
}
