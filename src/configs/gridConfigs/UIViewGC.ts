import { getModalSize, lp } from '../../Utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0.1, y: 0.05, width: 0.8, height: 0.11 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'ui',
        // debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0.1, y: 0.05, width: 0.8, height: 0.11 },
            },
        ],
    };
};
