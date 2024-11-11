import { lego } from '@armathai/lego';
import { BoardEvents, MainGameEvents } from '../events/MainEvents';
import Head from '../models/HeadModel';
import { onMatchCommand } from './commands/BoardCommands';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = () => {
    Head.init();
    Head.initGameModel();
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: BoardEvents.Match,
        command: onMatchCommand,
    },
]);