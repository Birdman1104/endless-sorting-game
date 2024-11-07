import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Graphics } from 'pixi.js';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';

export class BackgroundView extends PixiGrid {
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        const bkg = new Graphics();
        bkg.beginFill(0x96d6dc, 1);
        bkg.drawRect(0, 0, 10, 10);
        bkg.endFill();
        this.setChild('bkg', bkg);
    }
}
