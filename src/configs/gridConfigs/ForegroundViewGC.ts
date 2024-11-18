import { getModalSize, isNarrowScreen, lp } from '../../Utils';

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
                name: 'suggestion',
                bounds: { x: 0.1, y: 1.8, width: 0.8, height: 0.15 },
            },
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const suggestionBounds = isNarrowScreen()
        ? { x: 0.1, y: 0.8, width: 0.8, height: 0.15 }
        : { x: 0, y: 1, width: 1, height: 1 };

    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'suggestion',
                bounds: suggestionBounds,
            },
        ],
    };
};
