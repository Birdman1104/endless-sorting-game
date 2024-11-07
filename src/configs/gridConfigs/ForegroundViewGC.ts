import { getModalSize, lp } from '../../Utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'logo',
                bounds: { x: 0.9, y: 0, width: 0.1, height: 0.1 },
            },
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'logo',
                bounds: { x: 0.9, y: 0, width: 0.1, height: 0.1 },
            },
        ],
    };
};
