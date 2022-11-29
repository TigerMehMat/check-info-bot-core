export type IParsedData = { [name: string]: string };

export type IWatchParserFunction = (input: string) => IParsedData;

export interface IWatchOptions {
    url: string;
    parser: IWatchParserFunction;
    guild: string;
    channel: string;
}

interface IBotInfo {
    name: string;
    token: string;
}

export interface IIntoBotOptions {
    info: IBotInfo;
    watches: IWatchOptions[];
}
