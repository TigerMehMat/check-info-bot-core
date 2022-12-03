import { EmbedBuilder } from 'discord.js';
import _ from 'lodash';
import { ISendResultFunction } from '../types.js';

interface ISendResultFunctionProps {
    title: string;
    url: string | null;
    valueNotChanged: (name: string, value: string) => string | null;
    valueChanged: (
        name: string,
        oldValue: string | undefined,
        newValue: string | undefined
    ) => string | null;
}

export const getMainViewResults: (options: ISendResultFunctionProps) => ISendResultFunction = ({
    title,
    url,
    valueChanged,
    valueNotChanged,
}) => (oldData, newData, channel) => {
    const names = new Set([
        ...Object.keys(oldData),
        ...Object.keys(newData),
    ]);

    const res = _.compact([...names].map((name) => {
        if (oldData[name] === newData[name]) {
            if (typeof oldData[name] === 'undefined') {
                return null;
            }
            return valueNotChanged(name, oldData[name]);
        }
        return valueChanged(name, oldData[name], newData[name]);
    }));
    const result = new EmbedBuilder()
        .setDescription(res.join('\n'))
        .setTitle(title)
        .setURL(url)
        .setTimestamp();
    channel.send({
        embeds: [result],
    }).catch();
};
