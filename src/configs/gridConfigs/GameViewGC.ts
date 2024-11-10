import { getModalSize, lp } from '../../Utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0.1, width: 1, height: 0.9 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'game',
        // debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'board',
                bounds: { x: 0, y: 0.1, width: 1, height: 0.9 },
            },
        ],
    };
};
