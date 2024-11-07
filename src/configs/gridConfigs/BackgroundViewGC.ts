import { CellScale } from '@armathai/pixi-grid';
import { getModalSize, lp } from '../../Utils';

export const getBackgroundGridConfig = () => {
    return lp(getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig).call(null);
};

const getBackgroundGridLandscapeConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'background',
        // debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getBackgroundGridPortraitConfig = () => {
    const { width, height } = getModalSize();
    const bounds = { x: 0, y: 0, width, height };

    return {
        name: 'background',
        // debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'bkg',
                scale: CellScale.fill,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
